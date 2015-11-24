'use strict';

angular.module('fosshelperApp')
  .controller('MainCtrl', function ($scope, $http, $window, Auth) {
     if(Auth.isLoggedIn())
        $window.location.href = '/dashboard';
     $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
