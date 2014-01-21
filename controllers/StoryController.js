var mongoose = require('mongoose'),
    restify = require('restify'),
    StoryModel = mongoose.model('Story')

module.exports = function (server)
{
  /**
   * This function is responsible for returning all entries for the story model
   */
  function getStories (req, res, next) {
    // .find() without any arguments, will return all results
    StoryModel.find().execFind(function (err,data) {
      if (err) return handleError(err);
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
      if (err) return handleError(err);
      if(!data)
      {
        return next(new restify.ResourceNotFoundError("User story " + req.params.id + " not found"));
      }
      res.send(data);
      return next();
    });
  }

  /**
   * This function is responsible for deleting a given story
   */
  function deleteStory (req, res, next) {
    console.log("deleting story of id: " + req.params.id);
    StoryModel.findById(req.params.id, function (err, data)
    {
      if (err) return handleError(err);
      if(!data)
      {
        return next(new restify.ResourceNotFoundError("User story " + req.params.id + " not found"));
      }
      StoryModel.remove(req.params.id, function (err, data) {
        if (err) return handleError(err);
        res.send({});
        return next();
      });
    });
  }

  /**
   * This function is responsible for updating a given story
   */
  function updateStory (req, res, next) {
    console.log("updating story of id: " + req.params.id);
    StoryModel.findById(req.params.id, function (err, data)
    {
      if (err) return handleError(err);
      if(!data)
      {
        return next(new restify.ResourceNotFoundError("User story " + req.params.id + " not found"));
      }
      StoryModel.update({_id : req.params.id}, {description: req.params.description},
          function (err, numberAffected, raw) {
            if (err) return handleError(err);
            res.send({}); // raw.ok === 1 && raw.updatedExisting
            return next();
          });
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
      if (err) return handleError(err);
      res.contentType = 'json';
      res.send(product);
      return next();
    });
  }

  function handleError (err)
  {
    var errObj = err;
    if (err.err) {
      errObj = err.err; // unnest error when required
    }
    console.log("An error occured: " + errObj);
    return next(new restify.InternalError(errObj));
  }

  // declare routes
  server.get ('/story',     getStories);
  server.get ('/story/:id', getStory);
  server.put ('/story/:id', updateStory);
  server.del ('/story/:id', deleteStory);
  server.post('/story',     postStory);
}