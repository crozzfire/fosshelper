'use strict';

var textract = require('textract');
var skills = require('../../skills');
var all_skills = skills.all_skills;
var multiparty = require('multiparty');


exports.upload = function(req,res){

	var form = new multiparty.Form();	
      form.parse(req, function(err, fields, files) {
      
      var filePath = files['file'][0].path;
      

      	textract.fromFileWithPath(filePath, function( error, text ) {
                  if(error){
                        console.log(error);
                        res.status(500).send('Error while parsing');
                  }
                  
      		var textChunks = text.split(' ');
      		var skillsFound = [];
      		textChunks.forEach(function(obj){
      			var lowerobj = obj.toLowerCase();
      			if ( all_skills.indexOf(lowerobj) > -1 ){
      				if ( skillsFound.indexOf(obj) == -1 ){
      					skillsFound.push(obj);
      				}
      			}
      		});
      	// end of for each
	  	res.status(200).send(skillsFound);
      });
      // end of textract 
	});

}
