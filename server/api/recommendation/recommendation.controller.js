'use strict';

var _ = require('lodash');
var Recommendation = require('./recommendation.model');
var User = require('../user/user.model')
var template_query = require('./template_query.js')
var elasticsearch = require('elasticsearch');
var client = elasticsearch.Client({
  host: 'localhost:9200'  
});



// Get a single recommendation
exports.show = function(req, res) {
  
};

exports.recommend = function(req,res) {
  console.log(req.params);
  var forks = 0;
  var watchers = 0;
  var issues = 0;
  var skills = req.params.skills.split(",")
  if ( req.params.experience == '1' ){
    forks = 5;
    watchers = 3;
    issues = 50;
  }else if ( req.params.experience == '2'){
    forks = 10;
    watchers = 10;
    issues = 25;
  }else if ( req.params.experience == '3'){
    forks = 10;
    watchers = 100;
    issues = 5;
  }

  var query = JSON.stringify(template_query);

  query = query.
            replace('{{forks}}',forks).
            replace('{{watchers}}',watchers).
            replace('{{issues}}',issues).
            replace('{{skills}}',skills);
  query = JSON.parse(query);

  client.search({
    index: 'fosshelper',
    body: query
  }).then(function(resp,err){
    if ( err != null){
      res.status(500).send(err)
    }
    var hits = resp.hits.hits;
    var recommendations = []
    console.log(typeof(hits))    
    hits.forEach(function(obj){
      var highlights = obj['highlight'];
      obj = obj['_source'];
      var name = obj['name'];
      var url = obj['html_url'];
      var lang = obj['language'];
      var description = obj['description'];
      var issues = obj['open_issues'];
      var forks = obj['forks'];
      var watchers = obj['watchers'];
      var dateString = obj['updated_at'];
      var lastUpdated = ""
      var timeUpdated = ""
      if ( dateString != null || dateString != ""){
        dateString = dateString.replace(/-/g,"/");
        dateString = dateString.replace('T',' ');
        var dateObj = new Date(dateString);
        var mon = dateObj.getUTCMonth() + 1;
        lastUpdated = "" + dateObj.getUTCDate() + "-" + mon + "-" + dateObj.getUTCFullYear();
        
        timeUpdated = "" + dateObj.getUTCHours() + ":" + dateObj.getUTCMinutes() + ":" + dateObj.getUTCSeconds();
      }
      
      var avatar = obj['owner']['avatar_url'];
      var source = obj['source']

      var matchedSkills = [];
      for ( var key in highlights ){
        for ( var field in highlights[key] ){
          var matchedString = highlights[key][field];
          var skill = matchedString.match(new RegExp("<em>" + "(.*)" + "</em>"))[1].
                      replace('"','').
                      toLowerCase();
          if (matchedSkills.indexOf(skill) == -1)
            matchedSkills.push(skill);
        }

      }

      var recommend = {
        'name' : name,
        'url' : url,
        'lang' : lang,
        'description' : description,
        'issues' : issues,
        'forks' : forks,
        'watchers' : watchers,
        'lastUpdated' : lastUpdated,
        'timeUpdated' : timeUpdated,
        'avatar' : avatar,
        'source' : source,
        'matchedSkills' : matchedSkills.join(",")
      };
      recommendations.push(recommend);
    })

    res.status(200).send(recommendations);

  });

  
};

function handleError(res, err) {
  return res.status(500).send(err);
}
