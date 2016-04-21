'use strict';

/* Directives */

var movieDirective = angular.module('movieDirective', [
  'youtube-embed']);

movieController.directive('movie', function() {
  return {
  	restrict: 'E',
    templateUrl: 'js/directives/movie-directive.html'
  };
});