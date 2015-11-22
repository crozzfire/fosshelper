'use strict';

angular.module('fosshelperApp')
  .controller('RecommendationsCtrl', function ($scope,Auth,$http,$location) {
    var params = $location.search();
    var experience = params['experience'];
    var skills = params['skills']
    $http.post("/api/recommendations/"+experience+"/"+skills).success(function(data,status){
        //$scope.topHits = data.splice(0,3);
        $scope.recommendations = data;//.splice(2);
    })
  });
