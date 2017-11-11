/**
 Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/apache2.0/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * This sample shows how to create a simple Flash Card skill. The skill
 * supports 1 player at a time, and does not support games across sessions.
 */

'use strict';

/**
 * When editing your questions pay attention to your punctuation. Make sure you use question marks or periods.
 * Make sure the first answer is the correct one. Set at least 4 answers, any extras will be shuffled in.
 */
var questions = [
    {
        "Item 1,<break time = \"1.0s\"/> trial 1 <break time = \"1.0s\"/>If I say  <break time = \"1.0s\"/><say-as interpret-as='spell-out'>2<break time = \"1.0s\"/>6</say-as> <break time = \"1.0s\"/>What would you say?": [
            "26"
        ]
    },
    {
        "trial 2 <break time = \"1.0s\"/>If I say <break time = \"0.5s\"/><say-as interpret-as='spell-out'>6<break time = \"1.0s\"/>3</say-as> <break time = \"1.0s\"/> What would you say?": [
            "63"
            
        ]
    },
    {
        "Item 2,<break time = \"1.0s\"/> trial 1 <break time = \"1.0s\"/>If I say  <break time = \"0.5s\"/><say-as interpret-as='spell-out'>5<break time = \"1.0s\"/>8<break time = \"1.0s\"/>2</say-as> <break time = \"1.0s\"/>What would you say?": [
            "582"
        ]
    },
    {
        "trial 2 <break time = \"1.0s\"/> If I say <break time = \"0.5s\"/><say-as interpret-as='spell-out'>6<break time = \"1.0s\"/>9<break time = \"1.0s\"/>4</say-as> <break time = \"1.0s\"/> What would you say?": [
            "694"
        ]
    },
    {
        "Item 3 <break time = \"1.0s\"/> trial 1 <break time = \"1.0s\"/> If I say   <break time = \"0.5s\"/><say-as interpret-as='spell-out'>6<break time = \"1.0s\"/>0<break time = \"1.0s\"/>2<break time = \"1.0s\"/>9</say-as> <break time = \"1.0s\"/> What would you say?": [
            "6029"
        ]
    },
    {
        "trial 2 <break time = \"1.0s\"/> If I say   <break time = \"0.5s\"/><say-as interpret-as='spell-out'>5<break time = \"1.0s\"/>2<break time = \"1.0s\"/>8<break time = \"1.0s\"/>6</say-as> <break time = \"1.0s\"/> What would you say?": [
            "5286"
        ]
    },
    {
        "Item 4 <break time = \"1.0s\"/> trial 1 <break time = \"1.0s\"/> If I say <break time = \"0.5s\"/><say-as interpret-as='spell-out'>6<break time = \"1.0s\"/>2<break time = \"1.0s\"/>8<break time = \"1.0s\"/>3<break time = \"1.0s\"/>4</say-as> <break time = \"1.0s\"/> What would you say?": [
            "62834"
        ]
    },
    {

        "trial 2 <break time = \"1.0s\"/> If I say <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>0<break time = \"1.0s\"/>5<break time = \"1.0s\"/>1<break time = \"1.0s\"/>3<break time = \"1.0s\"/>2</say-as> <break time = \"1.0s\"/> What would you say?": [
            "05132"
        ]
    },
    {
        "Item 5<break time = \"1.0s\"/> trial 1 <break time = \"1.0s\"/> If I say  <break time = \"0.5s\"/><say-as interpret-as='spell-out'>8<break time = \"1.0s\"/>2<break time = \"1.0s\"/>9<break time = \"1.0s\"/>4<break time = \"1.0s\"/>0<break time = \"1.0s\"/>3</say-as> <break time = \"1.0s\"/> What would you say?": [
            "829403"
        ]
    },
    {
        "trial 2 <break time = \"1.0s\"/> If I say <break time = \"0.5s\"/><say-as interpret-as='spell-out'>2<break time = \"1.0s\"/>9<break time = \"1.0s\"/>2<break time = \"1.0s\"/>4<break time = \"1.0s\"/>8<break time = \"1.0s\"/>6</say-as> <break time = \"1.0s\"/> What would you say?": [
            "292486"
        ]
    },
    {
        "Item 6 <break time = \"1.0s\"/> trial 1 <break time = \"1.0s\"/> If I say   <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>5<break time = \"1.0s\"/>9<break time = \"1.0s\"/>3<break time = \"1.0s\"/>6<break time = \"1.0s\"/>4<break time = \"1.0s\"/>2<break time = \"1.0s\"/>8</say-as><break time = \"1.0s\"/> What would you say?": [
            "5936428"
        ]
    },
    {
        " trial 2 <break time = \"1.0s\"/> If I say <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>2<break time = \"1.0s\"/>5<break time = \"1.0s\"/>4<break time = \"1.0s\"/>9<break time = \"1.0s\"/>3<break time = \"1.0s\"/>8<break time = \"1.0s\"/>6</say-as> <break time = \"1.0s\"/> What would you say?": [
            "2549386"
        ]
    },
    {
        "Item 7 <break time = \"1.0s\"/> trial 1 <break time = \"1.0s\"/> If I say <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>5<break time = \"1.0s\"/>8<break time = \"1.0s\"/>3<break time = \"1.0s\"/>9<break time = \"1.0s\"/>2<break time = \"1.0s\"/>6<break time = \"1.0s\"/>4<break time = \"1.0s\"/>8</say-as> <break time = \"1.0s\"/> What would you say?": [
            "58392648"
        ]
    },
    {
        "trial 2 <break time = \"1.0s\"/> If I say <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>8<break time = \"1.0s\"/>8<break time = \"1.0s\"/>2<break time = \"1.0s\"/>9<break time = \"1.0s\"/>5<break time = \"1.0s\"/>1<break time = \"1.0s\"/>7<break time = \"1.0s\"/>4</say-as> <break time = \"1.0s\"/> What would you say?": [
            "88295174"
        ]
    },
    {
        "Item 8 <break time = \"1.0s\"/> trial 1 <break time = \"1.0s\"/> If I say <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>2<break time = \"1.0s\"/>8<break time = \"1.0s\"/>5<break time = \"1.0s\"/>6<break time = \"1.0s\"/>7<break time = \"1.0s\"/>2<break time = \"1.0s\"/>5<break time = \"1.0s\"/>8<break time = \"1.0s\"/>4</say-as> <break time = \"1.0s\"/> What would you say?": [
            "285672584"
        ]
    },
    {
        "trial 2 <break time = \"1.0s\"/> If I say <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>9<break time = \"1.0s\"/>2<break time = \"1.0s\"/>3<break time = \"1.0s\"/>7<break time = \"1.0s\"/>4<break time = \"1.0s\"/>1<break time = \"1.0s\"/>5<break time = \"1.0s\"/>6<break time = \"1.0s\"/>8</say-as> <break time = \"1.0s\"/> What would you say?": [
            "923741568"
        ]
    },


      {
        "practise question one.<break time = \"1.0s\"/> For example, <break time = \"0.7s\"/> if I say <break time = \"0.5s\"/><say-as interpret-as='spell-out'>7<break time = \"1.0s\"/>1<break time = \"1.0s\"/>9</say-as>, <break time = \"1.0s\"/> what would you say?": [
            "917"
        ]
    },
    {
        "practise question two. <break time = \"1.0s\"/> if I say<break time = \"0.5s\"/><say-as interpret-as='spell-out'>3<break time = \"1.0s\"/>4<break time = \"1.0s\"/>8</say-as>, <break time = \"1.0s\"/> what would you say?": [
            "843"
        ]
    },

      {
        "Item 1,<break time = \"1.0s\"/> trial 1 <break time = \"1.0s\"/> If I say  <break time = \"1.0s\"/><say-as interpret-as='spell-out'>2<break time = \"1.0s\"/>0</say-as> <break time = \"1.0s\"/> What would you say?": [
            "02"
        ]
    },
    {
        "trial 2: If I say <break time = \"0.5s\"/><say-as interpret-as='spell-out'>5<break time = \"1.0s\"/>6</say-as> <break time = \"1.0s\"/>What would you say?": [
            "65"
            
        ]
    },
    {
        "Item 2,<break time = \"1.0s\"/> trial 1 <break time = \"1.0s\"/> If I say  <break time = \"0.5s\"/><say-as interpret-as='spell-out'>6<break time = \"1.0s\"/>2<break time = \"1.0s\"/>9</say-as> <break time = \"1.0s\"/> What would you say?": [
            "926"
        ]
    },
    {
        "trial 2 <break time = \"1.0s\"/> If I say <break time = \"0.5s\"/><say-as interpret-as='spell-out'>4<break time = \"1.0s\"/>3<break time = \"1.0s\"/>5</say-as> <break time = \"1.0s\"/> What would you say?": [
            "534"
        ]
    },
    {
        "Item 3,<break time = \"1.0s\"/> trial 1 <break time = \"1.0s\"/> If I say   <break time = \"0.5s\"/><say-as interpret-as='spell-out'>3<break time = \"1.0s\"/>2<break time = \"1.0s\"/>5<break time = \"1.0s\"/>9</say-as> <break time = \"1.0s\"/> What would you say?": [
            "9523"
        ]
    },
    {
        "trial 2 <break time = \"1.0s\"/> If I say   <break time = \"0.5s\"/><say-as interpret-as='spell-out'>4<break time = \"1.0s\"/>9<break time = \"1.0s\"/>6<break time = \"1.0s\"/>8</say-as><break time = \"1.0s\"/> What would you say?": [
            "8694"
        ]
    },
    {
        "Item 4,<break time = \"1.0s\"/> trial 1 <break time = \"1.0s\"/> If I say <break time = \"0.5s\"/><say-as interpret-as='spell-out'>1<break time = \"1.0s\"/>5<break time = \"1.0s\"/>2<break time = \"1.0s\"/>8<break time = \"1.0s\"/>6</say-as> <break time = \"1.0s\"/> What would you say?": [
            "68251"
        ]
    },
    {

        "trial 2 <break time = \"1.0s\"/> If I say <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>6<break time = \"1.0s\"/>1<break time = \"1.0s\"/>8<break time = \"1.0s\"/>4<break time = \"1.0s\"/>2</say-as> <break time = \"1.0s\"/> What would you say?": [
            "24816"
        ]
    },
    {
        "Item 5,<break time = \"1.0s\"/> trial 1 <break time = \"1.0s\"/> If I say  <break time = \"0.5s\"/><say-as interpret-as='spell-out'>5<break time = \"1.0s\"/>3<break time = \"1.0s\"/>9<break time = \"1.0s\"/>4<break time = \"1.0s\"/>6<break time = \"1.0s\"/>8</say-as> <break time = \"1.0s\"/> What would you say?": [
            "864935"
        ]
    },
    {
        "trial 2 <break time = \"1.0s\"/> If I say <break time = \"0.5s\"/><say-as interpret-as='spell-out'>7<break time = \"1.0s\"/>2<break time = \"1.0s\"/>4<break time = \"1.0s\"/>8<break time = \"1.0s\"/>5<break time = \"1.0s\"/>6</say-as> <break time = \"1.0s\"/> What would you say?": [
            "658427"
        ]
    },
    {
        "Item 6,<break time = \"1.0s\"/> trial 1 <break time = \"1.0s\"/> If I say   <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>8<break time = \"1.0s\"/>1<break time = \"1.0s\"/>2<break time = \"1.0s\"/>9<break time = \"1.0s\"/>3<break time = \"1.0s\"/>6<break time = \"1.0s\"/>5</say-as> <break time = \"1.0s\"/> What would you say?": [
            "5639218"
        ]
    },
    {
        " trial 2 <break time = \"1.0s\"/> If I say <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>4<break time = \"1.0s\"/>7<break time = \"1.0s\"/>3<break time = \"1.0s\"/>9<break time = \"1.0s\"/>1<break time = \"1.0s\"/>2<break time = \"1.0s\"/>8</say-as> <break time = \"1.0s\"/> What would you say?": [
            "8219374"
        ]
    },
    {
        "Item 7,<break time = \"1.0s\"/> trial 1 <break time = \"1.0s\"/> If I say <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>9<break time = \"1.0s\"/>4<break time = \"1.0s\"/>3<break time = \"1.0s\"/>7<break time = \"1.0s\"/>6<break time = \"1.0s\"/>2<break time = \"1.0s\"/>5<break time = \"1.0s\"/>8</say-as> <break time = \"1.0s\"/> What would you say?": [
            "85267349"
        ]
    },
    {
        "trial 2 <break time = \"1.0s\"/> Reverse    If I say <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>7<break time = \"1.0s\"/>2<break time = \"1.0s\"/>8<break time = \"1.0s\"/>1<break time = \"1.0s\"/>9<break time = \"1.0s\"/>6<break time = \"1.0s\"/>5<break time = \"1.0s\"/>0</say-as> <break time = \"1.0s\"/> What would you say?": [
            "05691827"
        ]
    },   
];
var xvalue;
var yvalue;
var increment = 0;
var zvalue;
var ivalue;
var pvalue;


// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

//     if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.05aecccb3-1461-48fb-a008-822ddrt6b516") {
//         context.fail("Invalid Application ID");
//      }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
        + ", sessionId=" + session.sessionId);

    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // handle yes/no intent after the user has been prompted
    if (session.attributes && session.attributes.userPromptedToContinue) {
        delete session.attributes.userPromptedToContinue;
        if ("AMAZON.NoIntent" === intentName) {
            handleFinishSessionRequest(intent, session, callback);
        } else if ("AMAZON.YesIntent" === intentName) {
            handleRepeatRequest(intent, session, callback);
        }
    }

    // dispatch custom intents to handlers here
    if ("AnswerIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AnswerOnlyIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("DontKnowIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.YesIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.NoIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.StartOverIntent" === intentName) {
        getWelcomeResponse(callback);
    } else if ("AMAZON.RepeatIntent" === intentName) {
        handleRepeatRequest(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        handleGetHelpRequest(intent, session, callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // Add any cleanup logic here
}

// ------- Skill specific business logic -------

var ANSWER_COUNT = 1;
var GAME_LENGTH = 32;
var CARD_TITLE = "Digit Span"; // Be sure to change this for your skill.

function getWelcomeResponse(callback) {
    var sessionAttributes = {},
        speechOutput = " In digit span, <break time = \"0.5s\"/>there will be two tasks, first task involves repeating the letters and <break time = \"0.5s\"/>second task involves reversing the letters. There will be different items in a task. If you fail to answer all the questions in an item, task will end. You will get more information as you move" 
              + " forward. <break time = \"0.5s\"/>Now, I am going to say some numbers. Listen carefully,and when I am through, I want you to say them right after me. Just say what I say. Let's begin<break time = \"2.0s\"/>",
        shouldEndSession = false,

        gameQuestions = populateGameQuestions(),
        correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT)), // Generate a random index for the correct answer, from 0 to 3
        roundAnswers = populateRoundAnswers(gameQuestions, 0, correctAnswerIndex),

        currentQuestionIndex = 0,
        spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]]),
        repromptText = spokenQuestion + " ",

        i, j;

    for (i = 0; i < ANSWER_COUNT; i++) {
        repromptText += "";
    }
    speechOutput += repromptText;
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentQuestionIndex": currentQuestionIndex,
        "correctAnswerIndex": correctAnswerIndex + 1,
        "questions": gameQuestions,
        "score": 0,
        "correctAnswerText":
            questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, "", shouldEndSession));
}

function populateGameQuestions() {
    var gameQuestions = [];
    var indexList = [];
    var index = questions.length;

    if (GAME_LENGTH > index){
        throw "Invalid Game Length.";
    }

    for (var i = 0; i < questions.length; i++){
        indexList.push(i);
    }
    index = -1;
    // Pick GAME_LENGTH random questions from the list to ask the user, make sure there are no If I says.
    for (var j = 0; j < GAME_LENGTH; j++){
        // var rand = Math.floor(Math.random() * index);
        index +=1;

        // var temp = indexList[index];
        // indexList[index] = indexList[rand];
        // indexList[rand] = temp;
        gameQuestions.push(indexList[index]);
    }

    return gameQuestions;
}

function populateRoundAnswers(gameQuestionIndexes, correctAnswerIndex, correctAnswerTargetLocation) {
    // Get the answers for a given question, and place the correct answer at the spot marked by the
    // correctAnswerTargetLocation variable. Note that you can have as many answers as you want but
    // only ANSWER_COUNT will be selected.
    var answers = [],
        answersCopy = questions[gameQuestionIndexes[correctAnswerIndex]][Object.keys(questions[gameQuestionIndexes[correctAnswerIndex]])[0]],
        temp, i;

    var index = answersCopy.length;

    if (index < ANSWER_COUNT){
        throw "Not enough answers for question.";
    }

    // Shuffle the answers, excluding the first element.
    for (var j = 1; j < answersCopy.length; j++){
        var rand = Math.floor(Math.random() * (index - 1)) + 1;
        index -= 1;

        var temp = answersCopy[index];
        answersCopy[index] = answersCopy[rand];
        answersCopy[rand] = temp;
    }

    // Swap the correct answer into the target location
    for (i = 0; i < ANSWER_COUNT; i++) {
        answers[i] = answersCopy[i];
    }
    temp = answers[0];
    answers[0] = answers[correctAnswerTargetLocation];
    answers[correctAnswerTargetLocation] = temp;
    return answers;
}

function handleAnswerRequest(intent, session, callback) {
    // Get the answers for a given question, and place the correct answer at the spot marked by the
    // correctAnswerTargetLocation variable. Note that you can have as many answers as you want but
    // only ANSWER_COUNT will be selected.
    var answers = [],
        answersCopy = questions[gameQuestionIndexes[correctAnswerIndex]][Object.keys(questions[gameQuestionIndexes[correctAnswerIndex]])[0]],
        temp, i;

    var index = answersCopy.length;

    if (index < ANSWER_COUNT){
        throw "Not enough answers for question.";
    }

    // Shuffle the answers, excluding the first element.
    for (var j = 1; j < answersCopy.length; j++){
        var rand = Math.floor(Math.random() * (index - 1)) + 1;
        index -= 1;

        var temp = answersCopy[index];
        answersCopy[index] = answersCopy[rand];
        answersCopy[rand] = temp;
    }

    // Swap the correct answer into the target location
    for (i = 0; i < ANSWER_COUNT; i++) {
        answers[i] = answersCopy[i];
    }
    temp = answers[0];
    answers[0] = answers[correctAnswerTargetLocation];
    answers[correctAnswerTargetLocation] = temp;
    return answers;
}
 


function handleAnswerRequest(intent, session, callback) {
    var speechOutput = "";
    var sessionAttributes = {};
    var gameInProgress = session.attributes && session.attributes.questions;
    var answerSlotValid = isAnswerSlotValid(intent);
    var userGaveUp = intent.name === "DontKnowIntent";
    // var xvalue;

    if (!gameInProgress) {
        // If the user responded with an answer but there is no game in progress, ask the user
        // if they want to start a new game. Set a flag to track that we've prompted the user.
        sessionAttributes.userPromptedToContinue = true;
        speechOutput = "There is no game in progress. Do you want to start a new game? ";
        callback(sessionAttributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, speechOutput,"", false));
    } else if (!answerSlotValid && !userGaveUp) {
        // If the user provided answer isn't a number > 0 and < ANSWER_COUNT,
        // return an error message to the user. Remember to guide the user into providing correct values.
        var reprompt = session.attributes.speechOutput;
        var speechOutput = "Your answer must be a known object " + reprompt;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, reprompt, "", false));
    } else {
        var gameQuestions = session.attributes.questions,
            correctAnswerIndex = parseInt(session.attributes.correctAnswerIndex),
            currentScore = parseInt(session.attributes.score),
            currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex),
            correctAnswerText = session.attributes.correctAnswerText;
        var cardoutput;
        var speechOutputAnalysis = "";
        var speechOutputAnalysis1 = "";
        var currentScore1;
        //var xvalue;
        
                 if (answerSlotValid && intent.slots.Answer.value == correctAnswerText) {
                            currentScore++;
                            speechOutputAnalysis = " That's right <break time = \"1.0s\"/>";
                            speechOutputAnalysis1 = " That's right <break time = \"1.0s\"/> practise session is over<break time = \"1.0s\"/>";
                  } else {
                            if (!userGaveUp) {
                                speechOutputAnalysis = "No, you would say <say-as interpret-as='spell-out'>9<break time = \"1.0s\"/>1<break time = \"1.0s\"/>7</say-as>. I said <say-as interpret-as='spell-out'>7<break time = \"1.0s\"/>1<break time = \"1.0s\"/>9</say-as>, so to say it"
                                                + " backward, you would say <say-as interpret-as='spell-out'>9<break time = \"1.0s\"/>1<break time = \"1.0s\"/>7</say-as>. Lets move to next sample question. Remember, you are to say them backward<break time = \"0.5s\"/>";
                                 speechOutputAnalysis1 = "No, you would say <say-as interpret-as='spell-out'>8<break time = \"1.0s\"/>4<break time = \"1.0s\"/>3</say-as>. I said <say-as interpret-as='spell-out'>3<break time = \"1.0s\"/>4<break time = \"1.0s\"/>8</say-as>, so to say it"
                                                + " backward, you would say <say-as interpret-as='spell-out'>8<break time = \"1.0s\"/>4<break time = \"1.0s\"/>3</say-as>. Practise session is over, let's move in to the next task. Remember, you are to say them backward<break time = \"0.5s\"/>practise session is over <break time = \"1.0s\"/>";

                            }
                            // speechOutputAnalysis += "The correct answer is " + correctAnswerText + ". ";
                        }
                 
                 
                    if (currentQuestionIndex === 19 && currentScore === zvalue ) {
                             // currentScore1 = currentScore;
                             // speechOutput = userGaveUp ? "" : "That answer is ";
                            speechOutput += "All of the questions in this Item or set are wrong. Both forward and reverse tasks are completed. Thank you for participating with Alexa!";
                                cardoutput = "correct answer is:" + correctAnswerText+"."+"your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions";
                            callback(session.attributes,
                                buildSpeechletResponse(CARD_TITLE, speechOutput, "", cardoutput, true));

                   }
                   if (currentQuestionIndex === 21 && currentScore === xvalue ) {
                             // currentScore1 = currentScore;
                             // speechOutput = userGaveUp ? "" : "That answer is ";
                            speechOutput += "All of the questions in this Item or set are wrong. Both forward and reverse tasks are completed. Thank you for participating with Alexa!";
                                cardoutput = "correct answer is:" + correctAnswerText+"."+"your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions";
                            callback(session.attributes,
                                buildSpeechletResponse(CARD_TITLE, speechOutput, "", cardoutput, true));

                   }
                   if (currentQuestionIndex === 23 && currentScore === yvalue ) {
                             // currentScore1 = currentScore;
                             // speechOutput = userGaveUp ? "" : "That answer is ";
                            speechOutput += "All of the questions in this Item or set are wrong. Both forward and reverse tasks are completed. Thank you for participating with Alexa!";
                                cardoutput = "correct answer is:" + correctAnswerText+"."+"your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions";
                            callback(session.attributes,
                                buildSpeechletResponse(CARD_TITLE, speechOutput, "", cardoutput, true));

                   }
                   if (currentQuestionIndex === 25 && currentScore === xvalue ) {
                             // currentScore1 = currentScore;
                             // speechOutput = userGaveUp ? "" : "That answer is ";
                            speechOutput += "All of the questions in this Item or set are wrong. Both forward and reverse tasks are completed. Thank you for participating with Alexa!";
                                cardoutput = "correct answer is:" + correctAnswerText+"."+"your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions";
                            callback(session.attributes,
                                buildSpeechletResponse(CARD_TITLE, speechOutput, "", cardoutput, true));

                   }
                   if (currentQuestionIndex === 27 && currentScore === yvalue ) {
                             // currentScore1 = currentScore;
                             // speechOutput = userGaveUp ? "" : "That answer is ";
                            speechOutput += "All of the questions in this Item or set are wrong. Both forward and reverse tasks are completed. Thank you for participating with Alexa!";
                                cardoutput = "correct answer is:" + correctAnswerText+"."+"your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions";
                            callback(session.attributes,
                                buildSpeechletResponse(CARD_TITLE, speechOutput, "", cardoutput, true));

                   }
                   if (currentQuestionIndex === 29 && currentScore === xvalue ) {
                             // currentScore1 = currentScore;
                             // speechOutput = userGaveUp ? "" : "That answer is ";
                            speechOutput += "All of the questions in this Item or set are wrong. Both forward and reverse tasks are completed. Thank you for participating with Alexa!";
                                cardoutput = "correct answer is:" + correctAnswerText+"."+"your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions";
                            callback(session.attributes,
                                buildSpeechletResponse(CARD_TITLE, speechOutput, "", cardoutput, true));

                   }
                   // if (currentQuestionIndex === 31 && currentScore === yvalue ) {
                   //           // currentScore1 = currentScore;
                   //           // speechOutput = userGaveUp ? "" : "That answer is ";
                   //          speechOutput += "All of the questions in this Item or set are wrong. Thank you for participating with Alexa!";
                   //              cardoutput = "correct answer is:" + correctAnswerText+"."+"your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions";
                   //          callback(session.attributes,
                   //              buildSpeechletResponse(CARD_TITLE, speechOutput, "", cardoutput, true));
                   //    }
                    if (currentQuestionIndex == GAME_LENGTH - 1) {
                        // speechOutput = userGaveUp ? "" : "That answer is ";
                        speechOutput += " You have successfully completed all the questions. Thank you for participating with Alexa!";
                        cardoutput = "correct answer is:" + correctAnswerText+"."+"your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions";
                        callback(session.attributes,
                        buildSpeechletResponse(CARD_TITLE, speechOutput, "", cardoutput, true));
                    }

                   else {
                              var spchoutput1 = " ";
                              var firstend = " ";
                              var responseoutput = " ";
                              if (currentQuestionIndex === 0){
                              	 ivalue = "sixteen questions in PART A";
                              }
                              if (currentQuestionIndex === 18){
                               	   ivalue = "fourteen questions for PART B";
                                   pvalue = currentScore; 
                               	   currentScore = (pvalue-zvalue);
                               	   zvalue = currentScore;
                               }
                              if (currentQuestionIndex === 1 && currentScore ===0 ){
                                  firstend += " All of the questions in this item are wrong. <break time = \"0.7s\"/>Forwarding digits task is completed, lets move to next task. <break time = \"0.7s\"/>Now I am going to say more numbers. But" 
                                                  +  "this time when I stop, <break time = \"0.7s\"/>I want you to say them backward. <break time = \"0.7s\"/>I will give you two sample questions.";
                                    increment = 14;
                                   zvalue = currentScore;
                               }
                                   
                                       if (currentQuestionIndex === 3 && currentScore === xvalue) {
                                       firstend += " All of the questions in this item are wrong. <break time = \"0.7s\"/>Forwarding digits task is completed, lets move to next task. <break time = \"0.7s\"/>Now I am going to say more numbers. But" 
                                                  +  "this time when I stop, <break time = \"0.7s\"/>I want you to say them backward. <break time = \"0.7s\"/>I will give you two sample questions.";
                                      increment = 12;
                                      zvalue = currentScore;
                                  }

                                       if (currentQuestionIndex === 5 && currentScore === yvalue) {
                                        firstend += " All of the questions in this item are wrong. <break time = \"0.7s\"/>Forwarding digits task is completed, lets move to next task. <break time = \"0.7s\"/>Now I am going to say more numbers. But" 
                                                  +  "this time when I stop, <break time = \"0.7s\"/>I want you to say them backward. <break time = \"0.7s\"/>I will give you two sample questions.";
                                      increment = 10;
                                      zvalue = currentScore;
                                  } 

                                      if (currentQuestionIndex === 7 && currentScore === xvalue) {
                                        firstend += " All of the questions in this item are wrong. <break time = \"0.7s\"/>Forwarding digits task is completed, lets move to next task. <break time = \"0.7s\"/>Now I am going to say more numbers. But" 
                                                  +  "this time when I stop, <break time = \"0.7s\"/>I want you to say them backward. <break time = \"0.7s\"/>I will give you two sample questions.";
                                      increment = 8;
                                      zvalue = currentScore;
                                  }
                                     if (currentQuestionIndex === 9 && currentScore === yvalue) {
                                        firstend += " All of the questions in this item are wrong. <break time = \"0.7s\"/>Forwarding digits task is completed, lets move to next task. <break time = \"0.7s\"/>Now I am going to say more numbers. But" 
                                                  +  "this time when I stop, <break time = \"0.7s\"/>I want you to say them backward. <break time = \"0.7s\"/>I will give you two sample questions.";
                                      increment = 6;
                                      zvalue = currentScore;
                                  }
                                     if (currentQuestionIndex === 11 && currentScore === xvalue) {
                                        firstend += " All of the questions in this item are wrong. <break time = \"0.7s\"/>Forwarding digits task is completed, lets move to next task. <break time = \"0.7s\"/>Now I am going to say more numbers. But" 
                                                  +  "this time when I stop, <break time = \"0.7s\"/>I want you to say them backward. <break time = \"0.7s\"/>I will give you two sample questions.";
                                      increment = 4;
                                      zvalue = currentScore;
                                  }
                                     if (currentQuestionIndex === 13 && currentScore === yvalue) {
                                        firstend += " All of the questions in this item are wrong. <break time = \"0.7s\"/>Forwarding digits task is completed, lets move to next task. <break time = \"0.7s\"/>Now I am going to say more numbers. But" 
                                                  +  "this time when I stop, <break time = \"0.7s\"/>I want you to say them backward. <break time = \"0.7s\"/>I will give you two sample questions.";
                                      increment = 2;
                                      zvalue = currentScore;
                                  }
                                   if (currentQuestionIndex === 15 && currentScore === xvalue) {
                                        firstend += " All of the questions in this item are wrong. <break time = \"0.7s\"/>Forwarding digits task is completed, lets move to next task. <break time = \"0.7s\"/>Now I am going to say more numbers. But" 
                                                  +  "this time when I stop, <break time = \"0.7s\"/>I want you to say them backward. <break time = \"0.7s\"/>I will give you two sample questions.";
                                      increment = 0;
                                      zvalue = currentScore;
                                  }
                                   if (currentQuestionIndex === 15) {
                                      firstend += " First task is succesfully completed, lets move to next task. Now I am going to say more numbers. But" 
                                                  + " this time when I stop, I want you to say them backward. I will give you two practise questions.";
                                      increment = 0;
                                      zvalue = currentScore;
                                  }


                  
                               if (currentQuestionIndex === 16){
                               	   increment = 0;
                               	   currentScore = zvalue;
                               	   responseoutput = speechOutputAnalysis;
                               	   ivalue = "seventeen questions, but score is not evaluated for practise quesions";
                               }

                               if (currentQuestionIndex === 17){
                               	   increment = 0;
                               	   currentScore = zvalue;
                               	   zvalue = currentScore;
                               	   responseoutput = speechOutputAnalysis1;
                               	   ivalue = "eighteen questions, but score is not evaluated for practise quesions";
                               }

                               

                             
                               





                                 
                            currentQuestionIndex = currentQuestionIndex +1+increment;


                             
                            var spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]]);
                            // Generate a random index for the correct answer, from 0 to 3
                            correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));
                            var roundAnswers = populateRoundAnswers(gameQuestions, currentQuestionIndex, correctAnswerIndex),
                                 
                                questionIndexForSpeech = currentQuestionIndex + 1,
                                repromptText =  spokenQuestion ;
                               


                                
                   
                                if (currentQuestionIndex === 2 || currentQuestionIndex === 6 ||currentQuestionIndex === 10|| currentQuestionIndex === 14 ){
                                    xvalue = currentScore;
                                }

                                if (currentQuestionIndex === 4 ||currentQuestionIndex === 8 ||currentQuestionIndex === 12){
                                    yvalue = currentScore;
                                }

                               

                                if (currentQuestionIndex === 20 || currentQuestionIndex === 24 || currentQuestionIndex === 28){
                                	xvalue = currentScore;
                                }

                                if (currentQuestionIndex === 22 || currentQuestionIndex === 26 || currentQuestionIndex === 30){
                                	yvalue = currentScore;
                                }
                                // if (currentQuestionIndex === 18) {
                                // 	ivalue = currentScore;
                                // }





                          
                            
                            for (var i = 0; i < ANSWER_COUNT; i++) {
                                repromptText +=  "";
                            }
                            // speechOutput += userGaveUp ? "" : "That answer is ";
                            speechOutput += firstend + spchoutput1+ responseoutput + "next question" + ". <break time = \"0.5s\"/>" + repromptText; 
                        cardoutput = "correct answer is:" + correctAnswerText+"."+ "your score is " + currentScore.toString() + "out of" + ivalue;}

                            sessionAttributes = {
                                "speechOutput": repromptText,
                                "repromptText": repromptText,
                                "currentQuestionIndex": currentQuestionIndex,
                                "correctAnswerIndex": correctAnswerIndex + 1,
                                "questions": gameQuestions,
                                "score": currentScore,
                                "cardoutput": cardoutput,
                                "correctAnswerText":
                                    questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
                            };
                            callback(sessionAttributes,
                                buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, cardoutput, false));

            }
        
        
    
}

function handleRepeatRequest(intent, session, callback) {
    // If I say the previous speechOutput and repromptText from the session attributes if available
    // else start a new game session
    if (!session.attributes || !session.attributes.speechOutput) {
        getWelcomeResponse(callback);
    } else {
        callback(session.attributes,
            buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
    }
}

function handleGetHelpRequest(intent, session, callback) {
    // Provide a help prompt for the user, explaining how the game is played. Then, continue the game
    // if there is one in progress, or provide the option to start another one.

    // Set a flag to track that we're in the Help state.
    session.attributes.userPromptedToContinue = true;

    // Do not edit the help dialogue. This has been created by the Alexa team to demonstrate best practices.

    var speechOutput = "I will ask you to forward or reverse combination of letters <break time = \"0.7s\"/>"
        + "For example, If the combination is <say-as interpret-as='spell-out'>1<break time = \"1.0s\"/>2</say-as>, and i ask you to forward, <break time = \"0.7s\"/>you would say <say-as interpret-as='spell-out'>1<break time = \"1.0s\"/>2</say-as>, If the combination is <say-as interpret-as='spell-out'>1<break time = \"1.0s\"/>2</say-as>, and i ask you to reverse, you would say <say-as interpret-as='spell-out'>2<break time = \"1.0s\"/>1</say-as>. <break time = \"0.7s\"/>To start a new game at any time, say, start new game. "
        + "Would you like to play letter and numbers reversing pair?",
        repromptText = "Would you like to play letter and numbers reversing pair?";
        var shouldEndSession = false;
    callback(session.attributes,
        buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Good bye!" if the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Thanks for your participation!", "", true));
}

function isAnswerSlotValid(intent) {
    var answerSlotFilled = intent.slots && intent.slots.Answer && intent.slots.Answer.value;
    var answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.Answer.value));
    return 1;
}

// ------- Helper functions to build responses -------


var regex = /(<([^>]+)>)/ig;
function buildSpeechletResponse(title, output, repromptText, cardoutput, shouldEndSession) {
    return {
        outputSpeech: {
            "ssml": '<speak>' + output + '</speak>',
            type: "SSML",
        },
        card: {
            type: "Simple",
            title: title,
            content: cardoutput.replace(regex,"")
        },
        reprompt: {
            outputSpeech: {
                "ssml": '<speak>' + output + '</speak>',
                type: "SSML",
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "SSML",
            "ssml": '<speak>' + output + '</speak>'
        },
        reprompt: {
            outputSpeech: {
                type: "SSML",
                "ssml": '<speak>' + repromptText + '</speak>'
            }
        },
        shouldEndSession: shouldEndSession
    };
}


function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}