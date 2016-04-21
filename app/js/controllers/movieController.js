'use strict';

/* Controllers */

var movieController = angular.module('movieController', []);

movieController.controller('MovieListCtrl', ['$scope', '$routeParams', 'MovieService',
  function($scope, $http, MovieService) {
    $scope.movies = [];

    MovieService.discover(1).success(function(movies){
        console.log(movies);
        $scope.movies = movies.results;
      }).error(function(error){
        console.log(error.status_code + error.status_message);
    });
  }
]);

movieController.controller('MovieDetailCtrl', ['$scope', '$routeParams', 'MovieService',
  function($scope, $routeParams, MovieService) {

    MovieService.getMovie($routeParams.movieId).success(function(movie){
      console.log(movie);
      $scope.movie = movie;
      $scope.mainImageUrl = $scope.movie.poster_path;
    }).error(function(error){
      console.log(error.status_code + error.status_message);
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  }
]);