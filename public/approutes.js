angular.module('routes', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('main', {
      url : '/',
      data : 'well isnt this just great!',
      views : {
        // 't1' : { template : 'test'}
      },
    })
    .state('win1', {
        url : '/win1',
        // data : {what : 'i dont even'}
    })
    .state('win2', {
      url : '/win2',
      // data : 'ha ha ha ha'
    })
    .state('win3', {
      url : '/win3',
      // data : 'ha ha ha ha'
    });
}]);