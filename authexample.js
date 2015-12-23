"use strict"
var fs = require('fs');
var searchApi = new (require('./dist/babel/searchtorrents.js').searchtorrents)();

// put authconfig.json next to authexample.js
// {
//   "ncore": {
//       "username":"YOUR_USERNAME",
//       "password":"YOUR_PASSWORD"
//     }
// }


//read login data from disk
var scope = this;
fs.exists('authconfig.json', function (exists) {
		if(exists) {
			init(JSON.parse(fs.readFileSync('authconfig.json', 'utf8')));
		}
});

//get access to api

//do login if neccessary and search
function init(authConfig) {
		var ncore = searchApi.initProvider('ncore');
		ncore.username = authConfig.ncore.username;
		ncore.password = authConfig.ncore.password;

		for(var providerName of searchApi.providers.keys()) {
			searchApi.providers.get(providerName).search('Hogyan ússzunk').then(function(response) {
				console.log("response from " + response[0]['providerName'] + "\n"
				+ response[0].title + " count: " + response.length);
			}, function(error) {
				console.error(error);
			});
		}

}
