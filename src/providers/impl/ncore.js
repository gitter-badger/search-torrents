"use strict"

import authprovider from '../authprovider.js'

export class ncore extends authprovider {

    doLogin(html) {
      console.info(this.name + ' logging in..');
      var $ = this.cheerio.load(html);
      this.request({
        url: this.loginUrl,
        method: 'POST',
        form: {
          set_lang: 'hu',
          submitted: 1,
          vxx: $('#login-vxx').attr('value'),
          nev: this.username,
          pass: this.password,
          submit: 'Belépés!'
        }
      });
    }

    isLoggedIn($) {
      return $('.login_td').html() == null;
    }

    processSearchResponse($, deferred, scope, torrentResultList) {
      if(!super.processSearchResponse($, deferred, scope, torrentResultList)) {
        console.info('We logged in... '+ this.name);
        return;
      }
      $('.box_torrent_all .box_nagy , .box_nagy2').each(function(index, torrents) {
          var title = $(torrents).find('a').attr('title');
          var dateAdded = $(torrents).find('.box_feltoltve , .box_feltoltve2')
          .html().split('<br>').join(' ');
          var seeds = $(torrents).find('.box_s2 a').text();
          var leechs = $(torrents).find('.box_l2 a').text();
          var size = $(torrents).find('.box_meret2').text();
          var torrentLink = scope.baseUrl + "/" + $(torrents).find('.torrent_txt a').
          attr('href').split('action=details').join('action=download');
          var verified = $(torrents).find('.torrent_ok').length > 0;
          var category = $(torrents).parent().find('.categ_link').attr('alt');

          scope.buildResult(scope.getDataStructure(
            title, category, seeds, leechs, size, "", torrentLink, verified, dateAdded),
           torrentResultList, deferred);
        });

    }
}

module.exports = ncore
