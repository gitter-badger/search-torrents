"use strict"
import provider from './provider.js'
import requestOriginal from "request"
import FileCookieStore from "tough-cookie-filestore";
import fs from 'fs';

export class authprovider extends provider {

  constructor(urlParams, getParams, responseFormat) {
    super(urlParams, getParams, responseFormat);

    //todo if 2 providers tries to access the cookiestore we have a problem...
    //maybe https://github.com/JSBizon/file-cookie-store
    this._cookieFilePath = './cookies.json';

    var scope = this;
    fs.exists(this._cookieFilePath, function (exists) {
        if(!exists) {
          fs.writeFile(scope._cookieFilePath, "", function(err) {
            if(err) {
                return console.log(err);
            }
          });
        }
    });

    //store cookies in file
    this.fileJar = requestOriginal.jar(new FileCookieStore(this._cookieFilePath));
    this.request = requestOriginal.defaults({
      jar: this.fileJar,
      followRedirect:true,
      gzip: true,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.8',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'
      }
    });
  }

  /**
  * preprocesses site response and if query can't be run and you should
  * log in, does the job.
  */
  processSearchResponse(data, deferred, scope, torrentResultList) {
    if (!this.isLoggedIn(data)) {
      scope.loginCounter = scope.loginCounter + 1;
      console.log('You are not logged in ' + scope.name +
        ' trying logging in.. retrying ' + scope.loginCounter);
      if (scope.loginCounter < 3) {
        scope.doLogin(data);
        scope.search(scope.lastQuery);
      } else {
        deferred.reject("There was a problem logging in " + scope.name + " stopping query.. ");
      }
      return false;
    }
    else {
      scope.loginCounter = 0;
      return true;
    }
  }

  /**
  * you should implement logging here
  */
  doLogin(data) {
    console.warn('Unimplemented method: doLogin in class ' + this.name);
  }

  /**
  * you should check logged state and return true/false with processing data
  */
  isLoggedIn(data) {
    console.warn('Unimplemented method: isLoggedIn in class ' + this.name);
  }

  get loginUrl() {
    return this.baseUrl + this._urlParams.loginUrl;
  }
  get username() {
    return this._username;
  }
  get password() {
    return this._password;
  }
  set username(value) {
    this._username = value;
    this.loginCounter = 0;
  }
  set password(value) {
    this._password = value;
    this.loginCounter = 0;
  }
}

module.exports = authprovider;
