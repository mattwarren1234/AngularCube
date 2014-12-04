angular.module('routes', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    'use strict';
    // $urlRouterProvider
    //   .when('', function(){
    //     console.log('test called yo!');
    //   })
    //   .when('/test', //note - it matches a substring!
    //     '/win2')
    //   .when('/t2', function(){console.log('callback in url router provider');})
    //   .otherwise('fakeness');

    $urlRouterProvider.otherwise('/main');
    $stateProvider.state('main', {
      url : '/main',
      templateUrl : '/components/main.html',
    })
    .state('main.about', {
        url : '^/about',
      })
    .state('main.contact', {
        url : '^/contact',
      })
    .state('main.sampleTab',{
      url : '^/sampleTab',
    })
    .state('main.references',{
      url : '^/references',
    })
    .state('main.uiRouter', {
      url : '^/uiRouter',
    });
}]);