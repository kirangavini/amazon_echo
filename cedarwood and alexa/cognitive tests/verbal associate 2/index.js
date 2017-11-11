

'use strict';


var questions = [
    {
        " <break time = \"1.0s\"/>Which word goes with Truck?": [
            "arrow"
        ]
    },
    {
        "Which word goes with Insect?": [
            "acorn"
            
        ]
    },
    {
        "Which word goes with Reptile?": [
            "clown"
        ]
    },
    {
        "Which word goes with bank?": [
            "cartoon"
        ]
    },
    {
        "Which word goes with star?": [
            "ladder"
        ]
    },
    {
        "Which word goes with Raccoon?": [
            "paper"
        ]
    },
     {
        "Which word goes with Rose?": [
            "bag"
        ]
    },
    {
        "Recall pair Elephant?": [
            "glass"
        ]
    },
    {
        "<break time = \"1.0s\"/>. Thanks for your response. Now, lets move to second part of the game, try to recognise whether the given pair is a correct or Incorrect<break time = \"1.0s\"/> If your answer is yes, respond with correct as your answer. If your answer is no <break time = \"0.25s\"/>or you hear a new pair that is not in verbal pair one list, respond with Incorrect as your answer. In order to repeat, say repeat. If you need help, say help. <break time = \"1.0s\"/>Lets begin,<break time = \"0.5s\"/>recognise <break time = \"0.5s\"/> Rose<break time = \"0.3s\"/>-Bag? with a correct or Incorrect": [
            "correct"
        ]
    },
    {
        "<break time = \"0.2s\"/> <break time = \"0.5s\"/> Queen<break time = \"0.3s\"/>-Thumb?": [
            "Incorrect"
        ]
    },
    {
        "<break time = \"0.2s\"/> <break time = \"0.5s\"/> Elephant<break time = \"0.3s\"/>-Glass?": [
            "correct"
        ]
    },
    {
        "<break time = \"0.2s\"/><break time = \"0.5s\"/> Baseball<break time = \"0.3s\"/>-Forest?": [
            "Incorrect"
        ]
    },
    {
        "<break time = \"0.2s\"/> <break time = \"0.5s\"/> Star<break time = \"0.3s\"/>-Ladder?": [
            "correct"
        ]
    },
    {
        "<break time = \"0.2s\"/> <break time = \"0.5s\"/> Raccoon<break time = \"0.3s\"/>-paper?": [
            "correct"
        ]
    },
    {
        "<break time = \"0.2s\"/><break time = \"0.5s\"/> Dish<break time = \"0.3s\"/>-Corner?": [
            "Incorrect"
        ]
    },
    {
        "<break time = \"0.2s\"/> <break time = \"0.5s\"/> Perfume<break time = \"0.3s\"/>-Monkey?": [
            "Incorrect"
        ]
    },
    {
        "<break time = \"0.2s\"/> <break time = \"0.5s\"/> Truck<break time = \"0.3s\"/>-Arrow?": [
            "correct"
        ]
    },
    {
        "<break time = \"0.2s\"/> <break time = \"0.5s\"/> Dance<break time = \"0.3s\"/>-Rocket?": [
            "Incorrect"
        ]
    },
    {
        "<break time = \"0.2s\"/> <break time = \"0.5s\"/> Peanut<break time = \"0.3s\"/>-Pencil?": [
            "Incorrect"
        ]
    },

    {
        "<break time = \"0.2s\"/> <break time = \"0.5s\"/> Bank<break time = \"0.3s\"/>-Cartoon?": [
            "correct"
        ]
    },
    {
        "<break time = \"0.2s\"/><break time = \"0.5s\"/> Insect<break time = \"0.3s\"/>-Acorn?": [
            "correct"
        ]
    },
    {
        "<break time = \"0.2s\"/> <break time = \"0.5s\"/> Pocket<break time = \"0.3s\"/>-Ribbon?": [
            "Incorrect"
        ]
    },
    {
        "<break time = \"0.2s\"/> <break time = \"0.5s\"/> Candy<break time = \"0.3s\"/>-Typewriter?": [
            "Incorrect"
        ]
    },
    {
        "<break time = \"0.2s\"/> <break time = \"0.5s\"/> Reptile<break time = \"0.3s\"/>-Clown?": [
            "correct"
        ]
    },
    {
        "<break time = \"0.2s\"/> <break time = \"0.5s\"/> Winkle<break time = \"0.3s\"/>-Termite?": [
            "Incorrect"
        ]
    },
    {
        "<break time = \"0.2s\"/> <break time = \"0.5s\"/> Rose<break time = \"0.3s\"/>-Bag?": [
            "correct"
        ]
    },
    {
        "<break time = \"0.2s\"/> <break time = \"0.5s\"/> Chicken<break time = \"0.3s\"/>-Submarine?": [
            "Incorrect"
        ]
    },
     {
        "<break time = \"0.2s\"/><break time = \"0.5s\"/> Star<break time = \"0.3s\"/>-Ladder?": [
            "correct"
        ]
    },
     {
        "<break time = \"0.2s\"/> <break time = \"0.5s\"/> Rain<break time = \"0.3s\"/>-Circus?": [
            "Incorrect"
        ]
    },
     {
        "<break time = \"0.2s\"/><break time = \"0.5s\"/> Bread<break time = \"0.3s\"/>-Island?": [
            "Incorrect"
        ]
    },
     {
        "<break time = \"0.2s\"/> <break time = \"0.5s\"/> Elephant<break time = \"0.3s\"/>-glass?": [
            "correct"
        ]
    },
     {
        "<break time = \"0.2s\"/> <break time = \"0.5s\"/> Insect<break time = \"0.3s\"/>-Acorn?": [
            "correct"
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
var GAME_LENGTH = 32;
var CARD_TITLE = "Verbal associates two"; 

function getWelcomeResponse(callback) {
    var sessionAttributes = {},
        speechOutput = "This task involves recalling and recognising the word pairs from verbal pair associates one. There will be " + GAME_LENGTH.toString()
            + " questions divided into two groups. The first eight questions will ask you to recall the associated pair, similar to verbal pair associates one<break time = \"0.7s\"/>, and the next twenty four questions will ask you to recognise whether the pair is correct or Incorrect. For example, <break time = \"0.7s\"/>if I say the pair Rose-bag, you would say <break time = \"0.7s\"/>correct. If I say the pair <break time = \"0.7s\"/>Rose-bottle, you would say <break time = \"0.7s\"/>Incorrect <break time = \"0.7s\"/> If you would like to hear these instructions again, say repeat. If you need any help, say help<break time = \"0.5s\"/>. Let's begin. ",
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
            speechOutput +=  "Thank you for participating with Alexa!";
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



    var speechOutput = "For the first eight questions, respond similarly as verbalpair associates one.<break time = \"0.75s\"/>"
        + "For next twenty four questions, respond with correct or Incorrect depending upon the existance of pair<break time = \"0.75s\"/>"
        +"For example, if the pair is Reptile-<break time = \"0.3s\"/>clown <break time = \"0.3s\"/>and it exists in any one of the lists in verbal pair associates one, respond with correct <break time = \"0.5s\"/>or else respond with Incorrect<break time = \"0.5s\"/>" 
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
        buildSpeechletResponseWithoutCard("Thanks for playing varbal pair game!", "", true));
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