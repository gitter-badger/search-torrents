"use strict"

import Provider from './provider.js'

export class leetx extends Provider {

  processSearchResponse($, deferred, scope, torrentResultList) {
    if ($('.tab-detail ul li').length > 0) {
      $('.tab-detail ul li').each(function(index, torrents) {
        var d = $(this);
        var div = d.children('div');
        var links = $(torrents).find('a');

        $(links).each(function(i, link) {
          if ($(link).attr('href').indexOf("/torrent/") > -1) {
            var leetx_link = $(link).attr('href');
            var torrent_title = $(link).text();
            var torrent_size = $(div).eq(3).text();
            var torrent_seeds = $(div).eq(1).text();
            var torrent_leech = $(div).eq(2).text();

            scope.buildResult(scope.getDataStructure(
              torrent_title, "", torrent_seeds, torrent_leech,
              torrent_size, "",
              scope.baseUrl + leetx_link, false, undefined
            ), torrentResultList, deferred);
          }
        });

      });
    } else {
      deferred.reject("No torrents found");
    }
  }
}

module.exports = leetx
