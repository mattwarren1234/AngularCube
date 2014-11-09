angular.module('MainCtrl', [])
.controller('MainCtrl', function($scope, $rootScope){
  'use strict';
  $scope.brah = 'test';
  $scope.selectedFace = 'front';
  $scope.faces = {
    'main': 'show-front',
    'win1': 'show-back',
    'win2': 'show-left',
    'win3': 'show-right'
  };

  console.log('controller INITIALIZED');
  $rootScope.$on('$stateChangeStart', 
  function(event, toState, toParams, fromState, fromParams){ 
    console.log(toParams);
    console.log(toState);
    console.log(fromState);
    console.log(fromParams);
    console.log('state changed!');

// toState {url: "/", data: "well isnt this just great!", name: "main”}
console.log('toState.name is ' + toState.name);
    $scope.selectedFace = $scope.faces[toState.name];
    console.log('set selected face to' + $scope.selectedFace);
  });

});
