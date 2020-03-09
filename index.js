/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
// i18n library dependency, we use it below in a localisation interceptor
const i18n = require('i18next');
// i18n strings for all supported locales
const languageStrings = require('./languageStrings');
const rp = require("request-promise");
const cheerio = require("cheerio");

//=================================Web Scraping==============================================

let China = "";
let SK = "";
let Italy = "";
let UK = "";
let USA = "";
let India = "";
let WorldWide = "";
let Deaths = "";
let Recovered = "";

async function main() {
    const result = await rp.get("https://www.worldometers.info/coronavirus/");
    const $ = cheerio.load(result);

    $("#main_table_countries > tbody:nth-child(2) > tr:nth-child(1)").each((i,el) => {
        const item = $(el).text();
        China = item;
    }); 

    $("#main_table_countries > tbody:nth-child(2) > tr:nth-child(3)").each((i,el) => {
        const item = $(el).text();
        SK = item;
    });
    
    $("#main_table_countries > tbody:nth-child(2) > tr:nth-child(2)").each((i,el) => {
        const item = $(el).text();
        Italy = item;
    });
    
    $("#main_table_countries > tbody:nth-child(2) > tr:nth-child(13)").each((i,el) => {
        const item = $(el).text();
        UK = item;
    });
    
    $("#main_table_countries > tbody:nth-child(2) > tr:nth-child(9)").each((i,el) => {
        const item = $(el).text();
        USA = item;
    });
    
    $("#main_table_countries > tbody:nth-child(2) > tr:nth-child(34)").each((i,el) => {
        const item = $(el).text();
        India = item;
    });
    
    $("#main_table_countries > tbody:nth-child(3) > tr > td:nth-child(2)").each((i,el) => {
        const item = $(el).text();
        WorldWide = item;
    });

    $("#main_table_countries > tbody:nth-child(3) > tr > td:nth-child(4)").each((i,el) => {
        const item = $(el).text();
        Deaths = item;
    });

    $("#main_table_countries > tbody:nth-child(3) > tr > td:nth-child(6)").each((i,el) => {
        const item = $(el).text();
        Recovered = item;
    });
    

    China = China.trim().split(" ").filter(item => item)[1];
    SK = SK.trim().split(" ").filter(item => item)[2];
    Italy = Italy.trim().split(" ").filter(item => item)[1];
    UK = UK.trim().split(" ").filter(item => item)[1];
    USA = USA.trim().split(" ").filter(item => item)[1];
    India = India.trim().split(" ").filter(item => item)[1];
}
main();

//==========================================End of Web Scraping=================================

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('WELCOME_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//What I need to do is that if HelloWorldIntent is invoked, I will run the same functionality as the launch request.

//const SKILL_NAME = "Coronavirus Cases";

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent');
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('HELLO_MSG');
        const message = "In China there are, "+China+" cases. In Italy there are "+Italy+" cases. In South Korea there are "+SK+" cases. In USA there are "+USA+" cases. In the UK there are "+UK+" cases. In India there are "+India+" cases. Worldwide there are "+WorldWide+" cases, "+Deaths+" deaths, and "+Recovered+" recovered cases.";

        return handlerInput.responseBuilder
            .speak(message)
            .withSimpleCard("Coronavirus Cases", message)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('HELP_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('GOODBYE_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('FALLBACK_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = handlerInput.t('REFLECTOR_MSG', {intentName: intentName});

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = handlerInput.t('ERROR_MSG');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// This request interceptor will bind a translation function 't' to the handlerInput
const LocalisationRequestInterceptor = {
    process(handlerInput) {
        i18n.init({
            lng: Alexa.getLocale(handlerInput.requestEnvelope),
            resources: languageStrings
        }).then((t) => {
            handlerInput.t = (...args) => t(...args);
        });
    }
};
/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LocalisationRequestInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
