'use strict';

/* Controllers */

var movieController = angular.module('movieController', []);

movieController.controller('MovieListCtrl', ['$scope', '$filter', '$routeParams', 'MovieService',
  function($scope, $filter, $routeParams, MovieService) {
    $scope.movies = [];
    $scope.page = 1;
    $scope.search = false;
    $scope.date = new Date();
    $scope.predicate = 'release_date';
    $scope.reverse = false;
    var orderBy = $filter('orderBy');
    

    $scope.loadNextPage = function() {
      $scope.page += 1;
      $scope.loadPage($scope.page);
    }

    $scope.loadBackPage = function() {
      if($scope.page > 1) {
        $scope.page -= 1;
        $scope.loadPage($scope.page);
      }
    }

    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;

      $scope.movies = orderBy($scope.movies, predicate, $scope.reverse);
    };

    $scope.loadPage = function(page) {
      MovieService.discover(page).success(function(movies){
        console.log(movies);
        $scope.movies = $scope.movies.concat(movies.results);
      }).error(function(error){
        console.log(error.status_code + error.status_message);
      });
    }

    $scope.loadPage($scope.page);
    //$scope.order('release_date');
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