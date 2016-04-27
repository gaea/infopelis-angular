'use strict';

/* Controllers */

var actorController = angular.module('actorController', []);

actorController.controller('ActorListCtrl', ['$scope', '$routeParams', 'ActorService',
  function($scope, $routeParams, ActorService) {
    $scope.actors = [];

    ActorService.search("cameron", 1).success(function(actors) {
        console.log(actors);
        $scope.actors = actors.results;
      }).error(function(error){
        console.log(error.status_code + error.status_message);
    });
  }
]);

actorController.controller('ActorDetailCtrl', ['$scope', '$routeParams', 'ActorService',
  function($scope, $routeParams, ActorService) {
    ActorService.get($routeParams.actorId).success(function(actor) {
      console.log(actor);
      var fixedImages = [];
      console.log(actor.images.profiles.length);

      for(var i=0; i<actor.images.profiles.length; i++) {
          fixedImages.push({
            thumb: 'http://image.tmdb.org/t/p/w150/' + actor.images.profiles[i].file_path, img: 'http://image.tmdb.org/t/p/w500/' + actor.images.profiles[i].file_path, description: 'Image ' + i
          });
      }

      console.log(fixedImages);

      $scope.fixedImages = fixedImages;
      $scope.actor = actor;
      $scope.movies = actor.credits.cast;
    }).error(function(error){
      console.log(error.status_code + error.status_message);
    });
  }
]);