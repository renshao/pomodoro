var app = angular.module('pomodoroApp', []);

app.controller('CountDownCtrl', function ($scope, $interval) {
  $scope.secondsLeft = 60 * 25;
  $scope.runningProcess = null;
  $scope.hourHandRotate = 0;
  $scope.minuteHandRotate = 0;

  $scope.updateClockFace = function() {
    var time = new Date();
    var hours = time.getHours(),
        minutes = time.getMinutes();

    $scope.minuteHandRotate = minutes * 6 - 90;
    $scope.hourHandRotate = (hours * 60 + minutes) * 0.5 - 90;
  };

  $interval(function(){
    $scope.updateClockFace();
  }, 500);

  $scope.minutesDisplayed = function() {
    return pad(Math.floor(this.secondsLeft / 60), 2);
  };

  $scope.secondsDisplayed = function() {
    return pad(this.secondsLeft % 60, 2);
  };

  $scope.countDownOneSecond = function() {
    this.secondsLeft -= 1;
  };

  $scope.toggleRunning = function(event) {
    var charCode = (typeof event.which === "number") ? event.which : event.keyCode;
    if (charCode) {
      if (this.runningProcess) {
        $interval.cancel(this.runningProcess);
        this.runningProcess = null;
      } else {
        this.runningProcess = $interval(function(){$scope.countDownOneSecond()}, 1000);
      }
    }
  };



});

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}