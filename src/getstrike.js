"use strict"

import Provider from './provider.js'
import moment from 'moment'

export class getstrike extends Provider {

  processSearchResponse(data, deferred, scope, torrentResultList) {
    if (data.results > 0) {
      for (var torrent in data.torrents) {

        var title = data.torrents[torrent].torrent_title;
        var torrent_link = data.torrents[torrent].magnet_uri;
        var seeds = data.torrents[torrent].seeds;
        var leech = data.torrents[torrent].leeches;
        var size = scope.bytesToSize(data.torrents[torrent].size);
        var date_added = moment(Date.parse(data.torrents[torrent].upload_date)).fromNow();

        scope.buildResult(scope.getDataStructure(
          title, "", seeds, leech,
          size, "",
          torrent_link, false, date_added
        ), torrentResultList, deferred);
      }
    } else {
      deferred.reject("No torrents found.");
    }
  }
}

module.exports = getstrike
