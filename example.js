"use strict"

//get access to api
var searchApi = new (require('./dist/babel/searchtorrents.js').searchtorrents)();

//init
searchApi.initProviders();

//do a search on every provider
for(var providerName of searchApi.providers.keys()) {
	searchApi.providers.get(providerName).search('Star Wars').then(function(response) {
		console.log("response from " + response[0]['providerName'] + "\n"
		+ response[0].title + " count: " + response.length);
	}, function(error) {
		console.error(error);
	});
}
