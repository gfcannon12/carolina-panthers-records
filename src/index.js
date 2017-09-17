/*
An Alexa Skill with Carolina Panthers records
*/

'use strict';

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
  try {
      console.log("event.session.application.applicationId=" + event.session.application.applicationId);

      /**
       * Uncomment this if statement and populate with your skill's application ID to
       * prevent someone else from configuring a skill that sends requests to this function.
       */

  if (event.session.application.applicationId !== "amzn1.ask.skill.de659994-40e8-4eb5-8db0-45b4e5c146a0") {
      context.fail("Invalid Application ID");
   }

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

  // dispatch custom intents to handlers here
  if ("recordIntent" === intentName) {
      handleRecordRequest(intent, session, callback);
  } else if ("touchdownRecordIntent" === intentName) {
      handleTouchdownRecordRequest(intent, session, callback);
  } else if ("seasonIntent" === intentName) {
      handleSeasonRequest(intent, session, callback);
  } else if ("coachIntent" === intentName) {
      handleCoachRequest(intent, session, callback);
  } else if ("fanIntent" === intentName) {
      handleFanRequest(intent, session, callback);
  } else if ("AMAZON.StopIntent" === intentName) {
      handleEndRequest(intent, session, callback);
  } else if ("AMAZON.CancelIntent" === intentName) {
      handleEndRequest(intent, session, callback);
  } else if ("AMAZON.HelpIntent" === intentName) {
      handleGetHelpRequest(intent, session, callback);
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

var CARD_TITLE = "Carolina Panthers Records"; // Be sure to change this for your skill.

function getWelcomeResponse(callback) {
  var sessionAttributes = {},
      speechOutput = "Welcome to the Carolina Panthers Records skill. Please ask for a record.",
      shouldEndSession = false,
      repromptText = "You can try 'What is the single season record for rushing yards?' Say 'Help' for example questions.";

  callback(sessionAttributes,
      buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function handleRecordRequest(intent, session, callback) { //handling the users response. it could be the question answer or i dont know or cancel, etc.
  
  let speechOutput;
  let shouldEndSession = true;
  
  switch(intent.slots.time.value) {
  case 'season':
  case 'single-season':
  case 'single season':
      single_season();
      break;
  default:
      all_time();
  }
  
  function single_season(){
      switch (intent.slots.stat.value) {
      case 'pass':
      case 'passer':
      case 'passing':
          speechOutput = "In 1999, Steve Burrline had 4,436 passing yards.";
          break;
      case 'rush':
      case 'rusher':
      case 'rushing':
          speechOutput = "In 2008, DeAngelo Williams had 1,515 rushing yards.";
          break;
      case 'reception':
      case 'receiver':
      case 'receiving':
          speechOutput = "In 2005, Steve Smith had 1,563 receiving yards, which led the NFL.";
          break;
      case 'sack':
      case 'sacks':
          speechOutput = "In 1998, Kevin Greene had 15 sacks.";
          break;
      case 'interception':
      case 'interceptions':
          speechOutput = "In 2001, Doug Evans had 8 interceptions.";
          break;
      default:
          speechOutput = "Sorry, I did not understand your request.  I know the records for passing, rushing, receiving, sacks, and interceptions.  Please try another question or say 'Help'";
          shouldEndSession = false;
      }
  }
  
  function all_time() {
      switch (intent.slots.stat.value) {
      case 'pass':
      case 'passer':
      case 'passing':
          speechOutput = "Including the 2016 season, Cam Newton has 21,772 passing yards as a Panther.";
          break;
      case 'rush':
      case 'rusher':
      case 'rushing':
          speechOutput = "DeAngelo Williams had 6,846 rushing yards as a Panther.";
          break;
      case 'reception':
      case 'receiver':
      case 'receiving':
          speechOutput = "Steve Smith had 12,197 receiving yards as a Panther.";
          break;
      case 'sack':
      case 'sacks':
      case 'sex':
      case 'sax':
          speechOutput = "Julius Peppers, who is also a North Carolina Tar Heel, had 81 sacks as a Panther.";
          break;
      case 'interception':
      case 'interceptions':
          speechOutput = "Chris Gamble had 27 interceptions as a Panther.";
          break;
      default:
          speechOutput = "Sorry, I did not understand your request.  I know the records for passing, rushing, receiving, sacks, and interceptions.  Please try another question or say 'Help'";
          shouldEndSession = false;
      }
  }
  var sessionAttributes = {};
  var repromptText = "";
          callback(sessionAttributes,
              buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
  
}

function handleTouchdownRecordRequest(intent, session, callback) { //handling the users response. it could be the question answer or i dont know or cancel, etc.
  
  let speechOutput;
  let shouldEndSession = true;
  
  switch(intent.slots.time.value) {
  case 'season':
  case 'single-season':
  case 'single season':
      single_season();
      break;
  default:
      all_time();
  }
  
  function single_season(){
      switch (intent.slots.stat.value) {
      case 'pass':
      case 'passer':
      case 'passing':
          speechOutput = "In 1999, Steve Burrline had 36 passing touchdowns.";
          break;
      case 'rush':
      case 'rusher':
      case 'rushing':
          speechOutput = "In 2008, DeAngelo Williams had 18 rushing touchdowns, which led the NFL.";
          break;
      case 'reception':
      case 'receiver':
      case 'receiving':
          speechOutput = "In 2004, Moosin Muhammad had 16 receiving touchdowns, which led the NFL.";
          break;
      default:
          speechOutput = "Sorry, I did not understand your request.  I know the records for passing, rushing, receiving, sacks, and interceptions.  Please try another question or say 'Help'";
          shouldEndSession = false;

      }
  }
  
  function all_time() {
      switch (intent.slots.stat.value) {
      case 'pass':
      case 'passer':
      case 'passing':
          speechOutput = "Including the 2016 season, Cam Newton has 136 passing touchdowns as a Panther";
          break;
      case 'rush':
      case 'rusher':
      case 'rushing':
          speechOutput = "Including the 2016 season, Cam Newton has 48 rushing touchdowns as a Panther.";
          break;
      case 'reception':
      case 'receiver':
      case 'receiving':
          speechOutput = "Steve Smith had 67 receiving touchdowns as a Panther.";
          break;
      default:
          speechOutput = "Sorry, I did not understand your request.  I know the records for passing, rushing, receiving, sacks, and interceptions.  Please try another question or say 'Help'";
          shouldEndSession = false;

      }
  }

  var sessionAttributes = {};
  var repromptText = "";
          callback(sessionAttributes,
              buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
  
}

function handleSeasonRequest(intent, session, callback) { //handling the users response. it could be the question answer or i dont know or cancel, etc.
  var speechOutput = "In 2015, the Panthers went 15 and 1, Cam Newton was the NFL MVP, and the team appeared in Super Bowl 50.";
  var sessionAttributes = {};
  var repromptText = "";
          callback(sessionAttributes,
              buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, true));
  
}

function handleCoachRequest(intent, session, callback) { //handling the users response. it could be the question answer or i dont know or cancel, etc.
  var speechOutput = "John Fox coached the Panthers from 2002 to 2010, leading them to Super Bowl 38.  He has the most wins as head coach with 73.";
  var sessionAttributes = {};
  var repromptText = "";
          callback(sessionAttributes,
              buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, true));
  
}

function handleFanRequest(intent, session, callback) { //handling the users response. it could be the question answer or i dont know or cancel, etc.
  var speechOutput = "I gotta give love to Forrest Cannon and Will Happer, but it's Gray Cannon, of course.";
  var sessionAttributes = {};
  var repromptText = "";
          callback(sessionAttributes,
              buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, true));
  
}

function handleEndRequest(intent, session, callback) { //handling the users response. it could be the question answer or i dont know or cancel, etc.
  var speechOutput = "Goodbye";
  var sessionAttributes = {};
  var repromptText = "";
          callback(sessionAttributes,
              buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, true));
  
}

function handleGetHelpRequest(intent, session, callback) {
  
  // Ensure that session.attributes has been initialized
  if (!session.attributes) {
      session.attributes = {};
  }

  // Set a flag to track that we're in the Help state.
  session.attributes.userPromptedToContinue = true;

  // Do not edit the help dialogue. This has been created by the Alexa team to demonstrate best practices.

  var speechOutput = "Example questions include - 'Who is the Carolina Panthers all-time leader in passing touchdowns?', 'What is the single season record for rushing yards?', 'Who has the single season record for passing yards', 'Who has the most sacks in Panther's history?', 'What was the best season in Panthers' history?', and 'Which coach has the most wins in Panthers' history?'",
      repromptText = "Go ahead.  Ask a question or say 'Help' for example questions.";
      var shouldEndSession = false;
  callback(session.attributes,
      buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

// ------- Helper functions to build responses -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
  return {
      outputSpeech: {
          type: "PlainText",
          text: output
      },
      card: {
          type: "Simple",
          title: title,
          content: output
      },
      reprompt: {
          outputSpeech: {
              type: "PlainText",
              text: repromptText
          }
      },
      shouldEndSession: shouldEndSession
  };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
  return {
      outputSpeech: {
          type: "PlainText",
          text: output
      },
      reprompt: {
          outputSpeech: {
              type: "PlainText",
              text: repromptText
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