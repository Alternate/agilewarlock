'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('StoryCtrl', ['$scope', function($scope) {
      $scope.list = [];
      $scope.text = 'En tant Charles je veux voir Ophélie afin de rire';
      $scope.submit = function() {
        if (this.description) {
          this.list.push(this.description);
          this.description = '';
        }
      };
  }])
  .controller('MyCtrl2', [function() {

  }]);