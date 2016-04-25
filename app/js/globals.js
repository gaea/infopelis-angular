'use strict';

/* Global Configs */

var infopelisConfigs = angular.module('infopelisConfigs', []);

infopelisConfigs.constant('TMDB_API', {
	'KEY': 'd7bbb7c7bc688749787a8e7d03ea0941',
	'URL': 'https://api.themoviedb.org/3'
});

infopelisConfigs.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://www.youtube.com/**'
  ]);
});