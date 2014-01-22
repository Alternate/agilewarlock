'use strict';

/* Controllers */

angular.module('agileWarlock.controllers', []).
  controller('StoryCtrl', ['$scope', 'Restangular', function($scope, Restangular) {
    $scope.list = Restangular.all('story').getList().$object;
    $scope.submit = function() {
      if (this.description) {
        $scope.list.post({description: this.description }).then(
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
    $scope.delete = function(story) {
      if (story) {
        Restangular.one('story', story._id).remove().then(
          function(){
            for(var i = $scope.list.length - 1; i >= 0; i--) {
                if($scope.list[i] === story) {
                   $scope.list.splice(i, 1);
                   console.log("the user story " + story._id + " was deleted");
                   break;
                }
            }
          },
          function() {
            console.log("There was an error when deleting the user story " + story._id );
          });
      }
    };
  }])
  .controller('MyCtrl2', [function() {

  }]);