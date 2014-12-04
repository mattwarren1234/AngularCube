'use strict';
angular.module('CubeCtrl', [])
.directive('myCube', function(){
  return {
    transclude: true,
    scope: {},
    controller: function($scope, $state, $rootScope) {
      $scope.state = $state;
      $scope.selectedFace = 'show-front';
      var faces = {};
      $scope.defaultFaces = [
        'top',
        'bottom',
        'left',
        'right',
        'back',
        'front'
      ];
      var getSubState = function(stateName){
        var dotIndex = stateName.lastIndexOf('.');
        if (dotIndex === -1) return stateName;
        return stateName.substring(dotIndex + 1);
      };
      var setFace = function(stateName){
        var name = getSubState(stateName);
        if (name in faces){
          $scope.selectedFace = 'show-' + faces[name];
          console.log('set face to ' + $scope.selectedFace);
        }
      };
      setFace($state.current.name);
     $rootScope.$on('$stateChangeStart', 
      function(event, toState){ 
        console.log('toState.name is ' + toState.name);
        setFace(toState.name);
        $scope.currentUrl = toState.url;
      });
      this.addFace = function(cubeFace) {
        faces[cubeFace.route] = cubeFace.face;
        var loc = $scope.defaultFaces.indexOf(cubeFace.face);
        if (loc > -1) { $scope.defaultFaces.splice(loc, 1); }
        setFace($state.current.name);
      };
    },
    templateUrl: 'modules/cube/cube.html'
  };
})
.directive('cubeFace', function(){
  return {
    require: '^myCube',
    restrict: 'E',
    transclude: true,
    scope: {
      route: '@',
      face: '@',
      isDefault : '@'
    },
    link: function(scope, element, attrs, cubeCtrl) {
      if (!scope.isDefault) { 
        cubeCtrl.addFace({route: scope.route, face: scope.face});
      } 
    },
    templateUrl: 'modules/cube/cubeFace.html'
  };
});
