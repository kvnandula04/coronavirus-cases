/* *
 * We create a language strings object containing all of our strings.
 * The keys for each string will then be referenced in our code, e.g. handlerInput.t('WELCOME_MSG').
 * The localisation interceptor in index.js will automatically choose the strings
 * that match the request's locale.
 * */

module.exports = {
    en: {
        translation: {
            WELCOME_MSG: 'Welcome, you can say, "ask Coronavirus Cases for today\'s report" or "ask Coronavirus Cases for today\'s count". What would you like to try?',
            HELP_MSG: 'You can say ask Coronavirus Cases for today\'s report or open Coronavirus Cases. How can I help?',
            GOODBYE_MSG: 'Make sure you wash your hands and stay hygienic. Let\'s battle this together!',
            REFLECTOR_MSG: 'You just triggered {{intentName}}',
            FALLBACK_MSG: 'Sorry, I don\'t know about that. Please try again.',
            ERROR_MSG: 'Sorry, I had trouble doing what you asked. Please try again.'
        }
    }
}