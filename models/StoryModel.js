/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    restify = require('restify');


// Create a schema for our data
var StorySchema = new Schema({
  description: String
});
// Use the schema to register a model with MongoDb
mongoose.model('Story', StorySchema);