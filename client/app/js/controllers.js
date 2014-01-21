'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('StoryCtrl', ['$scope', 'Restangular', function($scope, Restangular) {
    var storyAPI = Restangular.all('story');
    storyAPI.getList().then(function(stories)
    {
      $scope.list = stories;
    });
    $scope.submit = function() {
      if (this.description) {
        storyAPI.post({description: this.description }).then(
          function(response){
            $scope.list.push(response);
            console.log("the user story was created");
          },
          function() {
            console.log("There was an error when creating the user story");
          });
        this.description = '';
      }
    };
  }])
  .controller('MyCtrl2', [function() {

  }]);