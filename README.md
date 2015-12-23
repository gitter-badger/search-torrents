# search-torrents

Goal

is to provide a simple search api for torrent sites,
[based on torrentflix](https://github.com/ItzBlitz98/torrentflix)
It's only a component, not a full-featured application like
[torrentflix](https://github.com/ItzBlitz98/torrentflix).

Written in ES6 compiled with babel to ES5. You can use optionally
traceur, but not tested.

N.B. If you are in a country where the internet is censored, you will need a VPN at the moment to run this script, else it will fail with an error whilst retrieving content.

Dependencies
--
Babel ( https://babeljs.io/ )

Install & Run
--

<code>npm install babel</code>

<code>npm run build:babel</code>

open providers:
* <code>node example.js</code>

providers with authentication:
* create authconfig.json (see authexample.js)
* <code>node authexample.js</code>

Develop
--

npm run build:watch


Providers & Providers with authentication
--

with auth: bithumen, ncore

open: btdigg, cpasbien, extratorrent, eztv, getstrike, kickass, leetx, limetorrents,
nyaa, rarbg, seedpeer, tokyotosho, tpb, yts
