var mongoose   = require('mongoose'),
    restify    = require('restify'),
    util       = require('./Utils.js'),
    StoryModel = mongoose.model('Story')

module.exports = function (server)
{
  /**
   * This function is responsible for returning all entries for the story model
   */
  function getStories (req, res, next) {
    // .find() without any arguments, will return all results
    StoryModel.find(null, null, null, function (err, data) {
      if (err) return util.handleError(err);
      console.log("getting all stories returns: " + data);
      res.send(data);
      return next();
    });
  }

  /**
   * This function is responsible for returning a given story
   */
  function getStory (req, res, next) {
    console.log("getting story of id: " + req.params._id);
    StoryModel.findById(req.params._id, function (err, data) {
      if (err) return util.handleError(err);
      if(!data)
      {
        return next(new restify.ResourceNotFoundError("User story " + req.params._id + " not found"));
      }
      res.send(data);
      return next();
    });
  }

  /**
   * This function is responsible for deleting a given story
   */
  function deleteStory (req, res, next) {
    // param checking not required; the routing will fail if the id is missing
    console.log("deleting story of id: " + req.params._id);
    StoryModel.findById(req.params._id, function (err, data)
    {
      if (err) return util.handleError(err);
      if(!data)
      {
        return next(new restify.ResourceNotFoundError("User story " + req.params._id + " not found"));
      }
      StoryModel.remove({ _id: req.params._id}, function (err, data) {
        if (err) return util.handleError(err);
        res.send({});
        return next();
      });
    });
  }

  /**
   * This function is responsible for updating a given story
   */
  function updateStory (req, res, next) {
    var error = util.detectMissingParameter(req, ["_id", "description"]);
    if (error) {
      return next(error);
    }
    console.log("updating story of id: " + req.params._id);
    StoryModel.findById(req.params._id, function (err, data)
    {
      if (err) return util.handleError(err);
      if(!data)
      {
        return next(new restify.ResourceNotFoundError("User story " + req.params._id + " not found"));
      }
      StoryModel.update({_id : req.params._id}, {description: req.params.description},
          function (err, numberAffected, raw) {
            if (err) return util.handleError(err);
            res.send({}); // raw.ok === 1 && raw.updatedExisting
            return next();
          });
    });
  }


  /**
   * Creates a new story and stores it in the database
   */
  function postStory (req, res, next) {
    var error = util.detectMissingParameter(req, ["description"]);
    if (error) {
      return next(error);
    }
    var story = new StoryModel();
    story.description = req.params.description;
    console.log("Creating story: " + req.params.description);
    story.save(function (err, product, numberAffected) {
      if (err) return util.handleError(err);
      res.contentType = 'json';
      res.send(product);
      return next();
    });
  }

  // declare routes
  server.get ('/story',     getStories);
  server.get ('/story/:_id', getStory);
  server.put ('/story/:_id', updateStory);
  server.del ('/story/:_id', deleteStory);
  server.post('/story',     postStory);
}