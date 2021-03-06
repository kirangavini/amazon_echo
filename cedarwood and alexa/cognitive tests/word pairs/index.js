

'use strict';

var http = require('http');
var questions = [
    {
        " <break time = \"0.5s\"/>The first word pair is <break time = \"0.5s\"/>Horse<break time = \"1.0s\"/>Tiger. After the tone, write down how  they are both alike in your notebook. <break time = \"1.0s\"/>your timer starts now <audio src='https://s3.amazonaws.com/beepsound/beep2.mp3'/> <break time = \"3.5s\"/><break time = \"10.s\"/><break time = \"10.s\"/><break time = \"10.s\"/>, thirty seconds down,keep trying<break time = \"10.s\"/><break time = \"10.s\"/><break time = \"10.s\"/>, sixty seconds down, keep trying<break time = \"10.s\"/><break time = \"10.s\"/><break time = \"1.0s\"/><audio src='https://s3.amazonaws.com/beepsound/countdown1.mp3'/> Stop. Now, <break time = \"0.5s\"/>say continue to hear the next two words?": [
           "continue"
        ]
    },
    {
        " <break time = \"0.5s\"/>next word pair is <break time = \"0.5s\"/>Anger<break time = \"1.0s\"/>Joy. After the tone, write down how  they are both alike in your notebook. <break time = \"1.0s\"/>your timer starts now <audio src='https://s3.amazonaws.com/beepsound/beep2.mp3'/> <break time = \"3.5s\"/><break time = \"10.s\"/><break time = \"10.s\"/><break time = \"10.s\"/>, thirty seconds down,keep trying<break time = \"10.s\"/><break time = \"10.s\"/><break time = \"10.s\"/>, sixty seconds down, keep trying<break time = \"10.s\"/><break time = \"10.s\"/><break time = \"1.0s\"/><audio src='https://s3.amazonaws.com/beepsound/countdown1.mp3'/> Stop. Now, <break time = \"0.5s\"/>say continue to hear the next two words?": [
           "continue"
        ]
    },
    {
        " <break time = \"0.5s\"/>next word pair is <break time = \"0.5s\"/>Poem<break time = \"1.0s\"/>Statue. After the tone, write down how they are both alike in your notebook. <break time = \"1.0s\"/>your timer starts now <audio src='https://s3.amazonaws.com/beepsound/beep2.mp3'/> <break time = \"3.5s\"/><break time = \"10.s\"/><break time = \"10.s\"/><break time = \"10.s\"/>, thirty seconds down,keep trying<break time = \"10.s\"/><break time = \"10.s\"/><break time = \"10.s\"/>, sixty seconds down, keep trying<break time = \"10.s\"/><break time = \"10.s\"/><break time = \"1.0s\"/><audio src='https://s3.amazonaws.com/beepsound/countdown1.mp3'/> Stop. Now, <break time = \"0.5s\"/>say continue to end task and go to the next page in your notebook?": [
           "continue"
        ]
    },
   
];


exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);


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


function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);

    
}

function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
        + ", sessionId=" + session.sessionId);

    getWelcomeResponse(callback);
}


function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    
    if (session.attributes && session.attributes.userPromptedToContinue) {
        delete session.attributes.userPromptedToContinue;
        if ("AMAZON.NoIntent" === intentName) {
            handleFinishSessionRequest(intent, session, callback);
        } else if ("AMAZON.YesIntent" === intentName) {
            handleRepeatRequest(intent, session, callback);
        }
    }

 
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


function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);

}



var ANSWER_COUNT = 1;
var GAME_LENGTH = 3;
var CARD_TITLE = "Word pair one"; 
var cardoutput = "Please write down similarities in your notebook";

function getWelcomeResponse(callback) {
    var sessionAttributes = {},
        speechOutput = " For this next task, you will be given two words and be asked to describe in your notebook how they are alike. You will be given ninety seconds to respond to each pair. Please wait for the timer to begin",
        shouldEndSession = false,

       

        gameQuestions = populateGameQuestions(),
        correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT)), 
        roundAnswers = populateRoundAnswers(gameQuestions, 0, correctAnswerIndex),

        currentQuestionIndex = 0,
        spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]]),
        repromptText = spokenQuestion,

        i, j;


    for (i = 0; i < ANSWER_COUNT; i++) {
        repromptText += ""
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
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, cardoutput,shouldEndSession));
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
      index=-1;
   
    for (var j = 0; j < GAME_LENGTH; j++){
       
        index +=1;

        
        gameQuestions.push(indexList[index]);
    }

    return gameQuestions;
}

function populateRoundAnswers(gameQuestionIndexes, correctAnswerIndex, correctAnswerTargetLocation) {
   
    var answers = [],
        answersCopy = questions[gameQuestionIndexes[correctAnswerIndex]][Object.keys(questions[gameQuestionIndexes[correctAnswerIndex]])[0]],
        temp, i;

    var index = answersCopy.length;

    if (index < ANSWER_COUNT){
        throw "Not enough answers for question.";
    }

   
    for (var j = 1; j < answersCopy.length; j++){
        var rand = Math.floor(Math.random() * (index - 1)) + 1;
        index -= 1;

        var temp = answersCopy[index];
        answersCopy[index] = answersCopy[rand];
        answersCopy[rand] = temp;
    }

 
    for (i = 0; i < ANSWER_COUNT; i++) {
        answers[i] = answersCopy[i];
    }
    temp = answers[0];
    answers[0] = answers[correctAnswerTargetLocation];
    answers[correctAnswerTargetLocation] = temp;
    return answers;
}

function handleAnswerRequest(intent, session, callback) {
   
    var answers = [],
        answersCopy = questions[gameQuestionIndexes[correctAnswerIndex]][Object.keys(questions[gameQuestionIndexes[correctAnswerIndex]])[0]],
        temp, i;

    var index = answersCopy.length;

    if (index < ANSWER_COUNT){
        throw "Not enough answers for question.";
    }


    for (var j = 1; j < answersCopy.length; j++){
        var rand = Math.floor(Math.random() * (index - 1)) + 1;
        index -= 1;

        var temp = answersCopy[index];
        answersCopy[index] = answersCopy[rand];
        answersCopy[rand] = temp;
    }

  
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
    var cardoutput = "Write down all the similarities between word pairs in your notebook";


    if (!gameInProgress) {
      
        sessionAttributes.userPromptedToContinue = true;
        speechOutput = "There is no game in progress. Do you want to start a new game? ";
        callback(sessionAttributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, speechOutput, "", false));
    } else if (!answerSlotValid && !userGaveUp) {
        
        var reprompt = session.attributes.speechOutput;
        var speechOutput = "Your answer must be a known pair " + reprompt;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, reprompt, "", false));
    } else {
        var gameQuestions = session.attributes.questions,
            correctAnswerIndex = parseInt(session.attributes.correctAnswerIndex),
            currentScore = parseInt(session.attributes.score),
            currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex),
            correctAnswerText = session.attributes.correctAnswerText;

        var speechOutputAnalysis = "";
         var currentScore1= currentScore;
        var currentScore2 = 0;
        var currentScore3 = 0;
        
        if (answerSlotValid && intent.slots.Answer.value == correctAnswerText) {
            currentScore++;
            speechOutputAnalysis = "correct. ";
        } else {
            if (!userGaveUp) {
                speechOutputAnalysis = "wrong. "
            }
            speechOutputAnalysis += "The correct answer is " + correctAnswerText + ". ";
        }
        
        if (currentQuestionIndex == GAME_LENGTH - 1) {
            speechOutput +=  "Thank you for participating with Alexa!";
            cardoutput = "good bye"; 
            callback(session.attributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, "", cardoutput, true));
        } else {
            currentQuestionIndex += 1;
            var spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]]);
            
            correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));
            var roundAnswers = populateRoundAnswers(gameQuestions, currentQuestionIndex, correctAnswerIndex),

                questionIndexForSpeech = currentQuestionIndex + 1,
                repromptText =  spokenQuestion ;
            for (var i = 0; i < ANSWER_COUNT; i++) {
                repromptText +=  ""
            }
             var speechOutput1 = " ";
            
            
            speechOutput += "next question" + ". <break time = \"0.5s\"/>" + repromptText; 
            sessionAttributes = {
                "speechOutput": repromptText,
                "repromptText": repromptText,
                "currentQuestionIndex": currentQuestionIndex,
                "correctAnswerIndex": correctAnswerIndex + 1,
                "questions": gameQuestions,
                "cardoutput": cardoutput,
                "score": currentScore,
                "correctAnswerText":
                    questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
            };
            callback(sessionAttributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, cardoutput, false));
        }
    }
}

function handleRepeatRequest(intent, session, callback) {
  
    if (!session.attributes || !session.attributes.speechOutput) {
        getWelcomeResponse(callback);
    } else {
        callback(session.attributes,
            buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
    }
}

function handleGetHelpRequest(intent, session, callback) {
   
    session.attributes.userPromptedToContinue = true;



    var speechOutput = "When i ask you to list all the similarities between words for 90 seconds, write down all the similarities you could think of in your notebook. For example, If I say Mango and apple, you could write both of them belong to fruits <break time = \"0.4s\"/>" 
        + "To repeat the question, say, repeat<break time = \"0.4s\"/>. "
        + "Would you like to keep playing?",
        repromptText = "write down answers in your notebook. "
        + "Would you like to keep playing?";
        var shouldEndSession = false;
    callback(session.attributes,
        buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Good bye!" if the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Thanks for playing Word pairs one task!", "", true));
}

function isAnswerSlotValid(intent) {
    var answerSlotFilled = intent.slots && intent.slots.Answer && intent.slots.Answer.value;
    var answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.Answer.value));
    return 1;
}

var regex = /(<([^>]+)>)/ig;
// cardContent = someTextWithSSMLTags.replace(regex, "");


function buildSpeechletResponse(title, output, repromptText, cardoutput, shouldEndSession) {
    return {
        outputSpeech: {
            "ssml": '<speak>' + output + '</speak>',
            type: "SSML"
        },
        card: {
            type: "Simple",
            title: title,
            content: cardoutput.replace(regex,"")
        },
        reprompt: {
            outputSpeech: {
                "ssml": '<speak>' + output + '</speak>',
                type: "SSML"
            }
        },
        shouldEndSession: shouldEndSession
    };
}


function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            "ssml": '<speak>' + output + '</speak>',
            type: "SSML"
            
        },
        reprompt: {
            outputSpeech: {
                "ssml": '<speak>' + output + '</speak>',
                type: "SSML"
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


// For example: [code] var regex = /(<([^>]+)>)/ig; cardContent = someTextWithSSMLTags.replace(regex, ""); [/code]