'use strict';

angular.module('fosshelperApp')
  .controller('MainCtrl', function ($scope, $http, $window) {
     $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
