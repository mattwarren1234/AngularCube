'use strict';
angular.module('CubeCtrl', [])
.directive('myCube', function($rootScope){
  return {
    transclude: true,
    scope: {},
    controller: function($scope) {
      $scope.selectedFace = 'show-front';
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
        if (name in $scope.faces){
          $scope.selectedFace = 'show-' + $scope.faces[name];
          console.log('set face to ' + $scope.selectedFace);
        }
      };
     $rootScope.$on('$stateChangeStart', 
      function(event, toState){ 
        console.log('toState.name is ' + toState.name);
        setFace(toState.name);
        $scope.currentUrl = toState.url;
      });
      var faces = $scope.faces = [];
      this.addFace = function(cubeFace) {
        console.log('face added!');
        faces[cubeFace.route] = cubeFace.face;
        var loc = $scope.defaultFaces.indexOf(cubeFace.face);
        if (loc > -1) { $scope.defaultFaces.splice(loc, 1); }
      };
    },
    templateUrl: 'cube/cube.html'
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
    templateUrl: 'cube/cubeFace.html'
  };
});
