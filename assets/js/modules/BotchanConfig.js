/*
 * Handles the saving and loading of configuration settings.
 */

(function() {
  "use strict";

  window.BotchanConfig = {
    defaults: function() {
    },

    save: function() {
      localStorage.botchan_config = JSON.stringify(this);
    },

    load: function() {
      var savedConfig = JSON.parse(localStorage.botchan_config || "{}");
      $.extend(this, savedConfig);
    }
  };
})();
