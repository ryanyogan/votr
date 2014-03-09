var config = {};

config.couchdb = {};
config.twilio = {};

config.couchdb.url = 'https://votr.cloudant.com';
config.couchdb.port = 443;
config.couchdb.username = 'votr';
config.couchdb.password = 'ryan0313';

config.twilio.sid = 'ACe911a464acbc975fc9eaeaa17d425cef';
config.twilio.key = '37d8f2b835570ab11d61ceeb5dc0064c';

config.disableTwilioSigCheck = false;

module.exports = config;
