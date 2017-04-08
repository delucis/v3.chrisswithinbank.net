[![Build Status](https://travis-ci.org/delucis/v3.chrisswithinbank.net.svg?branch=master)](https://travis-ci.org/delucis/v3.chrisswithinbank.net)

<!-- TOC depthFrom:1 depthTo:2 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Installation](#installation)
	- [Environment Set-Up](#environment-set-up)
	- [Repository Set-Up](#repository-set-up)
	- [Running local server and building](#running-local-server-and-building)
	- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)
	- [Set-Up](#set-up)
	- [Deploying site changes](#deploying-site-changes)

<!-- /TOC -->

# Installation

The following steps are for OS X. Skip steps if something is already installed,
though updating/checking versions is probably advisable.

## Environment Set-Up

### Make sure you have [a user version of Ruby installed](http://jekyllrb.com/docs/troubleshooting/#jekyll-amp-mac-os-x-1011)

```sh
brew install ruby
export PATH=/usr/local/bin:$PATH
```

The first line installs Ruby via [Homebrew](http://brew.sh/).  
The second line updates the `$PATH` to use the Homebrew copy of Ruby ahead of
OS X’s system copy.

### Install ImageMagick

```sh
brew install ImageMagick
```

Used for
[`jekyll-picture-tag`](https://github.com/robwierzbowski/jekyll-picture-tag)
image processing.

### Install [Bundler](http://bundler.io/)

```sh
gem install bundler
```

Bundler will handle dependencies for the repository.

## Repository Set-Up

### Download repo

`cd` to the directory where you want to clone the repo, then do:

```sh
git clone https://github.com/delucis/v3.chrisswithinbank.net.git
cd v3.chrisswithinbank.net
```

### Install dependencies

```sh
bundle install
```

Bundler will read the repository’s [`Gemfile`](Gemfile) and install listed
dependencies.

## Running local server and building

```sh
bundle exec jekyll serve
```

This will attempt to build the site and serve to <http://0.0.0.0:4000/>.

The site files are built to `_site/`.

To build without serving locally do:

```sh
bundle exec jekyll build
```

### Building for production

To make sure URLs are processed using the correct host for deployment (rather than `localhost:4000/`):

```sh
JEKYLL_ENV=production bundle exec jekyll build
```

## Troubleshooting

There are sometimes build problems with the
[`jekyll-sitemap`](https://github.com/jekyll/jekyll-sitemap)
plug-in. To try building without `jekyll-sitemap` activated, remove the
relevant line from the `gems` item in [`config.yml`](config.yml):

```yml
gems:
    - jekyll-sitemap
    - jekyll-feed
    - jekyll-picture-tag
    - jekyll-last-modified-at
```

After a successful initial build, replacing that line restores full
functionality, and usually leads to non-failing subsequent builds.

# Deployment

## Set-Up

### Install [git-ftp](http://git-ftp.github.io/git-ftp/)

```sh
brew install git-ftp
```

`git-ftp` allows you to maintain a SHA-1 reference on the server and push
changes over FTP.

### Make `_site/` a repo

```sh
cd _site
git init
```

Stage everything in the build folder for committing:

```sh
git add -A
```

Double check that really was everything:

```sh
git status
```
Make your first commit:

```sh
git commit -m "Initial commit."
```

### Set up `git-ftp` defaults

```sh
git config git-ftp.user FTPUSER
git config git-ftp.password FTPPASSWORD
git config git-ftp.url ftp.chrisswithinbank.net
```

This stores FTP credentials in `.git/config`. Obviously don’t push these
anywhere public.

### First push to server

```sh
git-ftp init
```

This pushes the entire repository, and sets the reference SHA-1 checksum
on the server.

If the server already contains an SHA-1 checksum, this will fail. Run
`git-ftp push`, and when asked if you want to re-upload everything, type `y`.

## Deploying site changes

```sh
git add -A
git commit -m "DESCRIPTION OF CHANGES."
git-ftp push
```

This checks the server’s SHA-1 checksum and pushes all local files that have
changed since that commit.
