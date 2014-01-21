var frisby = require('frisby');

/**
 * Test story creation
 */
frisby.create('Ensure creating story results in a new story with and Id and a description')
  .post('http://localhost:8080/story', {
      description: "as an user I want to pass my test to ensure the API is working"
    })
  .expectStatus(200)
  .expectJSONTypes({
      _id: String,
      description: String
    })
  .expectJSON({
      description: "as an user I want to pass my test to ensure the API is working"
    })
  .afterJSON(function(data)
  {
    testGetStory(data);
  })
.toss()

/**
 * Test story retrieval
 */
function testGetStory(story){
frisby.create('Ensure getting user story results in the right story being returned')
  .get('http://localhost:8080/story/' + story._id)
  .expectStatus(200)
  .expectJSONTypes({
      _id: String,
      description: String
  })
  .expectJSON({
      _id: story._id,
      description: story.description
    })
  .afterJSON(function(data)
  {
    testUpdateStory(data);
  })
  .toss();
}

/**
 * Test story update
 */
function testUpdateStory(story){
frisby.create('Ensure updating user story results in the story content being modified')
  .put('http://localhost:8080/story/'  + story._id, {
      description: "an updated description"
    })
  .expectStatus(200)
  .afterJSON(function(data)
  {
    testDeleteStory(story)
  })
  .toss();
}

/**
 * Test story deletion
 */
function testDeleteStory(story){
frisby.create('Ensure deleting user story results in the right story being deleted')
  .delete('http://localhost:8080/story/' + story._id)
  .expectStatus(200)
  .expectJSON({})
  .afterJSON(function(data)
  {
    testGetDeletedStory(story)
  })
  .toss();
}


function testGetDeletedStory(story){
frisby.create('Ensure getting deleted user story results in 404 error')
  .get('http://localhost:8080/story/' + story._id)
  .expectStatus(404)
  .toss();
}



/**
 * Test getting a list of user stories
 */
frisby.create('Ensure getting story list returns an array')
  .get('http://localhost:8080/story')
  .expectStatus(200)
  .expectJSONTypes('*',
    {
      _id: String,
      description: String
    })
  .inspectBody()
.toss()
