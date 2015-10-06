'use strict';

var kue = require('kue');                                                    
var jobs = kue.createQueue();

var User = require('../api/user/user.model');

var createJob = function (type, email, url){
	var job = jobs.create('scraping',{type:type, url:url, email:email});
	job.save();
}

jobs.process('scraping',function(job,done){
	var url = job.data.url;
	var type = job.data.type;
	var email = job.data.email;
	
	var exec = require('child_process').exec,
    child;

    if(type == 'linkedin'){
	    var command = 'casperjs '+ __dirname+'/../scrapers/linkedinProfile.js '+ url +' --cookies-file=cookies.txt --ssl-protocol=any';
		child = exec(command,
	  		function (error, skillsJSON, stderr) {
	  			if (error !== null) {
	      			console.log('exec error: ' + error);
	      			exit(1);
	    		}

	    		var skills = JSON.parse(skillsJSON);
	    		User.findOne({'emails': email},function(err,user){
	    			if (err){
	    				console.log(err);
	    				exit(1);
	    			}	    			
	    			user.linkedin.skills = skills;	    			
	    			user.markModified('linkedin');
	    			user.save();
	    		});
	    		
		});	
	}
});

module.exports.createJob = createJob;