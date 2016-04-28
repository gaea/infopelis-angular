'use strict';

/* Global Configs */

var infopelisRoutes = angular.module('infopelisRoutes', ['ngRoute']);

infopelisRoutes.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/movie-list.html',
        controller: 'MovieListCtrl'
      }).
      when('/search/movies/:query', {
        templateUrl: 'partials/movie-list.html',
        controller: 'MovieSearchCtrl'
      }).
      when('/search/actors/:query', {
        templateUrl: 'partials/actor-list.html',
        controller: 'ActorSearchCtrl'
      }).
      when('/movie/:movieId', {
        templateUrl: 'partials/movie-detail.html',
        controller: 'MovieDetailCtrl'
      }).
      when('/actor/:actorId', {
        templateUrl: 'partials/actor-detail.html',
        controller: 'ActorDetailCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
]); 
