const { createHash } = require('crypto');
const { request, RequestOptions } = require('https');
const { lookup } = require('fast-geoip');

const { ANALYTICS_URL, ANALYTICS_KEY } = process.env;

const trackingPixel = {
  statusCode: 200,
  body: 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  headers: { 'content-type': 'image/gif' },
  isBase64Encoded: true,
};

/** @type {import('@netlify/functions').Handler} */
exports.handler = async ({ headers, queryStringParameters }) => {
  if (ANALYTICS_URL && ANALYTICS_KEY) {
    try {
      const ip = getIP(headers);
      // Return early if the IP is for localhost.
      if (ip && ip.startsWith('127.0.0.')) return trackingPixel;

      const page = new URL(headers.referer || '');
      const url = page.pathname;
      const referrer = queryStringParameters?.referrer;
      const ua = headers['user-agent'];
      const session_id = createHash('sha256')
        .update(page.hostname + ua + ip)
        .digest('base64');

      let country = headers['x-country'];
      if (!country && ip) {
        const data = await lookup(ip);
        if (data) ({ country } = data);
      }

      await fetch(ANALYTICS_URL + '/rest/v1/pageview', {
        body: JSON.stringify({ url, referrer, session_id, country }),
        method: 'POST',
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
    const headers =
      options.method !== 'GET'
        ? {
            apikey: ANALYTICS_KEY,
            Authorization: `Bearer ${ANALYTICS_KEY}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(options.body),
            Prefer: 'return=representation',
          }
        : {};
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
