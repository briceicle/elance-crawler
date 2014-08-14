Andelbot
========
Light-weight crawler designed for distributed deployment (jobs).

## About
A demo Mongo instance has been set up at the address within auth. All dependencies are called from within "job.js".

## Getting Started
(1) Open auth.json and change the password field to the one mentioned in the email. The external database will not work without this.
(2) Install dependencies:
    npm install
(3) Define settings
    node examples/many.js
Included is a model and schema for the Elance jobs page. Each webpage with a new structure needs a schema and a model to operate.

#### Model
The model does the primary extraction and transfer of the data. Externally the Mongo model is set up to require uniqueness on link to the job record. In this way the crawl could encounter the same posting many times but will only index it as a new job correctly.

#### Schema
The schema contains pointers to primary sets of data and as JSON contains meta data for the model. Generally this could be hosted on a git repo or a separate server to allow you to make changes to the repository without causing a failure in active jobs.

## Examples
There are two examples, "one.js" and "many.js". One takes a single url, parses it, and the saves it upon request.

## Performance
I have not tested past 3 seconds throttle per page. Not blocked from Elance. Should you be blocked see features below.

## Development
(1) I would suggest setting up a logging server. The code is basically there just need to add the push to the server.
(2) There should be more validation on types regarding money and proposals. Money especially.
(3) This architecture can be completely deployed on a heroku instance, with a small express server you can have them report to master. In this way you could deploy 100s which don't have to work at once, they can simply rotate amongst each-other as one or the other gets blocked.
(4) I think Duration, Posted and Ends are critical. I would parse these to unix with Moment but not sure how you guys were doing it.
(5) The next model and schema should be for the job page specifically. This should use the link url as the reference to extract more information for each job (status, bids, type etc.)
(6) As for being blocked, I left the "privacy" option. This should also report back to a master and track DNS times. If DNS times go down, it should auto rotate to another headless server (all of this can be setup for free don't pay for an army of instances).
