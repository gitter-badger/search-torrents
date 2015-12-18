"use strict"

import Provider from '../provider.js'

export class tpb extends Provider {

  processSearchResponse($, deferred, scope, torrentResultList) {

    $('table#searchResult tr').each(function(index, torrents) {
      var torrent_title, torrent_link, torrent_verified;

      if ($(torrents).find('.detName a').text()) {

        var find_torrent_title = $(torrents).find('.detName a');
        var find_torrent_seed = $(torrents).find('td').next().next().text();
        var find_torrent_leech = $(torrents).find('td').next().next().next().text();
        var find_torrent_size = $(torrents).find('.detDesc');

        var torrent_title = find_torrent_title.text();
        var torrent_leech = find_torrent_leech;
        var torrent_seed = find_torrent_seed.split(torrent_leech).join('');

        var matches = find_torrent_size.text().match(/, Size (.*?), ULed/g);
        var torrent_size = matches[0].split(', Size ').join('').split(', ULed').join('');
        var matches2 = find_torrent_size.text().match(/Uploaded (.*?),/g);
        var date_added = matches2[0].split('Uploaded ').join('').split(',').join('');

        var links = $(torrents).find('a');

        $(links).each(function(i, link) {

          if ($(link).attr('href').indexOf("magnet:?xt=urn:") > -1) {
            torrent_link = $(link).attr('href');
            // var torrent_magnet = $(link).attr('href');
            // var matches = torrent_magnet.match(/magnet:\?xt=urn:btih:(.*)&dn=/g);
            // var hash = matches[0].split('magnet:?xt=urn:btih:').join('').split('&dn=').join('');
            // torrent_link = "http://torcache.net/torrent/" + hash + ".torrent";
          }

        });

        var images = $(torrents).find('a img');

        $(images).each(function(i, images) {

          if ($(images).attr('title')) {
            if ($(images).attr('title').indexOf("VIP") > -1) {
              torrent_verified = "vip";
            } else if ($(images).attr('title').indexOf("Trusted") > -1) {
              torrent_verified = "trusted";
            }
          } else {
            torrent_verified = "";
          }
        });

        scope.buildResult(scope.getDataStructure(
          torrent_title, "", torrent_seed, torrent_leech,
          torrent_size, "",
          torrent_link, torrent_verified, date_added
        ), torrentResultList, deferred);
      }
    });
  }
}

module.exports = tpb
