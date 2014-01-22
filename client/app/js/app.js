'use strict';


// Declare app level module which depends on filters, and services
angular.module('agileWarlock', [
  'ngRoute',
  'restangular',
  'agileWarlock.filters',
  'agileWarlock.services',
  'agileWarlock.directives',
  'agileWarlock.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/stories', {templateUrl: 'partials/stories.html', controller: 'StoryCtrl'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]).
config(function(RestangularProvider) {
    RestangularProvider.setRestangularFields({
        id: "_id"
    });
});
