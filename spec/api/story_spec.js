var frisby = require('frisby');
var _storyCount = -1; // the number of user stories returned by the database

/**
 * Test retrieving the list of user stories then updates _storyCount
 * @param optional the expected number of stories
 *                 when provided, the current number of stories is compared to this value
 */
function testGellAllStories(expectedCount)
{
  frisby.create('Ensure getting story list returns an array')
    .get('http://localhost:8080/story')
    .expectStatus(200)
    .expectJSONTypes('*',
      {
        _id: String,
        description: String
      })
    .afterJSON(function(data) {
      if(expectedCount != undefined)
      {
        expect(data.length).toBe(expectedCount);
      }
      else {
      _storyCount = data.length;
      }
    })
    .toss();
}

// perform this test before the CRUD one, to set the count of user stories
testGellAllStories();

/**
 * Test story creation
 */
frisby.create('Ensure creating story results in a new story with and Id and a description')
  .post('http://localhost:8080/story', {
      description: "an initial description"
    })
  .expectStatus(200)
  .expectJSONTypes({
      _id: String,
      description: String
    })
  .expectJSON({
      description: "an initial description"
    })
  .afterJSON(function(data)
  {
    testGellAllStories(_storyCount + 1); // the number of stories should be one more than before starting the test
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
      testGetDeletedStory(story);
      testGellAllStories(_storyCount); // the number of stories should be the same than before starting the test
    })
    .toss();
}


function testGetDeletedStory(story){
  frisby.create('Ensure getting deleted user story results in 404 error')
    .get('http://localhost:8080/story/' + story._id)
    .expectStatus(404)
    .toss();
}


