"use strict"

import Provider from './provider.js'
import moment from 'moment'

export class tokyotosho extends Provider {

  processSearchResponse($, deferred, scope, torrentResultList) {
    if ($('.listing').find('tr').length > "0") {
      $('.listing tr').each(function(index, torrents) {

        if ($(torrents).find('.desc-top a').next().attr('href')) {
          var find_torrent_link = $(torrents).find('.desc-top a');
          var find_torrent_title = $(torrents).find('td.desc-top a');
          var find_torrent_seed = $(torrents).next().find('td.stats');
          var find_torrent_size = $(torrents).next().find('td.desc-bot').text();

          var torrent_link = find_torrent_link.next().attr('href');
          var torrent_title = find_torrent_title.text();
          var torrent_seed = find_torrent_seed.find('span').first().text();
          var torrent_leech = find_torrent_seed.find('span').first().next().text();

          var regExp = /\Size: ([^)]+) \Date:/;
          var matches = regExp.exec(find_torrent_size);
          var size = matches[0].split(' | Date:').join('').split('Size: ').join('');
          var torrent_size = size;

          var regExp2 = /\Date: ([^)]+) \UTC/;
          var matches2 = regExp2.exec(find_torrent_size);
          var date_added = moment(Date.parse(matches2[1] + " UTC")).fromNow();

          scope.buildResult(scope.getDataStructure(
            torrent_title, "", torrent_seed, torrent_leech,
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

module.exports = tokyotosho
