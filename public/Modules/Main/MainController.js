'use strict';
angular.module('MainCtrl', [])
.controller('MainCtrl', function($scope, $rootScope, $state){
  console.log('controller INITIALIZED');
  $scope.state = $state;
  $scope.faces = {
    'win1': 'show-front',
    'win2': 'show-back',
    'win3': 'show-left',
    'win4': 'show-right'
  };
  var getSubState = function(stateName){
    var dotIndex = stateName.lastIndexOf('.');
    if (dotIndex === -1) return stateName;
    return stateName.substring(dotIndex + 1);
  };
  var setFace = function(stateName){
    var name = getSubState(stateName);
    if (name in $scope.faces){
      $scope.selectedFace = $scope.faces[name];
    }
  };
  setFace($state.current.name); //on load we need to set correct face.
  $rootScope.$on('$stateChangeStart', 
    function(event, toState){ 
      // toState {url: "/", data: "well isnt this just great!", name: "main”}
      // console.log('toState.name is ' + toState.name);
      setFace(toState.name);
  });
});
