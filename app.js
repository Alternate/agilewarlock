var MODELS_PATH = './models'

var restify = require('restify'),
    fs = require('fs'),
    mongoose = require('mongoose/');

var server = restify.createServer({
  name: 'AgileWarlock',
  version: '0.1.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get(/\/public\/?.*/, restify.serveStatic({
  directory: './client/app/'
}));



// connects to MongoDB
//db = mongoose.connect(config.creds.mongoose_auth),
db = mongoose.connect('mongodb://localhost/agilewarlockdb'),
Schema = mongoose.Schema;

// Load models
fs.readdirSync(MODELS_PATH).forEach(function (file) {
  console.log("Loading model " + file);
  require(MODELS_PATH + '/' +file);
});

// Set up our routes, then start the server
var storyController = require('./controllers/StoryController') (server);

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});


