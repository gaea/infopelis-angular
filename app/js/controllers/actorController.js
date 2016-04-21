'use strict';

/* Controllers */

var actorController = angular.module('actorController', []);

actorController.controller('ActorListCtrl', ['$scope', '$routeParams', 'ActorService',
  function($scope, $http, ActorService) {
    $scope.movies = [];

    ActorService.discover(1).success(function(movies){
        console.log(movies);
        $scope.movies = movies.results;
      }).error(function(error){
        console.log(error.status_code + error.status_message);
    });
  }
]);

actorController.controller('ActorDetailCtrl', ['$scope', '$routeParams', 'ActorService',
  function($scope, $routeParams, ActorService) {
    ActorService.get($routeParams.actorId).success(function(actor){
      console.log(actor);
      $scope.actor = actor;
    }).error(function(error){
      console.log(error.status_code + error.status_message);
    });
  }
]);