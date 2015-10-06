exports.setup = function (User, config) {
  var passport = require('passport');
  var LinkedInStrategy = require('passport-linkedin').Strategy;
  var  _ = require('lodash');
  var scraperQueue = require('../../queues/scraperQueue');

  passport.use(new LinkedInStrategy({
    consumerKey: config.linkedin.clientID,
    consumerSecret: config.linkedin.clientSecret,
    callbackURL: config.linkedin.callbackURL,
    profileFields: ['id', 'first-name', 'last-name', 'email-address', 'location', 'summary', 'picture-url', 'public-profile-url']
  },
  function(token, tokenSecret, profile, done) {    
    
    var emails = _.pluck(profile.emails,'value');    

    User.findOne({
      'emails': {$in: emails}
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        user = new User({
          name: profile.displayName,
          role: 'user',
          providers: ['linkedin'],
          emails: emails,
          linkedin: profile._json
        });
        user.save(function(err) {
          if (err) return done(err);

          //Create the scraping job
          scraperQueue.createJob('linkedin', emails[0], profile._json.publicProfileUrl);
          done(err, user);
        });
      } else {
        //Check if the provider exists:
        if(user.providers.indexOf('linkedin') == -1 && !user.linkedin.length){
          //Merge the existing providers, emails and data
          user.providers = _.merge(['linkedin'],user.providers);
          user.emails = _.merge(emails,user.emails);
          user.linkedin = profile._json;
          user.save();
        } 

        return done(err, user);
      }
    });
    }
  ));
};
