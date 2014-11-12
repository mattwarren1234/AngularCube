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
      templateUrl : 'Main/main.html',
      controller : 'MainCtrl'
    })
    .state('main.win1', {
        url : '^/win1',
      })
    .state('main.win2', {
        url : '^/win2',
      })
    .state('main.win3', {
      url : '^/win3',
    })
    .state('main.win4', {
      url : '^/win4',
    });
}]);