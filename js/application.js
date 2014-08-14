var app = angular.module('pomodoroApp', []);

app.controller('CountDownCtrl', function ($scope, $interval) {
  $scope.pomodoro = new Pomodoro();
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


  $scope.keypressed = function(event) {
    var charCode = (typeof event.which === "number") ? event.which : event.keyCode;
    if (charCode === 32) {
      this.pomodoro.toggleRunning();
    } else if (charCode === 82 || charCode === 114) {
      this.pomodoro.reset();
    }
  };

  $scope.resetCounter = function() {

  };
});
