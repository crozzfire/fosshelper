'use strict';


angular.module('fosshelperApp')
  .controller('DashboardCtrl', function ($scope, Auth, User, $location, Upload) {
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

    $scope.uploadResume = function(resume){
    	$scope.resume = resume;
    	var uploadEndpoint = "/api/scrape/resume"; //The endpoint is valid. Just handle it in scrapers/scraper.js

        if (resume) {
        	console.log('Uploading: ',resume);
            resume.upload = Upload.upload({
                url: uploadEndpoint,
                data: {file: resume}
            });

            resume.upload.then(function (response) {
                

                $scope.user.linkedin.skills = _.union($scope.user.linkedin.skills,response.data);
                console.log($scope.user.linkedin.skills);
                // response is response.data;                
                // Push to $scope.user.linkedin.skills for now
            }, function (response) {
            	console.log(response.data);
                if (response.status > 0)
                    $scope.resumeUploadError = response.status + ': ' + response.data;
            });
        }   
    }

  });
