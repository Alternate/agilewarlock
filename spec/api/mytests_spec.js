var frisby = require('frisby');

/**
 * Test story retrieval
 */
function testGetStory(story){
frisby.create('Ensure getting user story results in the right story being returned')
  .get('http://localhost:8080/story/' + story._id)
  .expectStatus(200)
  .expectJSONTypes({
      description: String,
      _id: String
    })
  .expectJSON({
      _id: story._id,
      description: story.description
    })
  .inspectBody()
//  .afterJSON(function(data)
//  {
//
//  })
.toss();
}

/**
 * Test story creation
 */
frisby.create('Ensure creating story results in a new story with and Id and a description')
  .post('http://localhost:8080/story', {
      description: "as an user I want to pass my test to ensure the API is working"
    })
  .expectStatus(200)
  .expectJSONTypes({
      description: String,
      _id: String
    })
  .expectJSON({
      description: "as an user I want to pass my test to ensure the API is working"
    })
  .inspectBody()
  .afterJSON(function(data)
  {
    //continue with retrieval test
    testGetStory(data);
  })
.toss()



