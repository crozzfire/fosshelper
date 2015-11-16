'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google','linkedin'];

var UserSchema = new Schema({
  name: String,
  emails: [{ type: String, lowercase: true }],
  role: {
    type: String,
    default: 'user'
  },
  providers: [{ type: String, lowercase: true }],
  salt: String,
  facebook: {},
  twitter: {},
  google: {},
  github: {},
  linkedin: {},
  suggestedProjects: {},
  experience: 0             
});

// Public profile information
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('emails')
  .validate(function(emails) {    
    return emails.length;
  }, 'Email cannot be blank');

// Validate email is not taken
UserSchema
  .path('emails')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({emails: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
  return value && value.length;
};


module.exports = mongoose.model('User', UserSchema);
