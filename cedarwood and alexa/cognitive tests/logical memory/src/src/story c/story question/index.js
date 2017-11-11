

'use strict';


var questions = [
    {
        "<break time = \"1.0s\"/>. Was the man's name Joe Garcia?": [
            "true"
        ]
    },
    {
        "<break time = \"0.5s\"/> Was it saturday evening?": [
            "false"
        ]
    },
    {
        "<break time = \"0.5s\"/> Was the time 6 o' clock?": [
            "true"
        ]
    },
    {
        "<break time = \"0.5s\"/> Was the story setting in seattle?": [
            "false"
        ]
    },
    {
        "<break time = \"0.2s\"/> Was Joe dressing to go out?": [
            "true"
        ]
    },
    {
        "<break time = \"0.5s\"/> Was Joe watching television?": [
            "true"
        ]
    },
    {
        "<break time = \"0.5s\"/> Was the program interrupted?": [
            "true"
        ]
    },
    {
        "<break time = \"0.5s\"/> Was the storm expected to move into the area on tuesday?": [
            "false"
        ]
    },
    {
        "<break time = \"0.5s\"/> Was the storm expected to stay in the area through the night?": [
            "true"
        ]
    },
    {
        "<break time = \"0.5s\"/> was the temperature predicted to drop 30 degrees?": [
            "false"
        ]
    },
    {
        "<break time = \"0.5s\"/> Did the announcer predicted 10 inches of rain?": [
            "false"
        ]
    },
    {
        "<break time = \"0.5s\"/> Did the announcer warn of possible flooding?": [
            "false"
        ]
    },
    {
        "<break time = \"0.5s\"/> Did the announcer warn that it could hail?": [
            "true"
        ]
    },
    {
        "<break time = \"0.5s\"/> Did Joe decide to stay home?": [
            "true"
        ]
    },
    {
        "<break time = \"0.5s\"/> Did Joe sit down to watch a sports program?": [
            "false"
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
var GAME_LENGTH = 15;
var CARD_TITLE = "story questions three"; 
var cardspeech = "“This skill is used to recognize different sentences from story memory three skill, which provides different stories and this skill asks question based on those stories";

function getWelcomeResponse(callback) {
    var sessionAttributes = {},
        speechOutput = "Do you remember the story I told you before about a guy from san Francisco? <break time = \"0.5s\"/>Now, I am going to ask you few questions. <break time = \"0.5s\"/>You can either answer them as true or false. <break time = \"0.5s\"/>Remember, only to use true or false as your answer. Let's begin<break time = \"0.5s\"/>",
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
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, "",shouldEndSession));
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
    var cardoutput;


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
         var cardoutput;


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
            speechOutput +=  "This completes the testing for the day, <break time = \"1.0s\"/>see you tommorow";
            cardoutput = "correct answer is:" + correctAnswerText+"."+"your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions"; 
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
            cardoutput = "correct answer is:" + correctAnswerText+"."+"your score is " + currentScore.toString() + "out of" + GAME_LENGTH.toString() + "questions"; 
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



    var speechOutput = "Recognise sentences from story and mark them as true or false based on what you heard in the story" 
        +"To start a new game at any time, say,<break time = \"0.4s\"/> start new game.<break time = \"0.4s\"/> "
        + "To repeat the question, say, repeat<break time = \"0.4s\"/>. "
        + "Would you like to keep playing?",
        repromptText = "To give an answer, respond with the correct pair. "
        + "Would you like to keep playing?";
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