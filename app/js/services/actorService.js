'use strict';

/* Services */

var actorService = angular.module('actorService', []);

actorService.factory('ActorService', ['$http', 'TMDB_API',
	function($http, TMDB_API) {
		return {
			get: function(actorId) {
				var url = TMDB_API.URL + "/person/" + actorId + "?api_key=" + TMDB_API.KEY + "&append_to_response=movies,trailers,images,credits";
				return $http.get(url); 
			},
			search: function(query, page) {
				var url = TMDB_API.URL + "/search/person?api_key=" + TMDB_API.KEY + "&query=" + query + "&page=" + page;
				return $http.get(url); 
			}
		};
	}
]);