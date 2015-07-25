/*
 * Bot-chan Timer
 *
 * This represents a single timer object. It contains functions for converting itself to textual
 * format.
 */

(function() {
  "use strict";

  window.BotchanTimer = function(func, time, recurring) {
    this.func = func;
    this.time = time;
    this.recurring = recurring;
    this.is_interval = false;
    this.timer = setTimeout(this.run, this.time - new Date());
  };

  BotchanTimer.prototype.run = function() {
    clearTimeout(this.timer);
    this.func.call();
    if(this.recurring) {
      this.time += 1000 * 60 * 60 * 24;
      setInterval(this.func, 1000 * 60 * 60 * 24);
      this.is_interval = true;
    } else {
      TimerController.garbage_collect(this);
    }
  };

  BotchanTimer.prototype.stop = function() {
    if(this.is_interval) clearInterval(this.timer);
    else clearTimeout(this.timer);
    TimerController.garbage_collect(this);
  };

  BotchanTimer.prototype.remaining = function() {
    var remaining = this.time - new Date();
    remaining /= 1000;

    var hours = Math.floor(remaining / 3600);
    remaining %= 3600;
    if(hours < 10) hours = "0" + hours;

    var minutes = Math.floor(remaining / 60);
    remaining %= 60;
    if(minutes < 10) minutes = "0" + minutes;

    if(remaining < 10) remaining = "0" + remaining;

    return hours + ":" + minutes + ":" + remaining;
  };
})();
