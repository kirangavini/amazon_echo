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
        "What would you say if I said   <break time = \"1.0s\"/><say-as interpret-as='spell-out'>P<break time = \"1.0s\"/>5</say-as>?": [
            "5P"
        ]
    },   
  {
        "What would you say if I said   <break time = \"1.0s\"/><say-as interpret-as='spell-out'>8<break time = \"1.0s\"/>R</say-as>?": [
            "8R"
        ]
    },
 {
        "What would you say if I said  <break time = \"0.5s\"/><say-as interpret-as='spell-out'>6<break time = \"1.0s\"/>Q<break time = \"1.0s\"/>2</say-as>?": [
            "26Q"
        ]
    },
 {
        "What would you say if I said  <break time = \"0.5s\"/><say-as interpret-as='spell-out'>2<break time = \"1.0s\"/>L<break time = \"1.0s\"/>5</say-as>?": [
            "25L"
        ]
    },
 {
        "What would you say if I said  <break time = \"0.5s\"/><say-as interpret-as='spell-out'>H<break time = \"1.0s\"/>O<break time = \"1.0s\"/>8</say-as>?": [
            "8HO"
        ]
    },            

    {
        " Level 1: What would you say if I said   <break time = \"1.0s\"/><say-as interpret-as='spell-out'>W<break time = \"1.0s\"/>5</say-as>?": [
            "5W"
        ]
    },
    {
        "What would you say if I said  <break time = \"0.5s\"/><say-as interpret-as='spell-out'>J<break time = \"1.0s\"/>2</say-as>?": [
            "2J"
            
        ]
    },
    {
        "What would you say if I said   <break time = \"0.5s\"/><say-as interpret-as='spell-out'>8<break time = \"1.0s\"/>E</say-as>?": [
            "8E"
        ]
    },
    {
        "Level 2: What would you say if I said  <break time = \"0.5s\"/><say-as interpret-as='spell-out'>T<break time = \"1.0s\"/>8<break time = \"1.0s\"/>Q</say-as>?": [
            "8QT"
        ]
    },
    {
        "What would you say if I said    <break time = \"0.5s\"/><say-as interpret-as='spell-out'>R<break time = \"1.0s\"/>9<break time = \"1.0s\"/>5</say-as>?": [
            "59R"
        ]
    },
    {
        "What would you say if I said    <break time = \"0.5s\"/><say-as interpret-as='spell-out'>I<break time = \"1.0s\"/>2<break time = \"1.0s\"/>D</say-as>?": [
            "2DI"
        ]
    },
    {
        "Level 3: What would you say if I said  <break time = \"0.5s\"/><say-as interpret-as='spell-out'>I<break time = \"1.0s\"/>5<break time = \"1.0s\"/>2<break time = \"1.0s\"/>H</say-as>?": [
            "25HI"
        ]
    },
    {

        " What would you say if I said  <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>P<break time = \"1.0s\"/>R<break time = \"1.0s\"/>2<break time = \"1.0s\"/>V</say-as>?": [
            "2PRV"
        ]
    },
    {
        "What would you say if I said   <break time = \"0.5s\"/><say-as interpret-as='spell-out'>K<break time = \"1.0s\"/>I<break time = \"1.0s\"/>3<break time = \"1.0s\"/>2</say-as>?": [
            "23IK"
        ]
    },
    {
        "Level 4: What would you say if I said  <break time = \"0.5s\"/><say-as interpret-as='spell-out'>V<break time = \"1.0s\"/>2<break time = \"1.0s\"/>3<break time = \"1.0s\"/>E<break time = \"1.0s\"/>W</say-as>?": [
            "23EVW"
        ]
    },
    {
        "What would you say if I said    <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>E<break time = \"1.0s\"/>T<break time = \"1.0s\"/>9<break time = \"1.0s\"/>8<break time = \"1.0s\"/>2</say-as>?": [
            "289ET"
        ]
    },
    {
        " What would you say if I said  <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>V<break time = \"1.0s\"/>U<break time = \"1.0s\"/>2<break time = \"1.0s\"/>5<break time = \"1.0s\"/>T</say-as>?": [
            "25TUV"
        ]
    },
    {
        "Level 5: What would you say if I said  <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>R<break time = \"1.0s\"/>A<break time = \"1.0s\"/>T<break time = \"1.0s\"/>2<break time = \"1.0s\"/>5<break time = \"1.0s\"/>E</say-as>?": [
            "25AERT"
        ]
    },
    {
        "What would you say if I said  <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>H<break time = \"1.0s\"/>E<break time = \"1.0s\"/>L<break time = \"1.0s\"/>9<break time = \"1.0s\"/>8<break time = \"1.0s\"/>D</say-as>?": [
            "89DEHL"
        ]
    },
    {
        "What would you say if I said  <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>V<break time = \"1.0s\"/>I<break time = \"1.0s\"/>C<break time = \"1.0s\"/>9<break time = \"1.0s\"/>2<break time = \"1.0s\"/>W</say-as>?": [
            "29CIVW"
        ]
    },
    {
        "Level 6: What would you say if I said  <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>X<break time = \"1.0s\"/>O<break time = \"1.0s\"/>T<break time = \"1.0s\"/>V<break time = \"1.0s\"/>2<break time = \"1.0s\"/>5<break time = \"1.0s\"/>8</say-as>?": [
            "258OTVX"
        ]
    },
    {
        "What would you say if I said  <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>V<break time = \"1.0s\"/>E<break time = \"1.0s\"/>C<break time = \"1.0s\"/>2<break time = \"1.0s\"/>9<break time = \"1.0s\"/>G<break time = \"1.0s\"/>W</say-as>?": [
            "29CEGVW"
        ]
    },
    {
        "What would you say if I said  <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>U<break time = \"1.0s\"/>L<break time = \"1.0s\"/>M<break time = \"1.0s\"/>N<break time = \"1.0s\"/>9<break time = \"1.0s\"/>R<break time = \"1.0s\"/>T</say-as>?": [
            "9LMNRTU"
        ]
    },
    {
        "Level 7: What would you say if I said  <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>Y<break time = \"1.0s\"/>2<break time = \"1.0s\"/>I<break time = \"1.0s\"/>V<break time = \"1.0s\"/>T<break time = \"1.0s\"/>R<break time = \"1.0s\"/>N<break time = \"1.0s\"/>5</say-as>?": [
            "25INRTVY"
        ]
    },
    {
        "What would you say if I said  <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>8<break time = \"1.0s\"/>H<break time = \"1.0s\"/>I<break time = \"1.0s\"/>S<break time = \"1.0s\"/>G<break time = \"1.0s\"/>O<break time = \"1.0s\"/>A<break time = \"1.0s\"/>2</say-as>?": [
            "28AGHIOS"
        ]
    },
    {
        "What would you say if I said  <break time = \"0.5s\"/> <say-as interpret-as='spell-out'>G<break time = \"1.0s\"/>U<break time = \"1.0s\"/>N<break time = \"1.0s\"/>T<break time = \"1.0s\"/>2<break time = \"1.0s\"/>5<break time = \"1.0s\"/>9<break time = \"1.0s\"/>R</say-as>?": [
            "259GNRTU"
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
var GAME_LENGTH = 26;
var CARD_TITLE = "Letter number ORDERING TWO"; // Be sure to change this for your skill.

function getWelcomeResponse(callback) {
    var sessionAttributes = {},
        speechOutput = "Welcome to number-letter sequencing task. <break time = \"0.69s\"/> I am going to say a group of numbers and letters. After I say them, I want you to tell"
         +" me the numbers first, in order, starting with the lowest number.  <break time = \"0.69s\"/> Then tell me the letters in alphabetical order. For example, If i say "
         +" <say-as interpret-as='spell-out'>B<break time = \"1.0s\"/>7</say-as>, your answer should be <say-as interpret-as='spell-out'>7<break time = \"1.0s\"/>B</say-as>. The numbers"
         +" go first, then the letters. If i say <say-as interpret-as='spell-out'>9<break time = \"1.0s\"/>C<break time = \"1.0s\"/>3</say-as>, then your answer should be <say-as interpret-as='spell-out'>3<break time = \"1.0s\"/>9<break time = \"1.0s\"/>C</say-as>. The numbers in order first, then"
         +" the letters in alphabetical order. <break time = \"0.3s\"/>The questions increase in length and level as you progress."
            +" <break time = \"0.69s\"/>.Lets practice for five questions and then the game will start<break time = \"1.5s\"/> ",
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
        var currentScore1;
        //var xvalue;
        
                 if (answerSlotValid && intent.slots.Answer.value == correctAnswerText) {
                            currentScore++;
                            speechOutputAnalysis = "correct. ";
                  } else {
                            if (!userGaveUp) {
                                speechOutputAnalysis = "Remember, say the numbers first, in numerical order, and then the letters, in alphabetical order. ";
                            }
                            // speechOutputAnalysis += "The correct answer is " + correctAnswerText + ". ";
                        }
                 
                          

                  if (currentQuestionIndex === 7 && currentScore ===0 ){
                             currentScore1 = currentScore;
                             // speechOutput = userGaveUp ? "" : "That answer is ";
                            speechOutput += "This task is completed. See you later.";
                                cardoutput = "correct answer is:" + correctAnswerText+"."+"your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions";
                            callback(session.attributes,
                                buildSpeechletResponse(CARD_TITLE, speechOutput, "", cardoutput, true));
                   
                         
                   } if (currentQuestionIndex === 10 && currentScore === xvalue) {
                             // currentScore1 = currentScore;
                             // speechOutput = userGaveUp ? "" : "That answer is ";
                            speechOutput += " This task is completed. See you later.";
                            cardoutput = "correct answer is:" + correctAnswerText+"."+"your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions";
                            callback(session.attributes,
                                buildSpeechletResponse(CARD_TITLE, speechOutput, "", cardoutput, true));

                   } if (currentQuestionIndex === 13 && currentScore === yvalue ) {
                             // currentScore1 = currentScore;
                             // speechOutput = userGaveUp ? "" : "That answer is ";
                            speechOutput += " This task is completed. See you later.";
                                cardoutput = "correct answer is:" + correctAnswerText+"."+"your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions";
                            callback(session.attributes,
                                buildSpeechletResponse(CARD_TITLE, speechOutput, "", cardoutput, true));

                   } if (currentQuestionIndex === 16 && currentScore === xvalue) {
                             // currentScore1 = currentScore;
                             // speechOutput = userGaveUp ? "" : "That answer is ";
                            speechOutput += " This task is completed. See you later.";
                                cardoutput = "correct answer is:" + correctAnswerText+"."+"your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions";
                            callback(session.attributes,
                                buildSpeechletResponse(CARD_TITLE, speechOutput, "", cardoutput, true));

                   } if (currentQuestionIndex === 19 && currentScore === yvalue ) {
                             // currentScore1 = currentScore;
                             // speechOutput = userGaveUp ? "" : "That answer is ";
                            speechOutput += " This task is completed. See you later.";
                                cardoutput = "correct answer is:" + correctAnswerText+"."+"your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions";
                            callback(session.attributes,
                                buildSpeechletResponse(CARD_TITLE, speechOutput, "", cardoutput, true));

                   } if (currentQuestionIndex === 22 && currentScore === xvalue ) {
                             // currentScore1 = currentScore;
                             // speechOutput = userGaveUp ? "" : "That answer is ";
                            speechOutput += "This task is completed. See you later.";
                                cardoutput = "correct answer is:" + correctAnswerText+"."+"your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions";
                            callback(session.attributes,
                                buildSpeechletResponse(CARD_TITLE, speechOutput, "", cardoutput, true));

                   } if (currentQuestionIndex == GAME_LENGTH - 1) {
                        // speechOutput = userGaveUp ? "" : "That answer is ";
                        speechOutput += "This task is completed. See you later.";
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
                            // Generate a random index for the correct answer, from 0 to 3
                            correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));
                            var roundAnswers = populateRoundAnswers(gameQuestions, currentQuestionIndex, correctAnswerIndex),

                                questionIndexForSpeech = currentQuestionIndex + 1,
                                repromptText =  spokenQuestion ;
                            if (currentQuestionIndex === 0 || currentQuestionIndex === 1 || currentQuestionIndex === 2 || currentQuestionIndex === 3 || currentQuestionIndex === 4) {
                                                  currentScore = 0;
                                                  practiseoutput = speechOutputAnalysis;        
                                              }
                            if (currentQuestionIndex === 5 ) {
                                                  currentScore = 0;
                                                  practiseoutput = speechOutputAnalysis;
                                                  endpractiseoutput = "<break time = \"0.9s\"/>Practise session is over. Now, you will begin the original game. Remember, there will be seven levels with three questions each. In any level, if all the questions are wrong, game will end. Lets begin <break time = \"0.75s\"/>";        
                                              }                   



                                if (currentQuestionIndex === 8 || currentQuestionIndex === 14 ||currentQuestionIndex === 20) {
                                    xvalue = currentScore;
                                }

                                if (currentQuestionIndex === 11 ||currentQuestionIndex === 17 ||currentQuestionIndex === 23) {
                                    yvalue = currentScore;
                                }



                                
                            
                            for (var i = 0; i < ANSWER_COUNT; i++) {
                                repromptText +=  "";
                            }
                            // speechOutput += userGaveUp ? "" : "That answer is ";
                            speechOutput += practiseoutput + endpractiseoutput + "next question" + ". <break time = \"0.5s\"/>" + repromptText; 
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

    var speechOutput = "I will ask you to reverse a word which is combination of letters and numbers <break time = \"1.0s\"/>"
        + "For example, If the combination is <say-as interpret-as='spell-out'>A<break time = \"1.0s\"/>4</say-as>, you would say <say-as interpret-as='spell-out'>4<break time = \"1.0s\"/>A</say-as>, If the combination is <say-as interpret-as='spell-out'>C<break time = \"1.0s\"/>1<break time = \"1.0s\"/>E</say-as>, you would say <say-as interpret-as='spell-out'>1<break time = \"1.0s\"/>C<break time = \"1.0s\"/>E</say-as> . To start a new game at any time, say, <break time = \"1.0s\"/>start new game. "
        + "<break time = \"1.0s\"/>To repeat the last question, say, repeat. "
        + "<break time = \"1.0s\"/>Would you like to play letter and numbers sequencing pair?",
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