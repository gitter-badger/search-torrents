"use strict"

import Provider from '../provider.js'

export class cpasbien extends Provider {

    processSearchResponse($, deferred, scope, torrentResultList) {
      if($("div .ligne0").length > 0) {

          $("div[class^='ligne']").each(function(index, torrent){
            var cpasbien_link = $(torrent).children("a").attr('href');
            var torrent_title = $(torrent).children("a").text();
            var torrent_size = $(torrent).children(".poid").text();
            var torrent_seeds = $(torrent).find(".seed_ok").text();
            var torrent_leech = $(torrent).find(".down").text();

            scope.buildResult(scope.getDataStructure(
              torrent_title, "", torrent_seeds, torrent_leech,
              torrent_size, "",
              cpasbien_link, false, undefined
            ), torrentResultList, deferred);
          });

        } else {
          deferred.reject("No torrents found");
        }
    }
}

module.exports = cpasbien
