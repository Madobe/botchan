/*
 * Config Controller
 *
 * The config controller holds settings set via the devtools GUI. These values may be changed on the
 * fly. These values will be updated and saved only upon clicking the save button in the GUI.
 *
 * The settings page pulls a little trick by updating only the localStorage values. To have the
 * values take effect in the tab, a message must be sent from the settings page to force a reload.
 */
(function() {
  "use strict";

  window.ConfigController = {
    defaults: function() {
      return {
        admin_icon         : ' <img class="stafficon" src="http://img1.wikia.nocookie.net/__cb20150611191751/kancolle/images/5/58/Icon-admin.png">',
        mod_icon           : ' <img class="modicon" src="http://images2.wikia.nocookie.net/monchbox/images/6/6b/Icon-chatmod.png">',

        rr_win_points      : 10,
        rr_lose_points     : 10,
        rr_cooldown        : 0,

        rps_win_points     : 1,
        rps_lose_points    : 1,
        rps_cooldown       : 0,
        personality        : 'sendai',
      };
    },

    save: function() {
      localStorage.botchan_config = JSON.stringify(this);
    },

    load: function() {
      $.extend(this, this.defaults(), JSON.parse(localStorage.botchan_config || '{}'));
    },
  };

  window.addEventListener('beforeunload', function(e) {
    ConfigController.save();
  });

  ConfigController.load();
})();
