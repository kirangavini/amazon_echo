var alexa = require('alexa-app');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('backwards');

app.launch(function(req, res) {
    res.say("Lets play backwards!!");
});

app.intent('BackwardsIntent', {
    "slots": {
        "Backwards": "Backwards"
    },
    "utterances": [
        "{Could you|} say {the word|} {-|Backwards} {backwards|in reverse}"
    ]
}, function(req, res) {
    res.say('Your word is ' + req.slot('Backwards').split("").reverse().join(""));
});

module.exports = app;
