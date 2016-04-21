'use strict';

/* Services */

var movieService = angular.module('movieService', []);

movieService.factory('MovieService', ['$http', 'API_KEY', 'API_URL',
	function($http, API_KEY, API_URL) {
		return {
			getMovie: function(movieId) {
				var url = API_URL + "/movie/" + movieId + "?api_key=" + API_KEY + "&append_to_response=releases,trailers,images,credits&include_image_language=en,null";
				return $http.get(url); 
			},
			discover: function(page) {
				var url = API_URL + "/discover/movie?api_key=" + API_KEY + "&page=" + page;
				return $http.get(url); 
			},
			search: function(query, page) {
				var url = API_URL + "/search/movie?api_key=" + API_KEY + "&query=" + query + "&page=" + page;
				return $http.get(url); 
			}
		};
	}
]);