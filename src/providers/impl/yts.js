"use strict"

import Provider from '../provider.js'
import moment from 'moment'

export class yts extends Provider {

  processSearchResponse(data, deferred, scope, torrentResultList) {
    if (data && data.data && data.data.movie_count > 0) {
      //skip one level
      data = data.data;
      for (var torrent in data.movies) {
        var title = data.movies[torrent].title_long;

        for (var torrents in data.movies[torrent].torrents) {

          var torrent_quality = data.movies[torrent].torrents[torrents].quality;
          var torrent_title = title + ' ' + torrent_quality;
          var seeds = data.movies[torrent].torrents[torrents].seeds;
          var leechs = data.movies[torrent].torrents[torrents].peers;
          var hash = data.movies[torrent].torrents[torrents].hash;
          var torrent_link = "http://torcache.net/torrent/" + hash + ".torrent";
          var size = data.movies[torrent].torrents[torrents].size;
          var date_added = moment(Date.parse(data.movies[torrent].torrents[torrents].date_uploaded.split(' ')[0])).fromNow();

          scope.buildResult(scope.getDataStructure(
            torrent_title, "", seeds, leechs,
            size, "",
            torrent_link, false, date_added
          ), torrentResultList, deferred);

        }
      }
    } else {
      deferred.reject("No torrents found");
    }
  }
}

module.exports = yts
