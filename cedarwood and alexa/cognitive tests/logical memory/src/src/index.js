
var APP_ID = 'amzn1.ask.skill.f570698e-12c1-4af2-ad68-068167774515'; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var FACTS = [
    "Story A: <break time = \"1.5s\"/>Anna Thompson of South Boston, employed as a cook in a school cafeteria, reported at the police station that she had been held up on State Street the night before <break time = \"0.5s\"/>and robbed of fifty-six dollars. She had four small children, the rent was due, and they had not eaten for two days. The police, touched by the woman's story, took up a collection for her",
    "Story B: <break time = \"1.5s\"/> At six pm on Monday evening, Joe Garcia of San Francisco was watching television as he dressed to go out. A weather bulletin interrupted the program to warn that thunderstorms would move into the area within the next two to three hours and remain until morning. The announcer said the storm could bring hail and up to four inches of rain and cause the temperature to drop by fifteen degrees. Joe decided to stay home. He took off his coat and sat down to watch old movies.",
    "Story B: <break time = \"1.5s\"/> At six pm on Monday evening, Joe Garcia of San Francisco was watching television as he dressed to go out. A weather bulletin interrupted the program to warn that thunderstorms would move into the area within the next two to three hours and remain until morning. The announcer said the storm could bring hail and up to four inches of rain and cause the temperature to drop by fifteen degrees. Joe decided to stay home. He took off his coat and sat down to watch old movies."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechText = "Now I am going to read <break time = \"0.5s\"/>two short stories to you. Listen carefully and try to remember it just the way I say it,<break time = \"0.6s\"/>as close to the same words as you can remember. When I am through, I want you to write down"
    +" everything I read to you. You should write down all you can remember even if you are not sure. In order to open story A, say Alexa, ask logical memory test to read story A. In order to open story B, say Alexa, ask logical memory test to read story B." 
    +" In order to recall story B, say alexa, ask logical memory test to recall story B.<break time = \"0.75s\"/>Please say help in order to get more information on how to invoke a particular story. <break time = \"1.0s\"/>Now open story A, by saying Alexa, ask logical memory test to read story A";
    var speechOutput= {
     speech: '<speak>' + speechText + '</speak>',
     type: AlexaSkill.speechOutputType.SSML 
    };

    response.ask(speechOutput);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewstoryIntent": function (intent, session, response) {
        handleNewstoryRequest(response);
    },

    "GetNextstoryIntent": function (intent, session, response) {
        handlenextstoryRequest(response);     
    },

    "RecallstoryIntent": function (intent, session, response) {
        recallstoryRequest(response);     
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("In order to invoke PART A, say Alexa, ask logical memory test to read story A. In order to invoke PART B, say Alexa, ask logical memory test to read story B. In order to recall story B, say alexa, ask logical memory test to recall story B or repeat story B.");
    },
    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewstoryRequest(response) {
    // Get a random space fact from the space facts list
    var randomFact = FACTS[0];
      var note = "<break time = \"0.75s\"/>Now write down everything you can remember about this story. <break time = \"0.7s\"/>Start from the beginning and write down everything you can remember. When you are finished, <break time = \"0.5s\"/>say alexa, ask logical memory test to read story B";
     var speechText = "Hello, the first story will be about Anna Thompson from South Boston,<break time = \"0.5s\"/> Let's Begin<break time = \"2.0s\"/>"  + randomFact + note;
     var repromptText = randomFact + note;
    var cardTitle = "STORY A";
   
    var speechOutput= {
     speech: '<speak>' + speechText + '</speak>',
     type: AlexaSkill.speechOutputType.SSML 
    }
   
    response.tellWithCard(speechOutput, cardTitle, "");
}

function handlenextstoryRequest(response) {
    // Get a random space fact from the space facts list
    var randomFact = FACTS[1];
    var note = "<break time = \"0.75s\"/>Now write down everything you can remember about this story. <break time = \"0.7s\"/>Start from the beginning and write down everything you can remember. When you are finished, <break time = \"0.5s\"/>say alexa, ask logical memory test to recall story B"; 
    cardTitle = "STORY B";
     var speechText = "Hello, the second story will be on Joe Garcia from San Francisco,<break time = \"0.5s\"/> Let's Begin<break time = \"2.0s\"/>" + randomFact + note;
    
    var speechOutput= {
     speech: '<speak>' + speechText + '</speak>',
     type: AlexaSkill.speechOutputType.SSML 
    }
   
    response.tellWithCard(speechOutput, cardTitle, "");
}

function recallstoryRequest(response) {
    // Get a random space fact from the space facts list
    var randomFact = FACTS[2];
   var note = "<break time = \"0.75s\"/>Now write down everything you can remember about this story. <break time = \"0.7s\"/>Start from the beginning and write down everything you can remember."; 
    var speechText = "Hello, recalling the second story about Joe from San Francisco,<break time = \"0.5s\"/> Let's Begin <break time = \"2.0s\"/> "+ randomFact + note;
    var cardTitle = "Recall STORY B";

    var speechOutput= {
     speech: '<speak>' + speechText + '</speak>',
     type: AlexaSkill.speechOutputType.SSML 
    }
   
    response.tellWithCard(speechOutput, cardTitle, "");
}


// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};

