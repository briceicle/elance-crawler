// Andelbot: Controller (Master Thread)

var Job = require('./job.js');
var Log = require('./log.js');

var settings = {
    model: "elance",
    type: 'query',
    privacy: true,
    host: 'https://elance.com',
    database: ''
}

var job = new Job(settings);

job.get('https://www.elance.com/r/jobs/p-2', function(err, body){
    job.parse(body, function(err, data){
        console.log(data);
    });
});


