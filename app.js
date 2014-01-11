var restify = require('restify');

var server = restify.createServer({
  name: 'agileboard',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get(/\/public\/?.*/, restify.serveStatic({
  directory: './client/app/'
}));

/**
 * This function is responsible for returning all entries for the story model
 */
function getStories(req, res, next) {
  // .find() without any arguments, will return all results
  StoryModel.find().execFind(function (arr,data) {
    res.send(data);
    return next();
  });
}

/**
 * This function is responsible for returning a given story
 */
function getStory(req, res, next) {
  console.log("getting story of id: " + req.params.id);
  StoryModel.findById(req.params.id, function (err, data) {
    console.log("findById returned an error: " + err);
    console.log("findById returned " + data);
    res.send(data);
    return next();
  });
}


/**
 * Creates a new story and stores it in the database
 */
function postStory(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var story = new StoryModel();
  story.description = req.params.description;
  story.save(function (err, product, numberAffected) {
    res.contentType = 'json';
    res.send(product);
    return next();
  });
}

// Set up our routes, then start the server
server.get ('/story',       getStories);
server.get ('/story/:id',   getStory);
server.post('/story',       postStory);

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});


var mongoose = require('mongoose/');
//var config = require('./config');
//db = mongoose.connect(config.creds.mongoose_auth),
db = mongoose.connect('mongodb://localhost/agilewarlockdb'),
Schema = mongoose.Schema;
// Create a schema for our data
var StorySchema = new Schema({
  description: String
});
// Use the schema to register a model with MongoDb
mongoose.model('Story', StorySchema);
var StoryModel = mongoose.model('Story');
