mongoose = require('mongoose')
  , StoryModel = mongoose.model('Story')

module.exports = function (server)
{
  /**
   * This function is responsible for returning all entries for the story model
   */
  function getStories (req, res, next) {
    // .find() without any arguments, will return all results
    StoryModel.find().execFind(function (err,data) {
      res.send(data);
      return next();
    });
  }

  /**
   * This function is responsible for returning a given story
   */
  function getStory (req, res, next) {
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
  function postStory (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var story = new StoryModel();
    story.description = req.params.description;
    console.log("Creating story: " + req.params.description);
    story.save(function (err, product, numberAffected) {
      res.contentType = 'json';
      res.send(product);
      return next();
    });
  }

  // declare routes
  server.get ('/story',     getStories);
  server.get ('/story/:id', getStory);
  server.post('/story',     postStory);
}