/*
 * Timer Controller
 *
 * This controller manages the setting and clearing of timers.
 */

(function() {
  "use strict";

  window.TimerController = {
    timers: [],

    ticks_from_now: function(func, time, recurring) {
      time += new Date().getTime();
      var timer = new BotchanTimer(func, time, recurring);
      this.timers.push(timer);
      return timer;
    },

    // For adding a timer relative to the current time
    set_from_now: function(func, seconds, recurring) {
      var time = seconds * 1000;
      return this.ticks_from_now(func, time, recurring);
    },

    // For adding a timer at a specific time of day
    // Input format: Hours:Minutes:Seconds (eg. 23:59:59)
    set_at_time: function(func, time, recurring) {
      time = time.split(':');
      var date = new Date();
      date.setHours(time[0]);
      date.setMinutes(time[1]);
      date.setSeconds(time[2]);
      return this.ticks_from_now(func, date.getTime() - new Date(), recurring);
    },

    garbage_collect: function(object) {
      var index = this.timers.indexOf(object);
      if(index != -1) this.timers.splice(index, 1);
    },
  };
})();
