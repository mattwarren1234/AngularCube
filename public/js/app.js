angular.module('cube', [])
  .controller('MainCtrl', ['$scope', function($scope){
    $scope.test = 'Hello world!';

    var xAngle = 0, yAngle = 0;
    document.addEventListener('keydown', function(e) {
      switch(e.keyCode) {

        case 37: // left
          yAngle -= 90;
          break;

        case 38: // up
          xAngle += 90;
          break;

        case 39: // right
          yAngle += 90;
          break;

        case 40: // down
          xAngle -= 90;
          break;
      }
      $('#cube').css('-webkit-transform', "rotateX(" + xAngle + "deg) rotateY(" + yAngle + "deg)");
    }, false);

  }]);