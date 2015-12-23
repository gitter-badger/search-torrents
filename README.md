# search-torrents

Goal

is to provide a simple search api for torrent sites,
[based on torrentflix](https://github.com/ItzBlitz98/torrentflix)
It's only a component, not a full-featured application like
[torrentflix](https://github.com/ItzBlitz98/torrentflix).

Written in ES6 compiled with babel to ES5. You can use optionally
traceur, but not tested.

Providers & Providers with authentication
--

with auth: bithumen, ncore

open: btdigg, cpasbien, extratorrent, eztv, getstrike, kickass, leetx, limetorrents,
nyaa, rarbg, seedpeer, tokyotosho, tpb, yts


Run
--

open providers:
* node example.js

providers with authentication:
* create authconfig.json (see authexample.js)
* node authexample.js

Develop
--

npm run build:watch
