"use strict"

import Provider from '../provider.js'

export class extratorrent extends Provider {

  processSearchResponse($, deferred, scope, torrentResultList) {
    if ($('.tl').find('tr').length > "3") {
      $('.tl tr').each(function(index, torrents) {

        if ($(torrents).find('td a').attr('href') !== '#') {

          var find_torrent_link = $(torrents).find('td a');
          var find_torrent_title = find_torrent_link.attr('title');
          var torrent_download = find_torrent_link.attr('href');
          var find_torrent_size = $(torrents).find('td');
          var find_torrent_seed = $(torrents).find('td.sy');
          var find_torrent_leech = $(torrents).find('td.ly');

          var torrent_link = scope.baseUrl + torrent_download.split('torrent_download').join('download');
          var torrent_name = find_torrent_title.split('Download ').join('').split(' torrent').join('');
          var torrent_size = find_torrent_size.next().next().next().first().text();
          var torrent_seed = find_torrent_seed.text();
          var torrent_leech = find_torrent_seed.text();

          scope.buildResult(scope.getDataStructure(
            torrent_name, "", torrent_seed, torrent_leech,
            torrent_size, "",
            torrent_link, false, undefined
          ), torrentResultList, deferred);

        }
      });
    } else {
      deferred.reject("No torrents found");
    }
  }
}

module.exports = extratorrent
