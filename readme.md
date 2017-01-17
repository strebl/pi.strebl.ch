# pi-finder.xyz
[![Build Status](https://img.shields.io/travis/strebl/pi.strebl.ch.svg?style=flat-square)](https://travis-ci.org/strebl/pi.strebl.ch)
[![Scrutinizer Code Quality](https://img.shields.io/scrutinizer/g/strebl/pi.strebl.ch.svg?style=flat-square)](https://scrutinizer-ci.com/g/strebl/pi.strebl.ch/?branch=master)
[![StyleCI](https://styleci.io/repos/33052778/shield)](https://styleci.io/repos/33052778)
[![Scrutinizer Coverage](https://img.shields.io/scrutinizer/coverage/g/strebl/pi.strebl.ch.svg?style=flat-square)](https://scrutinizer-ci.com/g/strebl/pi.strebl.ch/code-structure/master)
[![GitHub license](https://img.shields.io/github/license/strebl/pi.strebl.ch.svg?style=flat-square)](https://github.com/strebl/pi.strebl.ch/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/strebl/pi.strebl.ch.svg?style=flat-square)](https://github.com/strebl/pi.strebl.ch/releases)

[**pi-finder.xyz**](https://pi-finder.xyz) is the free backend service for the [**Pi Finder**](https://github.com/strebl/pi-finder#pi-finder).  
The Pi Finder lets you find your Raspberry Pi or any other unix based device in your network.  
Read the [Introduction](https://pi-finder.xyz/getting-started#Introduction) for more information.

You can configure the Pi Finder to talk to your own Poke Server. Just set up this Repo on your own server and modify the Pi Finder configuration on your device.

# Development
Install the dependencies
```bash
yarn # or npm install
composer install
```

To build for dev run
```bash
npm run webpack
```

If you want webpack to build on code changes, run
```bash
npm run dev
```

To build for production run
```bash
npm run production
```
This will first build for development, optimize css with `uncss` and then minify and version everything.

## Contribution
Thank you for considering to contribute. Just open a issue or create a pull request if you are willing to contribute.

### License

This repo is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
