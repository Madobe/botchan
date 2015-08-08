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
      return this.ticks_from_now(func, seconds * 1000, recurring * 1000);
    },

    // For adding a timer at a specific time of day
    // Input format: Hours:Minutes:Seconds (eg. 23:59:59)
    set_at_time: function(func, time, recurring) {
      time = time.split(':');
      var date = new Date();
      date.setHours(time[0]);
      date.setMinutes(time[1]);
      date.setSeconds(time[2]);
      if(date.getTime() - new Date().getTime() < 0) date = date.getTime() + 1000 * 60 * 60 * 24;
      else date = date.getTime();
      return this.ticks_from_now(func, date - new Date().getTime(), recurring);
    },

    garbage_collect: function(object) {
      var index = this.timers.indexOf(object);
      if(index != -1) this.timers.splice(index, 1);
    },

    remaining: function() {
      return this.timers.map(function(x) { return x.remaining(); });
    },
  };

  TimerController.set_at_time(function() { MainController.say("PvP will reset in 30 minutes!"); }, "10:30:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say("PvP will reset in 30 minutes!"); }, "22:30:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say("Quests will reset in 30 minutes!"); }, "11:30:00", 1000 * 60 * 60 * 24);

  TimerController.set_at_time(function() { MainController.say(PersonalityController.get_line('0000')); }, "8:00:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say(PersonalityController.get_line('0100')); }, "9:00:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say(PersonalityController.get_line('0200')); }, "10:00:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say(PersonalityController.get_line('0300')); }, "11:00:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say(PersonalityController.get_line('0400')); }, "12:00:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say(PersonalityController.get_line('0500')); }, "13:00:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say(PersonalityController.get_line('0600')); }, "14:00:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say(PersonalityController.get_line('0700')); }, "15:00:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say(PersonalityController.get_line('0800')); }, "16:00:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say(PersonalityController.get_line('0900')); }, "17:00:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say(PersonalityController.get_line('1000')); }, "18:00:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say(PersonalityController.get_line('1100')); }, "19:00:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say(PersonalityController.get_line('1200')); }, "20:00:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say(PersonalityController.get_line('1300')); }, "21:00:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say(PersonalityController.get_line('1400')); }, "22:00:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say(PersonalityController.get_line('1500')); }, "23:00:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say(PersonalityController.get_line('1600')); }, "00:00:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say(PersonalityController.get_line('1700')); }, "01:00:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say(PersonalityController.get_line('1800')); }, "02:00:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say(PersonalityController.get_line('1900')); }, "03:00:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say(PersonalityController.get_line('2000')); }, "04:00:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say(PersonalityController.get_line('2100')); }, "05:00:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say(PersonalityController.get_line('2200')); }, "06:00:00", 1000 * 60 * 60 * 24);
  TimerController.set_at_time(function() { MainController.say(PersonalityController.get_line('2300')); }, "7:00:00", 1000 * 60 * 60 * 24);
})();
