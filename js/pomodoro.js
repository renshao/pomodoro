Pomodoro = function() {
  this.numberOfPomos = 0;
  // this.secondsLeft = 5;
  this.secondsLeft = 1500;
  this.runningProcess = null;
  this.progressCircle = new ProgressCircle(100 - this.secondsLeft / (60 * 25) * 100);
};

Pomodoro.prototype.pomos = function() {
  var pomos = new Array(this.numberOfPomos);
  var i = 0;
  for (i = 0; i < pomos.length; ++i) {
    pomos[i] = new Object();
  }
  return pomos;
}

Pomodoro.prototype.countDownOneSecond = function() {
  if (this.secondsLeft > 0) { 
    this.secondsLeft -= 1;
    this.progressCircle.setProgress(100 - this.secondsLeft / (60 * 25) * 100);
  }

  if (this.secondsLeft === 0) {
    this.pomoCompleted();
  }
};


Pomodoro.prototype.pomoCompleted = function() {
  if (this.runningProcess) {
    this.stopRunning();
  }
  this.numberOfPomos += 1;
};

Pomodoro.prototype.minutesDisplayed = function() {
  return pad(Math.floor(this.secondsLeft / 60), 2);
};


Pomodoro.prototype.secondsDisplayed = function() {
  return pad(this.secondsLeft % 60, 2);
};


Pomodoro.prototype.startRunning = function() {
  var self = this;
  if (self.secondsLeft > 0) {
    self.countDownOneSecond();
    self.runningProcess = setInterval(function(){self.countDownOneSecond();}, 1000);
  }
};

Pomodoro.prototype.stopRunning = function() {
  clearInterval(this.runningProcess);
  this.runningProcess = null;
};

Pomodoro.prototype.toggleRunning = function() {
  if (this.runningProcess) {
    this.stopRunning();
  } else {
    this.startRunning();
  }
};

Pomodoro.prototype.reset = function() {
  if (this.runningProcess) {
    this.stopRunning();
  }

  this.secondsLeft = 60 * 25;
  this.progressCircle.setProgress(0);
};


function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}