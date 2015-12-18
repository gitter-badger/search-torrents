"use strict"

import Provider from '../provider.js'

export class btdigg extends Provider {

    processSearchResponse($, deferred, scope, torrentResultList) {
        if($('#search_res table tr').length > 0){
          $('#search_res table tr').each(function(index, torrents){
            var d = $(this);
            var td = d.children('td');
            var find_torrent_title = $(torrents).find('td.torrent_name a');
            var find_torrent_link = $(torrents).find('td.ttth a');
            var find_torrent_size = $(torrents).find('table.torrent_name_tbl td.ttth');
            var find_torrent_added = $(torrents).find('table.torrent_name_tbl td.ttth');

            var torrent_title = find_torrent_title.text();
            var torrent_link = find_torrent_link.attr('href');
            var torrent_size = find_torrent_size.next().text().split('[cloud]Size:').join('');
            var torrent_added = find_torrent_added.first().next().eq(1).text();

            if(torrent_link && torrent_title) {
                scope.buildResult(scope.getDataStructure(
                    torrent_title, "", "",
                    "", torrent_size, "",
                    torrent_link, false, torrent_added
                 ), torrentResultList, deferred);
            }
          });
        } else {
          deferred.reject("No torrents found");
        }
    }
}

module.exports = btdigg
