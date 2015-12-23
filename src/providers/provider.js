"use strict"

import r from "request";
import cheerio from "cheerio";
import Q from "q";
/**
 * base provider class
 */
export class Provider {

	constructor(urlParams, getParams, responseFormat) {
		this._urlParams = urlParams;
		this._getParams = getParams;
		this._responseFormat = responseFormat;
		this._cheerio = cheerio;
		this._request = r;
		this._lastQuery = undefined;
		this._requestOptions = { };
	}

	/**
	 * uses getparams for preparing url replacing
	 * query pattern and constructing get parameters
	 */
	getSearchUrl(query) {
		var result = this.baseUrl;
		result += this.searchHierPart;
		if (result.indexOf('%q') != -1) {
			query = query.split(' ').join(this.hierEscapeChar);
			result = result.split('%q').join(query);
		}
		//prepare get parameters
		if (this.getparams) {
			var count = 1;
			for (var param in this.getparams) {
				// console.log(result);
				if (count == 1) {
					if (!(result.indexOf('?', result.length - '?'.length) !== -1)) {
						result = result + '?';
					}
				} else { result = result + "&"; }
				//if %q is in get part
				if (this.getparams[param] == '%q') {
					this.getparams[param] = encodeURIComponent(query);
				}
				result = result + param + '=' + this.getparams[param];
				count = count + 1;
			}
		}
		return result;
	}

	/**
	 * "abstract function" , should be overridden in every subclass to do
	 *  the transformation from html/json into js object
	 */
	processSearchResponse(data) {
		console.warn('Unimplemented method: processResponse in class ' + this.name);
	}

	/**
	 * generates a unified object with default parameters from every provider response
	 * should be called from processResponse function
	 */
	getDataStructure(title, category, seeds, leechs, size, magnetLink,
		 torrentLink, verified, dateAdded) {
			return {
				"title": title,
				"category": category ? category : "",
				"seeds": seeds ? seeds : -1,
				"leechs": leechs ? leechs : -1,
				"size": size ? size : -1,
				"magnetLink": magnetLink ? magnetLink : "",
				"torrentlink": torrentLink ? torrentLink : "",
				"verified": verified ? verified : false,
				"dateAdded": dateAdded ? dateAdded : -1,
			};
	}

	/**
	 * called from the subclass after json/html was parsed and
	 * we generate the result object
	 */
	buildResult(data , torrentResultList, deferred) {
		 data['num'] = torrentResultList.length+1;
		 data['providerName'] = this.name;
		 torrentResultList.push(data);
		 deferred.resolve(torrentResultList);
	}

	/**
	 * helper function, formats bytes
	 */
	bytesToSize(bytes) {
		var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes === 0) return '0 Byte';
		var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		return Math.round(bytes / Math.pow(1024, i), 2) + '' + sizes[i];
	}


	/**
	 * does the html request and starts to process the response
	 * 'processResponse' should be overridden in subclasses!
	 */
	search(query) {

		var deferred = Q.defer();
		var scope = this;
		this._requestOptions['url'] = this.getSearchUrl(query);

		console.log('calling url: ' + this.requestOptions.url + " response format:" + scope.responseFormat);
		//save for future use
		this.lastQuery = query;

		//do request
		this.request(this.requestOptions, function (err, response, body) {
			if (!err && response.statusCode === 200) {
				var data;
				var torrentResultList = [];
				switch (scope.responseFormat) {
					case 'json':
						data = JSON.parse(body);
						break;
					default:
						data = cheerio.load(body);
						break;
				}
				if (data) {
					scope.processSearchResponse(data, deferred, scope, torrentResultList);
					return;
				}
			}
			deferred.reject("There was a problem loading " + scope.name + " code "
			+ response.statusCode);
		});
		return deferred.promise;
	}

	/**
	 * getters
	 */

	get getparams() { return this._getParams; }
	get name() { return this.constructor.name; }
	get baseUrl() { return this._urlParams.baseUrl; }
	get searchHierPart() { return this._urlParams.searchHierPart; }
	get searchUrl() { return this.baseUrl + this.searchHierPart; }
	get hierEscapeChar() {
		return this._urlParams.hierEscapeChar ? this._urlParams.hierEscapeChar : '-';
	}
	get responseFormat() { return this._responseFormat; }

	get lastQuery() { return this._lastQuery; }
	set lastQuery(value) { this._lastQuery = value; }

	//set getters/setters for http client & dom processor
	get cheerio() { return this._cheerio; }
	get request() { return this._request; }
	set request(value) { this._request = value; }
	get requestOptions() { return this._requestOptions; }
}

module.exports = Provider;
