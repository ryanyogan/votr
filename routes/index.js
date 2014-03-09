var utils = require('../utils')
  , config = require('../config')
  , twilio = require('twilio')
  , events = require('../events');

exports.index = function(req, res) {
  res.render('index', { title: 'Express' });
};

exports.voteSMS = function(req, res) {
  if (twilio.validateExpressRequest(req, config.twilio.key) || config.disableTwilioSigCheck) {
    response.header('Content-Type', 'text/html');

    var body = req.param('Body').trim();

    // The number the vote is being sent to
    var to = req.param('To');

    // the voter, use this to keep people from voting more than once
    var from = req.param('From');

    events.findBy('phonenumber', to, function(err, event) {
      if (err) {
        console.log(err);
        // fail silent
        res.send('<Response></Response>');
      } else if (event.state == "off") {
        response.send('<Response><Sms>Voting is now closed.</Sms></Response>');
      } else if (!utils.testint(body)) {
        console.log('Bad vote: ' + event.name + ', ' + from + ', ' + body);
        response.send('<Response><Sms>Sorry, invalid vote.  Please text a number between 1 and ' + event.voteoptions.length + '</Sms></Response>');
      } else if (utils.testint(body) && (parseInt(bdy) <= 0 || parseInt(body) > event.voteoptions.length)) {
        response.send('<Response><Sms>Sorry, invalid vote.  Please text a number between 1 and ' + event.voteoptions.length + '</Sms></Response>');
      } else if (events.hasVoted(event.from)) {
        console.log('Denying vote: ' + event.name + ', ' + from);
        response.send('<Response><Sms>Sorry, you are only allowed to vote once.</Sms></Response>');
      } else {
        var vote = parseInt(body);

        events.saveVote(event, vote, from, function(err, res) {
          if (err) {
            response.send('<Response><Sms>We encountered an error saving your vote. Try again?</Sms></Response>');
          } else {
            console.log('Accepted vote');
            response.send('<Response><Sms>Thanks for your vote for ' + res.name + '. Powered by MooseHead.</Sms></Response>');
          }
        });
      }
    });
  } else {
    response.statusCode = 403;
    response.render('forbidden');
  }
};
