'use strict';

angular.module('fosshelperApp')
  .controller('ScrapeCtrl', function ($scope, $http, $location) {

  	$scope.msg = "Asking LinkedIn for the things that you are really good at ...";
    var email = $location.search()['email'];
    var publicProfileUrl = $location.search()['publicProfileUrl'];
    var source = $location.search()['source'];

    if(source == 'linkedin'){
	    //Scrape linkedin skills
	    $http.post('/api/scrape/linkedin',{'email':email,'publicProfileUrl':publicProfileUrl}).success(function(res){
	    	console.log(res);
	    	if(res == "OK"){
	    		//All good    		
	    		$location.path('/');
	    	}
	    }).error(function(){
	    	$scope.msg = "There was an error doing this :( Please try again.";
	    });
	}

  });
