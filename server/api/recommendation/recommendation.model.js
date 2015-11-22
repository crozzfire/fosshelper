'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecommendationSchema = new Schema({
  name: String,
  url: String,
  watchers: String,
  forks: String,
  issues: String,
  description: String,
  language: String
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);