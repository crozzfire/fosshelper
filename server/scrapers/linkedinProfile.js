'use strict';

var casper = require('casper').create({
    verbose: false,
    logLevel: "debug"
});
var utils = require('utils');
var url = casper.cli.get(0);
var skills = [];

var headers = { 'Host': 'www.linkedin.com',
				'User-Agent':	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:41.0) Gecko/20100101 Firefox/41.0',
				'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'Accept-Language' : 'en-US,en;q=0.5'};

casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:41.0) Gecko/20100101 Firefox/41.0');
casper.start();

casper.open(url,headers).then(function() {

    var elems = this.getElementsInfo('li.skill a');

    for(var i in elems){
    	skills.push(elems[i]['attributes']['title']);
    }

    this.echo(JSON.stringify(skills));
});

casper.run();
