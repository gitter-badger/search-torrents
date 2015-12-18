"use strict"

import Provider from './provider.js'

export class limetorrents extends Provider {

  processSearchResponse($, deferred, scope, torrentResultList) {
    if ($('.table2 tr').length > 4) {
      $('.table2 tr').each(function(index, torrents) {

        if ($(torrents).find('.tt-name a.csprite_dl14').attr('href')) {

          var find_torrent_link = $(torrents).find('.tt-name a.csprite_dl14');
          var find_torrent_title = $(torrents).find('.tt-name a');
          var find_torrent_size = $(torrents).find('td.tdnormal');
          var find_torrent_seeders = $(torrents).find('td.tdseed');
          var find_torrent_leechers = $(torrents).find('td.tdleech');
          var find_date_added = $(torrents).find('td.tdnormal');

          var torrent_link = find_torrent_link.attr('href');
          var torrent_name = find_torrent_title.text();
          var torrent_size = find_torrent_size.next().first().text();
          var torrent_seed = find_torrent_seeders.text();
          var torrent_leech = find_torrent_leechers.text();
          var date_added = find_date_added.first().text().split(' -')[0];

          scope.buildResult(scope.getDataStructure(
            torrent_name, "", torrent_seed, torrent_leech,
            torrent_size, "",
            torrent_link, false, date_added
          ), torrentResultList, deferred);
        }
      });
    } else {
      deferred.reject("No torrents found");
    }
  }
}

module.exports = limetorrents
