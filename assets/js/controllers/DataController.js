/*
 * Data Controller
 * 
 * The data controller is meant to hold all the data that's meant to be saved into localStorage.
 * Data that isn't meant to be persisted and which can be ignored upon a refresh is instead stored
 * directly on the Main Controller.
 */

(function() {
  "use strict";

  window.DataController = {
    defaults: function() {
      return {
        game_cooldowns: {
          reverse_roulette: 0,
          rps: 0,
        },
        cooldowns: {},
        epeen: {},
        silence: 0,
        explosions: ['Akios'],
        links: [],
        infobits: {},
      };
    },

    save: function() {
      // Saving is done with a copy so we can tweak it without modifying the current one
      var data = $.extend(true, this.defaults(), this);
      data.links = data.links.slice(-5);
      localStorage.botchan_data = JSON.stringify(data);
    },

    load: function() {
      $.extend(this, this.defaults(), JSON.parse(localStorage.botchan_data || {}));
    },
  };

  window.addEventListener('beforeunload', function(e) {
    DataController.save();
  });

  DataController.load();
})();
