'use strict';

/* Controllers */

var actorController = angular.module('actorController', []);

actorController.controller('ActorSearchCtrl', ['$scope', '$filter', '$routeParams', 'ActorService',
  function($scope, $filter, $routeParams, ActorService) {
    $scope.actors = [];
    $scope.page = 1;
    $scope.morePages = false;
    $scope.reverse = false;
    var orderBy = $filter('orderBy');

    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;

      $scope.actors = orderBy($scope.actors, predicate, $scope.reverse);
    };
    
    $scope.search = function(query, page) {
      ActorService.search($routeParams.query, page).success(function(actors) {
          console.log(actors);
          //$scope.actors = actors.results;
          $scope.actors = $scope.actors.concat(actors.results);
          $scope.morePages = actors.total_pages > $scope.page;
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

actorController.controller('ActorDetailCtrl', ['$scope', '$routeParams', 'ActorService',
  function($scope, $routeParams, ActorService) {
    ActorService.get($routeParams.actorId).success(function(actor) {
      console.log(actor);
      var fixedImages = [];
      console.log(actor.images.profiles.length);

      for(var i=0; i<actor.images.profiles.length; i++) {
          fixedImages.push({
            thumb: 'https://image.tmdb.org/t/p/w185/' + actor.images.profiles[i].file_path, img: 'https://image.tmdb.org/t/p/original/' + actor.images.profiles[i].file_path, description: 'Image ' + i
          });
      }

      console.log(fixedImages);

      $scope.fixedImages = fixedImages;
      $scope.actor = actor;
    }).error(function(error){
      console.log(error.status_code + error.status_message);
    });
  }
]);