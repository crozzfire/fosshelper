'use strict';

angular.module('fosshelperApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('recommendations', {
        url: '/recommendations',
        templateUrl: 'app/recommendations/recommendations.html',
        controller: 'RecommendationsCtrl',
        authenticate: true
      });
  });