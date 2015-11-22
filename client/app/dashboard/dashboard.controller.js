'use strict';

angular.module('fosshelperApp')
  .controller('DashboardCtrl', function ($scope, Auth, User,$location) {
    $scope.user = Auth.getCurrentUser();

    $scope.recommend = function(){
    	$scope.experience = this.experienceLevel;
    	$scope.skills = ['javascript','html'];
    	$location.path('/recommendations').
    		search('experience' , $scope.experience).
    		search('skills', $scope.skills);
    }

  });
