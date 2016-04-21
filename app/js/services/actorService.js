'use strict';

/* Services */

var actorService = angular.module('actorService', []);

actorService.factory('ActorService', ['$http', 'API_KEY', 'API_URL',
	function($http, API_KEY, API_URL) {
		return {
			get: function(actorId) {
				var url = API_URL + "/person/" + actorId + "?api_key=" + API_KEY + "&append_to_response=movies,trailers,images,credits";
				return $http.get(url); 
			},
			search: function(query, page) {
				var url = API_URL + "/search/person?api_key=" + API_KEY + "&query=" + query + "&page=" + page;
				return $http.get(url); 
			}
		};
	}
]);