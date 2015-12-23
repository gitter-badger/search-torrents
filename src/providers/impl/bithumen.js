"use strict"

import authprovider from '../authprovider.js'

export class bithumen extends authprovider {

  /**
   * loggin in
   */
  doLogin(html) {
    console.info(this.name + ' logging in..');
    var $ = this.cheerio.load(html);
    this.request({
      url: this.loginUrl,
      method: 'POST',
      form: {
        salted_passhash: '',
        salted_passhash_trimmed: '',
        vxx: $('#login-vxx').attr('value'),
        username: this.username,
        password: this.password,
        returnto: '/'
      }
    });
  }

  isLoggedIn($) {
    return $('#login-vxx').html() == null;
  }

  processSearchResponse($, deferred, scope, torrentResultList) {
    if(!super.processSearchResponse($, deferred, scope, torrentResultList)) {
      console.info('We logged in... '+ this.name);
      return;
    }
    if($('#torrenttable').find('tr').length > 1) {
        $('#torrenttable tr').each(function(index, torrents) {
          if(index > 0) {
            var links = $(torrents).find('td a b');
            $(links).each(function(i, link) {
              var parent = $(link).parent();
              var tdLevel = parent.parent().parent().children('td');
              if (parent.attr('href').indexOf("details.php") > -1) {

                var title = parent.attr('title') ? parent.attr('title') : $(link).text();
                var link = scope.baseUrl + "/"+ parent.next().attr('href');
                var dateAdded = tdLevel.eq(4).find('nobr').text();
                var size = tdLevel.eq(5).find('u').text();
                var seed = tdLevel.eq(7).find('font').text();
                var leeech = tdLevel.eq(8).find('a').text();

                scope.buildResult(scope.getDataStructure(
    							 title,"", seed, leeech, size, "", link, true, dateAdded
    						), torrentResultList, deferred);
              }
            });
          }
        });
    }
  }
}

module.exports = bithumen
