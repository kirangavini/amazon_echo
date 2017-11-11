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
        " <break time = \"1.0s\"/> If I say  <break time = \"1.0s\"/><say-as interpret-as='spell-out'>2<break time = \"1.0s\"/>5</say-as> <break time = \"1.0s\"/> What would you say?": [
            "52"
        ]
    },
    {
        " <break time = \"1.0s\"/> If I say <break time = \"0.5s\"/><say-as interpret-as='spell-out'>5<break time = \"1.0s\"/>6</say-as> <break time = \"1.0s\"/>What would you say?": [
            "65"
            
        ]
    },
    {
        " <break time = \"1.0s\"/> If I say  <break time = \"0.5s\"/><say-as interpret-as='spell-out'>6<break time = \"1.0s\"/>2<break time = \"1.0s\"/>9</say-as> <break time = \"1.0s\"/> What would you say?": [
            "926"
        ]
    },
    {
        " <break time = \"1.0s\"/> If I say <break time = \"0.5s\"/><say-as interpret-as='spell-out'>4<break time = \"1.0s\"/>3<break time = \"1.0s\"/>5</say-as> <break time = \"1.0s\"/> What would you say?": [
            "534"
        ]
    },
    {
        " <break time = \"1.0s\"/> If I say   <break time = \"0.5s\"/><say-as interpret-as='spell-out'>3<break time = \"1.0s\"/>2<break time = \"1.0s\"/>5<break time = \"1.0s\"/>9</say-as> <break time = \"1.0s\"/> What would you say?": [
            "9523"
        ]
    },
    {
        " <break time = \"1.0s\"/> If I say   <break time = \"0.5s\"/><say-as interpret-as='spell-out'>4<break time = \"1.0s\"/>9<break time = \"1.0s\"/>6<break time = \"1.0s\"/>8</say-as><break time = \"1.0s\"/> What would you say?": [
            "8694"
        ]
    },
    {
        " <break time = \"1.0s\"/> If I say <break time = \"0.5s\"/><say-as interpret-as='spell-out'>1<break time = \"1.0s\"/>5<break time = \"1.0s\"/>2<break time = \"1.0s\"/>8<break time = \"1.0s\"/>6</say-as> <break time = \"1.0s\"/> What would you say?": [
            "68251"
        ]
    },
    {

        " <break time = \"1.0s\"/> If I say <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>6<break time = \"1.0s\"/>1<break time = \"1.0s\"/>8<break time = \"1.0s\"/>4<break time = \"1.0s\"/>2</say-as> <break time = \"1.0s\"/> What would you say?": [
            "24816"
        ]
    },
    {
        " <break time = \"1.0s\"/> If I say  <break time = \"0.5s\"/><say-as interpret-as='spell-out'>5<break time = \"1.0s\"/>3<break time = \"1.0s\"/>9<break time = \"1.0s\"/>4<break time = \"1.0s\"/>6<break time = \"1.0s\"/>8</say-as> <break time = \"1.0s\"/> What would you say?": [
            "864935"
        ]
    },
    {
        " <break time = \"1.0s\"/> If I say <break time = \"0.5s\"/><say-as interpret-as='spell-out'>7<break time = \"1.0s\"/>2<break time = \"1.0s\"/>4<break time = \"1.0s\"/>8<break time = \"1.0s\"/>5<break time = \"1.0s\"/>6</say-as> <break time = \"1.0s\"/> What would you say?": [
            "658427"
        ]
    },
    {
        " <break time = \"1.0s\"/> If I say   <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>8<break time = \"1.0s\"/>1<break time = \"1.0s\"/>2<break time = \"1.0s\"/>9<break time = \"1.0s\"/>3<break time = \"1.0s\"/>6<break time = \"1.0s\"/>5</say-as> <break time = \"1.0s\"/> What would you say?": [
            "5639218"
        ]
    },
    {
        " <break time = \"1.0s\"/> If I say <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>4<break time = \"1.0s\"/>7<break time = \"1.0s\"/>3<break time = \"1.0s\"/>9<break time = \"1.0s\"/>1<break time = \"1.0s\"/>2<break time = \"1.0s\"/>8</say-as> <break time = \"1.0s\"/> What would you say?": [
            "8219374"
        ]
    },
    {
        " <break time = \"1.0s\"/> If I say <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>9<break time = \"1.0s\"/>4<break time = \"1.0s\"/>3<break time = \"1.0s\"/>7<break time = \"1.0s\"/>6<break time = \"1.0s\"/>2<break time = \"1.0s\"/>5<break time = \"1.0s\"/>8</say-as> <break time = \"1.0s\"/> What would you say?": [
            "85267349"
        ]
    },
    {
        " <break time = \"1.0s\"/> If I say <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>7<break time = \"1.0s\"/>2<break time = \"1.0s\"/>8<break time = \"1.0s\"/>1<break time = \"1.0s\"/>9<break time = \"1.0s\"/>6<break time = \"1.0s\"/>5<break time = \"1.0s\"/>2</say-as> <break time = \"1.0s\"/> What would you say?": [
            "25691827"
        ]
    },      
];
var xvalue;
var yvalue;

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
var GAME_LENGTH = 16;
var CARD_TITLE = "numbers backward one"; // Be sure to change this for your skill.

function getWelcomeResponse(callback) {
    var sessionAttributes = {},
        speechOutput = " For this task, you dont need your note book. I am going to read out some numbers and I want you to repeat them backwards. There will be two practise questions and then the game will begin<break time = \"1.0s\"/>",
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
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, "your score is 0", shouldEndSession));
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
    // Pick GAME_LENGTH random questions from the list to ask the user, make sure there are no repeats.
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
        var responseoutput="";
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
                                                + " backward, you would say <say-as interpret-as='spell-out'>8<break time = \"1.0s\"/>4<break time = \"1.0s\"/>3</say-as>. Practise session is over, let's move in to the next task. Remember, you are to say them backward <break time = \"1.0s\"/>";
                            }
                            // speechOutputAnalysis += "The correct answer is " + correctAnswerText + ". ";
                        }
                 
                          

                  if (currentQuestionIndex === 3 && currentScore ===0 ){
                             currentScore1 = currentScore;
                             // speechOutput = userGaveUp ? "" : "That answer is ";
                            speechOutput += "This task is completed. Please move to the next page in your notebook.";
                                cardoutput = "correct answer is:" + correctAnswerText+"."+"your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions";
                            callback(session.attributes,
                                buildSpeechletResponse(CARD_TITLE, speechOutput, "", cardoutput, true));
                   
                         
                   } if (currentQuestionIndex === 5 && currentScore === xvalue) {
                             // currentScore1 = currentScore;
                             // speechOutput = userGaveUp ? "" : "That answer is ";
                            speechOutput += "This task is completed. Please move to the next page in your notebook.";
                            cardoutput = "correct answer is:" + correctAnswerText+"."+"your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions";
                            callback(session.attributes,
                                buildSpeechletResponse(CARD_TITLE, speechOutput, "", cardoutput, true));

                   } if (currentQuestionIndex === 7 && currentScore === yvalue ) {
                             // currentScore1 = currentScore;
                             // speechOutput = userGaveUp ? "" : "That answer is ";
                            speechOutput += "This task is completed. Please move to the next page in your notebook.";
                                cardoutput = "correct answer is:" + correctAnswerText+"."+"your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions";
                            callback(session.attributes,
                                buildSpeechletResponse(CARD_TITLE, speechOutput, "", cardoutput, true));

                   } if (currentQuestionIndex === 9 && currentScore === xvalue) {
                             // currentScore1 = currentScore;
                             // speechOutput = userGaveUp ? "" : "That answer is ";
                            speechOutput += "This task is completed. Please move to the next page in your notebook.";
                                cardoutput = "correct answer is:" + correctAnswerText+"."+"your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions";
                            callback(session.attributes,
                                buildSpeechletResponse(CARD_TITLE, speechOutput, "", cardoutput, true));

                   } if (currentQuestionIndex === 11 && currentScore === yvalue ) {
                             // currentScore1 = currentScore;
                             // speechOutput = userGaveUp ? "" : "That answer is ";
                            speechOutput += "This task is completed. Please move to the next page in your notebook.";
                                cardoutput = "correct answer is:" + correctAnswerText+"."+"your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions";
                            callback(session.attributes,
                                buildSpeechletResponse(CARD_TITLE, speechOutput, "", cardoutput, true));

                   } if (currentQuestionIndex === 13 && currentScore === xvalue ) {
                             // currentScore1 = currentScore;
                             // speechOutput = userGaveUp ? "" : "That answer is ";
                            speechOutput += "This task is completed. Please move to the next page in your notebook.";
                                cardoutput = "correct answer is:" + correctAnswerText+"."+"your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions";
                            callback(session.attributes,
                                buildSpeechletResponse(CARD_TITLE, speechOutput, "", cardoutput, true));

                   } if (currentQuestionIndex === 15 && currentScore === yvalue ) {
                             // currentScore1 = currentScore;
                             // speechOutput = userGaveUp ? "" : "That answer is ";
                            speechOutput += "This task is completed. Please move to the next page in your notebook.";
                                cardoutput = "correct answer is:" + correctAnswerText+"."+"your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions";
                            callback(session.attributes,
                                buildSpeechletResponse(CARD_TITLE, speechOutput, "", cardoutput, true));

                   } if (currentQuestionIndex == GAME_LENGTH - 1) {
                        // speechOutput = userGaveUp ? "" : "That answer is ";
                        speechOutput += "This task is completed. Please move to the next page in your notebook.";
                        cardoutput = "correct answer is:" + correctAnswerText+"."+"your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions";
                        callback(session.attributes,
                        buildSpeechletResponse(CARD_TITLE, speechOutput, "", cardoutput, true));
                    }

                   else {
                             // var spchoutput1 = " ";
                            currentQuestionIndex += 1;
                             var practiseoutput = "";
                             var endpractiseoutput = "";
                            var spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]]);
                            var prompt = "";
                            // Generate a random index for the correct answer, from 0 to 3
                            correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));
                            var roundAnswers = populateRoundAnswers(gameQuestions, currentQuestionIndex, correctAnswerIndex),

                                questionIndexForSpeech = currentQuestionIndex + 1,
                                repromptText =  spokenQuestion ;
                            
                                               

                                if(currentQuestionIndex === 1 || currentQuestionIndex === 2 ){
                                    currentScore = 0;
                                }

                                if(currentQuestionIndex === 1){
                                    responseoutput = speechOutputAnalysis;
                                }

                                if(currentQuestionIndex === 2){
                                    responseoutput = speechOutputAnalysis1;
                                    practiseoutput = "Now lets begin the game <break time = \"1s\"/> "
                                }


                                if (currentQuestionIndex === 4 || currentQuestionIndex === 8 ||currentQuestionIndex === 12) {
                                    xvalue = currentScore;
                                }

                                if (currentQuestionIndex === 6 ||currentQuestionIndex === 10 ||currentQuestionIndex === 14) {
                                    yvalue = currentScore;
                                }

                                if (currentQuestionIndex === 2 || currentQuestionIndex === 3 || currentQuestionIndex === 4 || currentQuestionIndex === 5 || currentQuestionIndex === 6 || currentQuestionIndex === 7 || currentQuestionIndex === 8 || currentQuestionIndex === 9 || currentQuestionIndex === 10 || currentQuestionIndex === 11 || currentQuestionIndex === 12 || currentQuestionIndex === 13 || currentQuestionIndex === 14 || currentQuestionIndex === 15 || currentQuestionIndex === 16){
                                    prompt = "next question";
                                }


                            for (var i = 0; i < ANSWER_COUNT; i++) {
                                repromptText +=  "";
                            }
                            // speechOutput += userGaveUp ? "" : "That answer is ";
                            speechOutput +=  responseoutput+practiseoutput + endpractiseoutput + prompt + ". <break time = \"0.5s\"/>" + repromptText; 
                        cardoutput = "correct answer is:" + correctAnswerText+"."+ "your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions";}

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
    // Repeat the previous speechOutput and repromptText from the session attributes if available
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
        repromptText = "Would you like to play letter and numbers reversing pair?",
        repromptText = "Would you like to play letter and numbers sequencing pair?";
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