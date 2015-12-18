"use strict"
var requireDir = require('require-dir');
var providerClazzDir = requireDir('./dist/babel');
let providers = new Map();

var searchString = 'Star Wars';

//todo rarbg auth

//init providers
providerFactory('btdigg',{ baseUrl:'https://btdigg.org', searchHierPart:'/search' }, {q:'%q', p:0, order:1 },  'html');
providerFactory('cpasbien',{ baseUrl:'http://www.cpasbien.io', searchHierPart:'/recherche/%q.html', hierEscapeChar:'-' }, { },  'html');
providerFactory('extratorrent',{ baseUrl:'http://extratorrent.cc', searchHierPart:'/search/' }, {search:'%q', new:1, x:0, y:0 },  'html');
providerFactory('eztv',{ baseUrl:'https://www.eztv.ag', searchHierPart:'/search/%q', hierEscapeChar:'-' }, { },  'html');
providerFactory('getstrike',{ baseUrl:'https://getstrike.net', searchHierPart:'/api/v2/torrents/search' }, {phrase:'%q' },  'json');
providerFactory('kickass', { baseUrl: 'https://kat.cr', searchHierPart: '/json.php' }, { q:'%q',field:'seeders',order:'desc',page:1 }, 'json');
providerFactory('leetx',{ baseUrl:'https://1337x.to', searchHierPart:'/search/%q/1/', hierEscapeChar:'+' }, {},  'html');
providerFactory('limetorrents',{ baseUrl:'http://limetorrents.cc', searchHierPart:'/search/all/%q/seeds/1/', hierEscapeChar:'-' }, { },  'html');
providerFactory('nyaa',{ baseUrl:'http://www.nyaa.se', searchHierPart:'/' }, {term:'%q', page:'search', sort:2 }, 'html');
providerFactory('rarbg',{ baseUrl:'https://torrentapi.org', searchHierPart:'/pubapi_v2.php' }, {search_string:'%q',mode:'search', sort:'seeders' , format:'json_extended', token:''},  'json');
providerFactory('seedpeer',{ baseUrl:'http://seedpeer.eu', searchHierPart:'/search/%q/4/1.html', hierEscapeChar:'-'}, undefined, 'html');
providerFactory('tokyotosho',{ baseUrl:'https://www.tokyotosho.info', searchHierPart:'/search.php', hierEscapeChar:'+' },
{terms:'%q', type:0, size_min:'', size_max:'', username:''},  'html');
providerFactory('tpb',{ baseUrl:'https://thepiratebay.la', searchHierPart:'/search/%q/0/7/0', hierEscapeChar:'%20' }, { },  'html');
providerFactory('yts',{ baseUrl:'https://yts.ag', searchHierPart:'/api/v2/list_movies.json' }, {query_term:'%q', sort:'seeds', order:'desc', set:1 },  'json');

for(var providerName of providers.keys()) {
	providers.get(providerName).search(searchString).then(function(response) {
		console.log("response from " + response[0]['providerName'] + "\n" + response[0].title + " count: " + response.length);
	}, function(error) {
		console.error(error);
	});
}

/**
 * Constructs a provider based on parameters
 * providerClass - name of torrent provider, for instance: KickAss
 * baseUrl - the hier-part of the url with or w/ %q(uery) pattern
 */
function providerFactory(providerClass, urlParams, getParams, responseParams) {
	var myProviderObj = providers.get(providerClass);
	if(!myProviderObj && providerClazzDir[providerClass]) {
		myProviderObj = new providerClazzDir[providerClass](urlParams, getParams, responseParams);
		providers.set(providerClass,  myProviderObj);
		return myProviderObj;
	}
	console.error('provider class was not found:' +providerClass);
}
