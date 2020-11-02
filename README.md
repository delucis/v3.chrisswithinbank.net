[![Netlify Status](https://api.netlify.com/api/v1/badges/f9bbe34c-e316-4137-9fe3-d1f644b9f4b3/deploy-status)](https://app.netlify.com/sites/csnet-v3/deploys)

<!-- TOC depthFrom:1 depthTo:2 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Installation](#installation)
	- [Environment Set-Up](#environment-set-up)
	- [Repository Set-Up](#repository-set-up)
	- [Running local server and building](#running-local-server-and-building)
- [Deployment](#deployment)

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

# Deployment

Changes pushed to this repository will be automatically deployed via Netlify.
