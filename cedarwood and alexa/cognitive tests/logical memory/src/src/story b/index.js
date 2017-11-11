
var APP_ID = 'amzn1.ask.skill.5dda8b06-b955-4bbe-a248-1781117fb670'; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var FACTS = [
    "<break time = \"1.0s\"/>Anna Thompson of South Boston, employed as a cook in a school cafeteria, reported at the police station that she had been held up on State Street the night before <break time = \"0.5s\"/>and robbed of fifty-six dollars. She had four small children, the rent was due, and they had not eaten for two days. The police, touched by the woman's story, took up a collection for her",
    
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
    var speechText = "I am going to read you a story and when it is over, write down everything you can remember. In order to open the story. Say alexa, open story memory two and read story<break time = \"0.5s\"/>";
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
   
    "GetAnnastoryIntent": function (intent, session, response) {
        handleanna(response);     
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("In order to invoke story,ask Alexa ask story memory two to read story. The seesion will close once the story is read out and write everything you can remember in your notebook");
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
// function handleruth(response) {
//     // Get a random space fact from the space facts list
//     var randomFact = FACTS[0];
//       var note = "<break time = \"0.75s\"/>Now write down everything you can remember about this story. <break time = \"0.7s\"/>Start from the beginning and write down everything you can remember. When you are finished, <break time = \"0.5s\"/> please move to the next page in your notebook.";
//      var speechText = "Hello, the story A will be about two friends named Ruth and Paul ,<break time = \"0.5s\"/> Let's Begin<break time = \"2.0s\"/>"  + randomFact + note;
//      var repromptText = randomFact + note;
//     var cardTitle = "STORY A";
   
//     var speechOutput= {
//      speech: '<speak>' + speechText + '</speak>',
//      type: AlexaSkill.speechOutputType.SSML 
//     }
   
//     response.tellWithCard(speechOutput, cardTitle, "");
// }

function handleanna(response) {
    // Get a random space fact from the space facts list
    var randomFact = FACTS[0];
      var starting = "I am going to read you a story and when it is over, write down everything you can remember<break time = \"0.5s\"/> Here is the story<break time = \"1.0s\"/>  ";
      var note = "<break time = \"0.75s\"/>Now write down everything you can remember about this story.<break time = \"0.7s\"/>When you are finished, <break time = \"0.5s\"/> please move to the next page in your notebook.";
     var speechText = starting + "This STORY  will be about anna Thompson from South Boston ,<break time = \"0.5s\"/> Let's Begin<break time = \"2.0s\"/>"  + randomFact + note;
     var repromptText = randomFact + note;
    var cardTitle = "STORY";
   
    var speechOutput= {
     speech: '<speak>' + speechText + '</speak>',
     type: AlexaSkill.speechOutputType.SSML 
    }
   
    response.tellWithCard(speechOutput, cardTitle, "");
}

// function handlejoe(response) {
//     // Get a random space fact from the space facts list
//     var randomFact = FACTS[2];
//     var note = "<break time = \"0.75s\"/>Now write down everything you can remember about this story. <break time = \"0.7s\"/>Start from the beginning and write down everything you can remember. When you are finished, <break time = \"0.5s\"/>say alexa, ask story memory to recall story B"; 
//     cardTitle = "STORY B";
//      var speechText = "Hello, the story C will be on Joe Garcia from San Francisco,<break time = \"0.5s\"/> Let's Begin<break time = \"2.0s\"/>" + randomFact + note;
    
//     var speechOutput= {
//      speech: '<speak>' + speechText + '</speak>',
//      type: AlexaSkill.speechOutputType.SSML 
//     }
   
//     response.tellWithCard(speechOutput, cardTitle, "");
// }

// function recalljoe(response) {
//     // Get a random space fact from the space facts list
//     var randomFact = FACTS[3];
//    var note = "<break time = \"0.75s\"/>Now write down everything you can remember about this story. <break time = \"0.7s\"/>Start from the beginning and write down everything you can remember."; 
//     var speechText = "Hello, recalling story C about Joe from San Francisco,<break time = \"0.5s\"/> Let's Begin <break time = \"2.0s\"/> "+ randomFact + note;
//     var cardTitle = "Recall STORY B";

//     var speechOutput= {
//      speech: '<speak>' + speechText + '</speak>',
//      type: AlexaSkill.speechOutputType.SSML 
//     }
   
//     response.tellWithCard(speechOutput, cardTitle, "");
// }


// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};

