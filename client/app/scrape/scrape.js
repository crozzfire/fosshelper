'use strict';

angular.module('fosshelperApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('scrape', {
        url: '/scrape',
        templateUrl: 'app/scrape/scrape.html',
        controller: 'ScrapeCtrl',
        authenticate: true
      });
  });