'use strict';

/* Services */

var movieService = angular.module('movieService', []);

movieService.factory('MovieService', ['$http', 'TMDB_API',
	function($http, TMDB_API) {
		return {
			getMovie: function(movieId) {
				var url = TMDB_API.URL + "/movie/" + movieId + "?api_key=" + TMDB_API.KEY + "&append_to_response=releases,trailers,images,credits&include_image_language=en,null";
				return $http.get(url); 
			},
			discover: function(page) {
				var url = TMDB_API.URL + "/discover/movie?api_key=" + TMDB_API.KEY + "&page=" + page;
				return $http.get(url); 
			},
			search: function(query, page) {
				var url = TMDB_API.URL + "/search/movie?api_key=" + TMDB_API.KEY + "&query=" + query + "&page=" + page;
				return $http.get(url); 
			}
		};
	}
]);