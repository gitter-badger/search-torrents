"use strict"

import Provider from './provider.js'

export class eztv extends Provider {

  processSearchResponse($, deferred, scope, torrentResultList) {
    if ($("tr.forum_header_border").length > 0) {
      $("tr.forum_header_border").each(function(index, torrent) {
        var eztv_link = $(torrent).find("a.magnet").attr('href');
        var torrent_title = $(torrent).find("a.epinfo").text();
        var torrent_size = $(torrent).find("a.epinfo").attr("title").match(/\([^)]+\)$/)[0].slice(1, -1);
        var torrent_seeds = $(torrent).find(".seed").text();
        var torrent_leech = $(torrent).find(".leech").text();
        var date_added = $("td.forum_thread_post_end", torrent).prev().text();

        scope.buildResult(scope.getDataStructure(
          torrent_title, "", torrent_seeds, torrent_leech,
          torrent_size, "",
          eztv_link, false, date_added
        ), torrentResultList, deferred);

      });

    } else {
      deferred.reject("No torrents found");
    }
  }
}

module.exports = eztv
