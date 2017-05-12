'use strict';

/* Controllers */

var movieController = angular.module('movieController', []);

movieController.controller('MovieListCtrl', ['$scope', '$filter', '$routeParams', 'MovieService',
  function($scope, $filter, $routeParams, MovieService) {
    $scope.movies = [];
    $scope.page = 1;
    $scope.date = new Date();
    $scope.predicate = 'release_date';
    $scope.reverse = false;
    var orderBy = $filter('orderBy');

    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;

      $scope.movies = orderBy($scope.movies, predicate, $scope.reverse);
    };
    
    $scope.loadNextPage = function() {
      if($scope.morePages) {
        $scope.page += 1;
        $scope.loadPage($scope.page);
      }
    }

    $scope.loadPage = function(page) {
      MovieService.discover(page).success(function(movies){
        console.log(movies);
        $scope.movies = $scope.movies.concat(movies.results);
        $scope.morePages = movies.total_pages > $scope.page;
      }).error(function(error){
        console.log(error.status_code + error.status_message);
      });
    }

    $scope.loadPage($scope.page);
  }
]);

movieController.controller('MovieDetailCtrl', ['$scope', '$routeParams', 'MovieService',
  function($scope, $routeParams, MovieService) {

    MovieService.getMovie($routeParams.movieId).success(function(movie){
      console.log(movie);
      var fixedImages = [];

      for(var i=0; i<movie.images.backdrops.length; i++) {
          fixedImages.push({
            thumb: 'https://image.tmdb.org/t/p/w300/' + movie.images.backdrops[i].file_path, img: 'https://image.tmdb.org/t/p/w1920' + movie.images.backdrops[i].file_path, description: 'Image ' + i
          });
      }

      $scope.fixedImages = fixedImages;
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

movieController.controller('MovieSearchCtrl', ['$scope', '$filter', '$routeParams', 'MovieService',
  function($scope, $filter, $routeParams, MovieService) {
    $scope.movies = [];
    $scope.page = 1;
    $scope.search = true;
    $scope.reverse = false;
    $scope.morePages = false;
    var orderBy = $filter('orderBy');

    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;

      $scope.movies = orderBy($scope.movies, predicate, $scope.reverse);
    };

    $scope.search = function (query, page) {
      MovieService.search(query, page).success(function(movies){
        $scope.movies = $scope.movies.concat(movies.results);
        $scope.morePages = movies.total_pages > $scope.page;
      }).error(function(error){
        console.log(error.status_code + error.status_message);
      });
    }

    $scope.loadNextPage = function() {
      if($scope.morePages) {
        $scope.page += 1;
        $scope.search($routeParams.query, $scope.page);
      }
    }

    $scope.search($routeParams.query, $scope.page);
  }
]);