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

  BotchanCommand.prototype.overweight = function(current_weight) {
    if(current_weight + this.weight > 3) return true;
    else return false;
  }

  // This is run in the context of MainController
  BotchanCommand.prototype.execute = function(command, chat) {
    if(!command.overweight(this.get_weight(chat))) {
      this.add_weight(command.weight);
      $.proxy(command.message, this)(this.strip_calls(chat), chat.attributes.name, this.get_authority(chat));
    }
  }
})();
