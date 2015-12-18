"use strict"

import Provider from '../provider.js'

export class nyaa extends Provider {

  processSearchResponse($, deferred, scope, torrentResultList) {

    if ($('.tlist').find('tr').length > "2") {
      $('.tlist tr.tlistrow').each(function(index, torrents) {

        var find_torrent_title = $(torrents).find('.tlistname a');
        var find_torrent_link = $(torrents).find('.tlistdownload a');
        var find_torrent_seed = $(torrents).find('.tlistsn');
        var find_torrent_leech = $(torrents).find('.tlistln');
        var find_torrent_size = $(torrents).find('.tlistsize');

        var torrent_title = find_torrent_title.text();
        var torrent_link = find_torrent_link.attr('href');
        var torrent_seed = find_torrent_seed.text();
        var torrent_leech = find_torrent_leech.text();
        var torrent_size = find_torrent_size.text();

        scope.buildResult(scope.getDataStructure(
          torrent_title, "", torrent_seed, torrent_leech,
          torrent_size, "",
          torrent_link, false, undefined
        ), torrentResultList, deferred);
      });
    } else {
      deferred.reject("No torrents found");
    }
  }
}

module.exports = nyaa
