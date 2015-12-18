"use strict"

import Provider from './provider.js'

export class rarbg extends Provider {

  processSearchResponse(data, deferred, scope, torrentResultList) {
    //preauth needed via api
    for (var torrent in data.torrent_results) {

      var title = data.torrent_results[torrent].title;
      var torrent_link = data.torrent_results[torrent].download;
      var seeds = data.torrent_results[torrent].seeders;
      var leechs = data.torrent_results[torrent].leechers;
      var size = scope.bytesToSize(data.torrent_results[torrent].size);

      scope.buildResult(scope.getDataStructure(
        title, "", seeds, leechs,
        size, "",
        torrent_link, false, undefined
      ), torrentResultList, deferred);
    }
  }
}

module.exports = rarbg
