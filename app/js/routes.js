'use strict';

/* Global Configs */

var infopelisRoutes = angular.module('infopelisRoutes', ['ngRoute']);

infopelisRoutes.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/movies', {
        templateUrl: 'partials/movie-list.html',
        controller: 'MovieListCtrl'
      }).
      when('/actors', {
        templateUrl: 'partials/actor-list.html',
        controller: 'ActorListCtrl'
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
        redirectTo: '/movies'
      });
  }
]); 
