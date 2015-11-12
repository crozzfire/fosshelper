'use strict';

var express = require('express');
var controller = require('../../scrapers/scraper');

var router = express.Router();

router.post('/:source', controller.scraper);

module.exports = router;