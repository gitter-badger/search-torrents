"use strict"

import Provider from './provider.js'

export class seedpeer extends Provider {

  processSearchResponse($, deferred, scope, torrentResultList) {
    if ($('#body table tr').length > 7) {
      $('#body table tr').each(function(index, torrents) {
        var d = $(this);
        var td = d.children('td');
        var links = $(torrents).find('a');

        $(links).each(function(i, link) {
          if ($(link).attr('href').indexOf("/details/") > -1 && $(link).attr('href').indexOf("facebook") < 1) {
						scope.buildResult(scope.getDataStructure(
							 $(link).text(),"", $(td).eq(3).text(),
							 $(td).eq(4).text(),scope.bytesToSize($(td).eq(2).text()),
							 "", scope.baseUrl + $(link).attr('href'), false, $(td).eq(1).text()
						), torrentResultList, deferred);
          }
        });
      });
    } else {
      deferred.reject("No torrents found");
    }
  }
}

module.exports = seedpeer
