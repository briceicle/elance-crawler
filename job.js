// Andelbot: Job Management

var Log = require('./log'),
    Model = require('./model.js'),
    fs = require('fs'),
    randomAgent= require('random-ua'),
    cheerio = require('cheerio'),
    request = require('request');

var Job = function(s) {

    /*
     Settings
     -- host: (String) root url or domain of target.
     -- throttle: (Integer) milliseconds for between requests, default = 5000.
     -- threaded: (Boolean) break process into workers on available threads.
     -- privacy: (Boolean) Load random user agent.
     -- distributed: (Boolean) Contains web API address of headless scraper.
     */

    // Check for required settings.
    if (typeof(s.type) == 'undefined'){
        Log.error('A type is required to initialize a job.');
    }
    if (typeof(s.model) == 'undefined'){
        Log.error('A model is required to initialize a job.');
    }

    this.settings = s || {};
    this.settings.type = s.type;
    if (typeof(this.settings.privacy) !== 'undefined'){ this.settings.privacy = s.privacy; }
        else { this.settings.privacy = false; }
    if (typeof(this.settings.host) !== 'undefined'){ this.settings.root = s.host; }
        else { this.settings.root = 'http://0.0.0.0/'; }
    if (typeof(this.settings.throttle) !== 'undefined'){ this.settings.throttle = s.throttle; }
    else { this.settings.throttle = 5000; }

    // Load the specified model
    Model(s.model);

    if(!Model(s.model)){
        Log.error('Unable to find \''+ s.model +'\' in models.json.');
    }

    this.settings.model = Model[s.model];

}

Job.prototype = {

    get: function(url, callback){
        var settings = this.settings, ops = {}, ua = randomAgent.generate();

            ops.url = url;
            if(settings.privacy){
                ops.headers = {
                    'User-Agent': ua
                }
            } else {
                ops.headers = {
                    'User-Agent': 'Andelbot: A light-weight web crawler based on Jquery. Respects all robots.txt. For additional policy information or to file a complaint visit: http://www.andela.co/policy/bot.html'
                }
            }
            console.log(ops.headers);

        request(ops, function(err, response, body){
            if(err){ callback(err); }
            callback(null, body);
        });
    },
    parse: function(data, callback){
        var settings = this.settings, model = settings.model;

        callback(null, "done");

        // Loads the model for the current job being scraped.

    },

    save: function(data, callback){
        callback(true);
    }

}



module.exports = Job;





