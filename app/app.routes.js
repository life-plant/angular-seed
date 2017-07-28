(function() {
  'use strict';
  angular
    .module('app', ['ui-router'])
    .config(config);

  function config ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
      .state('/index', {
        url: "/index",
        templateUrl: "views/index.html"
      })
  }
})()