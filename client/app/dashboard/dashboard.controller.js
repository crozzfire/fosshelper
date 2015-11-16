'use strict';

angular.module('fosshelperApp')
  .controller('DashboardCtrl', function ($scope, Auth, User) {
    $scope.user = Auth.getCurrentUser();

    $scope.recommend = function(){
    	$scope.experience = this.experienceLevel;
    }

  });
