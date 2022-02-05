const { createHash } = require('crypto');
const { request, RequestOptions } = require('https');

const { ANALYTICS_URL, ANALYTICS_KEY } = process.env;

const trackingPixel = {
  statusCode: 200,
  body: 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  headers: {
    'Content-Type': 'image/gif',
    Tk: 'N',
    Expires: 'Mon, 01 Jan 1990 00:00:00 GMT',
    'Cache-Control': 'no-store',
    Pragma: 'no-cache',
  },
  isBase64Encoded: true,
};

/** @type {import('@netlify/functions').Handler} */
exports.handler = async ({ headers, queryStringParameters }) => {
  if (ANALYTICS_URL && ANALYTICS_KEY) {
    try {
      const ip = getIP(headers);
      // Return early if the IP is for localhost.
      if (ip && ip.includes('127.0.0.1')) return trackingPixel;

      let referrer, prev_url;
      if (queryStringParameters) ({ referrer } = queryStringParameters);
      if (referrer) {
        const { origin, hostname, pathname } = new URL(referrer);
        if (origin === process.env.URL) {
          referrer = '(internal)';
          prev_url = pathname;
        } else {
          referrer = hostname;
        }
      } else if (queryStringParameters && 'referrer' in queryStringParameters) {
        // If there is no referrer but the query string is present, this is a direct visit.
        referrer = '(direct)';
      }

      const page = new URL(headers.referer || '');
      const url = page.pathname;
      const { duration = 0, cid = '' } = queryStringParameters || {};
      const ua = headers['user-agent'];
      const hash = createHash('sha256').update(page.hostname + ua + ip);

      await fetch(ANALYTICS_URL + '/rest/v1/pageview', {
        method: 'POST',
        body: JSON.stringify({
          url,
          prev_url,
          referrer,
          duration,
          cid: hash.copy().update(cid).digest('base64'),
          session_id: hash.digest('base64'),
          country: headers['x-country'],
        }),
        headers: {
          Prefer: 'resolution=merge-duplicates',
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
  return trackingPixel;
};

/**
 * Simplistic look through headers to see if we have the IP address.
 * @type {(headers: import('@netlify/functions').HandlerEvent['headers']) => string}
 */
function getIP(headers) {
  const ip =
    headers['x-nf-client-connection-ip'] ||
    headers['x-bb-ip'] ||
    headers['x-client-ip'] ||
    headers['x-forwarded-for'] ||
    headers['x-real-ip'] ||
    headers['x-cluster-client-ip'];
  return !ip ? '' : ip.includes(',') ? ip.split(',')[0] : ip;
}

/**
 * Simplistic node-fetch-alike.
 * @param {string | URL} url
 * @param {RequestOptions & { body?: any }} options
 * @returns
 */
function fetch(url, options = { method: 'GET' }) {
  return new Promise((resolve, reject) => {
    const headers = {
      apikey: ANALYTICS_KEY,
      Authorization: `Bearer ${ANALYTICS_KEY}`,
      ...(options.method !== 'GET'
        ? {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(options.body),
          }
        : {}),
      ...(options.headers || {}),
    };
    const req = request(url, { ...options, headers }, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        const { statusCode } = response;
        if (!statusCode || statusCode >= 400) {
          reject(new HttpError(statusCode, data));
        } else {
          try {
            const body = JSON.parse(data);
            resolve(body);
          } catch (error) {
            resolve(data);
          }
        }
      });
    });
    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

class HttpError extends Error {
  /**
   * @param {number | undefined} statusCode
   * @param {string | undefined} msg
   */
  constructor(statusCode, msg) {
    super(msg);
    this.statusCode = statusCode;
  }
}
