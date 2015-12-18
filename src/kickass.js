"use strict"

import Provider from './provider.js'
import moment from 'moment'

export class kickass extends Provider {

    processSearchResponse(data, deferred, scope, torrentResultList) {
        if (data && data.list && data.list.length) {
            for (var torrent in data.list) {
                var tData = data.list[torrent];
                scope.buildResult(
                  scope.getDataStructure(
                     tData.title, tData.category, tData.seeds,
                     tData.leechs, scope.bytesToSize(tData.size),
                     "magnet:?xt=urn:btih:" + tData.hash + "&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce",
                     tData.torrentLink, tData.verified === 1, moment(Date.parse(tData.pubDate)).fromNow()
                  ), torrentResultList, deferred);
            }
        } else {
            deferred.reject("No torrents found");
        }
    }
}

module.exports = kickass
