var APP_ID = "amzn1.ask.skill.aa5ca55e-da87-4841-a64a-6be07362c616";

var AlexaSkill = require('./AlexaSkill');
var MarkMyWordsGame = require('./controller/MarkMyWordsGame');

/**
 * MarkMyWordsSkill is a child of AlexaSkill.
 */
var MarkMyWordsSkill = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
MarkMyWordsSkill.prototype = Object.create(AlexaSkill.prototype);
MarkMyWordsSkill.prototype.constructor = MarkMyWordsSkill;

MarkMyWordsSkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    session.attributes.game = null;

    console.log("MarkMyWordsSkill onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to Mark My Words. Say 'Begin Game', or 'How do I play', or 'Word Scoring'.";
    var repromptOutput = "Say 'Begin Game', or 'How do I play?', or 'Overview'.";
    response.ask(speechOutput, repromptOutput);
};

MarkMyWordsSkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("MarkMyWordsSkill onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

MarkMyWordsSkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("MarkMyWords onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

MarkMyWordsSkill.prototype.intentHandlers = {
    "HowToPlay": function (intent, session, response) {
        this.tellHowToPlay(session, response);
    },

    "WordScoring": function (intent, session, response) {
        this.tellWordScoring(session, response);
    },

    "BeginGame": function (intent, session, response) {
        this.beginGame(session, response);
    },

    "SubmitWord": function (intent, session, response) {
        this.submitWord(intent, session, response);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        this.endGame(session, response);
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        this.endGame(session, response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        this.tellHowToPlay(session, response);
    }
};

MarkMyWordsSkill.prototype.beginGame = function (session, response) {
    session.attributes.game = new MarkMyWordsGame();
    var messages = session.attributes.game.getIntroduction();
    response.askSSML(messages[0], messages[1]);
};

MarkMyWordsSkill.prototype.submitWord = function (intent, session, response) {
    var word = intent.slots.Word.value.toUpperCase();
    session.attributes.game = new MarkMyWordsGame(session.attributes.game);
    var messages = session.attributes.game.addWord(word);
    response.askSSML(messages[0], messages[1]);
};

MarkMyWordsSkill.prototype.endGame = function (session, response) {
    response.tellSSML("Okay. Bye. Thanks for playing.");
};

MarkMyWordsSkill.prototype.tellHowToPlay = function (session, response) {
    var speechOutput = "In Mark My Words, a game will consist of 5 rounds. On each round, you will be given 3 letters of the alphabet. Your task is to call out a word using those letters. If successful, you'll be given a score. If not successful, you get a score of 0. You can't use the same word twice. At the end of the game, your total score will be accounced. To begin a new game, say 'Begin game'. To get help, say 'how to play'.";
    response.ask(speechOutput, getQuickHelp());
};


MarkMyWordsSkill.prototype.tellWordScoring = function (session, response) {
    var speechOutput = "Each letter of the alphabet is given a value which contributes to your word's score. Rare letters are given a value of 5 points all the way down to common letters which get 1 point. To begin a new game, say 'Begin game'. To get help, say 'how to play'.";
    response.ask(speechOutput, getQuickHelp());
};

function presentNewGameMessage(response) {
    response.ask("To start a game, say 'Begin Game'.",
                 "To start, say 'Begin Game'.");
}

function getQuickHelp() {
    return "To begin a new game, say 'Begin game'. For help, say 'how to play'.";
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the MarkMyWordsSkill skill.
    var markMyWords = new MarkMyWordsSkill();
    markMyWords.execute(event, context);
};

