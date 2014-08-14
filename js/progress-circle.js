ProgressCircle = function(initialProgress) {
  this.canvas = document.querySelector('#progress-circle');
  this.ctx = this.canvas.getContext("2d");
  this.currentPercentage = initialProgress || 0;
  this.setProgress(this.currentPercentage);
};

ProgressCircle.prototype.resetProgress = function() {
  this.currentPercentage = 0;
  this.clearCircle();
};

ProgressCircle.prototype.clearCircle = function() {
  var ctx = this.ctx;
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.drawArc(0, Math.PI * 2, '#1a1a1a');
};

ProgressCircle.prototype.setProgress = function(percentage) {
  var ctx = this.ctx;
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
  this.drawArc(-Math.PI / 2, -Math.PI / 2 + percentage/100 * Math.PI * 2, '#69D7C6');
  this.drawArc(-Math.PI / 2 + percentage/100 * Math.PI * 2, 1.5 * Math.PI, '#1a1a1a');

  this.percentage = percentage;
};

ProgressCircle.prototype.drawArc = function(startAngle, endAngle, color) {
  var ctx = this.ctx;
  ctx.strokeStyle = color;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(300, 300, 290, startAngle, endAngle);
  ctx.stroke();
};