'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',//注册ui.router组件
  'myApp.view1',//这里是ui-router必须的
  'myApp.view2',//
  'myApp.version'
]).

config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  	$urlRouterProvider.otherwise('/view1');//不匹配的路径重定向
}
]);
