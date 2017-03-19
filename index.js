var express = require("express");
var alexa = require("alexa-app");

var PORT = process.env.PORT || 3000;
var app = express();

var listenPath = "/alexa/hellokt/";
if(process.env.NODE_ENV != "production") "/development" + listenPath;

var alexaApp = new alexa.app(listenPath);

alexaApp.express({
  expressApp: app,

  // verifies requests come from amazon alexa. Must be enabled for production.
  // You can disable this if you're running a dev environment and want to POST
  // things to test behavior. enabled by default.
  checkCert: process.env.NODE_ENV == "production",

  // sets up a GET route when set to true. This is handy for testing in
  // development, but not recommended for production. disabled by default
  debug:  process.env.NODE_ENV == "production"
});

app.set("view engine", "ejs");

alexaApp.launch(function(request, response) {
  response.say("Launched the app!");
});

alexaApp.intent("HelloKT", {
    "slots": { },
    "utterances": [
      "HelloKT Say Hello",
      "HelloKT hello",
      "HelloKT say"
    ]
  },
  function(request, response) {
    console.log("HelloKT")
    console.log(request)
    response.say("OK, I sent Katie a text to say hello.");
  }
);

alexaApp.intent("LoveKT", {
    "slots": { },
    "utterances": [
      "LoveKT Send her some love",
      "LoveKT love"
    ]
  },
  function(request, response) {
    console.log("LoveKT")
    console.log(request)
    response.say("OK, I sent Katie a text that you love her.");
  }
);

alexaApp.intent("SeeKT", {
    "slots": { },
    "utterances": [
      "SeeKT Tell her I can't wait to see",
      "SeeKT See you"
    ]
  },
  function(request, response) {
    console.log("SeeKT")
    console.log(request)
    response.say("OK, I sent Katie a text that you want to see her soon.");
  }
);

alexaApp.error = function(exception, request, response) {
  console.error("ERROR")
  console.error(exception)
  console.error(request)
  response.say("Sorry, something bad happened");
};

app.listen(PORT, "0.0.0.0");
console.log("Listening on port " + PORT);
