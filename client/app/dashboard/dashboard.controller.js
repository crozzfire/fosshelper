'use strict';

angular.module('fosshelperApp')
  .controller('DashboardCtrl', function ($scope, Auth, User,$location) {
    $scope.user = Auth.getCurrentUser();
    $scope.data = {'topSkills':{}};
    $scope.experience = "";
    $scope.skills = [];

    $scope.recommend = function(){
    	$scope.experience = $scope.data.experienceLevel;
    	$scope.skills = Object.keys($scope.data.topSkills);

    	$location.path('/recommendations').
    		search('experience' , $scope.experience).
    		search('skills', $scope.skills);
    };

    $scope.addSkill = function($event){
    	var newSkill = $scope.data.newSkill;
    	if(newSkill){
    		console.log(newSkill);
    		$scope.data.topSkills[newSkill] = true;
    		$scope.user.linkedin.skills.push(newSkill);
    	}
    	$event.preventDefault();
    }

  });
