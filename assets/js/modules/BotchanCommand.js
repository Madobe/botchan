(function() {
  "use strict";

  window.BotchanCommand = function(type, trigger, weight, message, redirect) {
    this.type = type;
    this.trigger = trigger;
    this.message = message;
    this.weight = weight;
    this.redirect = redirect || '';
  }

  BotchanCommand.prototype.matches = function(text) {
    var regexp = new RegExp(this.trigger, 'gi');
    if(regexp.test(text)) return true;
    else return false;
  }

  // This is run in the context of MainController
  BotchanCommand.prototype.execute = function(chat) {
  }
})();
