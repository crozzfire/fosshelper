'use strict';

var User = require('../api/user/user.model');

//Factory method
var scraper = function (req,res){

	var source = req.params.source;
	var exec = require('child_process').exec,
    child;

    if(source == 'linkedin'){

		var email = req.body.email;
		var url = req.body.publicProfileUrl;
	
	    var command = 'casperjs '+ __dirname+'/linkedinProfile.js '+ url +' --cookies-file=cookies.txt --ssl-protocol=any';
		child = exec(command,
  		function (error, skillsJSON, stderr) {

  			if (error !== null) {
  				console.log(error);
      			res.status(500).send("Error while fetching skills from LinkedIn");
    		}

    		var skills = JSON.parse(skillsJSON);
    		User.findOne({'emails': email},function(err,user){
    			if (err){
    				console.log(err);
    				res.status(500).send("Error while fetching skills from LinkedIn");		    				
    			}	    			

    			user.linkedin.skills = skills;	    			
    			user.markModified('linkedin');
    			user.save();

    			res.status(200).send("OK");
    		});		    		
		});	
	}
}


module.exports.scraper = scraper;