'use strict';

var express = require('express');
var controller = require('./recommendation.controller');

var router = express.Router();

router.post('/:experience/:skills', controller.recommend);

module.exports = router;