/*
 * Bot-chan Command
 *
 * Each instance of this object is a single command which comes with methods to streamline its
 * usage. It can come in three types: "text", "function" and "redirect". All three have different
 * behaviors.
 */

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

  BotchanCommand.prototype.overweight = function(current_weight, authority) {
    if(authority) return false;
    else if(current_weight + this.weight > 3) return true;
    else return false;
  }

  // This is run in the context of MainController
  BotchanCommand.prototype.execute = function(command, chat) {
    if(!command.overweight(this.get_weight(chat), this.get_authority(chat))) {
      if(!this.mode_check(chat, command.trigger)) return true;

      this.add_weight(chat, command.weight);
      var temp = chat.attributes.text.split(' ');
      temp.shift();
      chat.attributes.text = temp.join(' ');
      $.proxy(command.message, this)(chat.attributes.text, chat.attributes.name, this.get_authority(chat));
    }
  }
})();
