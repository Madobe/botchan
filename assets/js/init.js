(function() {
  "use strict";

  function loadScript(url) {
    var script = document.createElement('script');
    script.src = chrome.extension.getURL(url);
    (document.head || document.documentElement).appendChild(script);
  }

  $(document).on('ready', function() {
    loadScript('assets/js/controllers/ConfigController.js');
    loadScript('assets/js/controllers/DataController.js');
    loadScript('assets/js/modules/BotchanCommand.js');
    loadScript('assets/js/modules/BotchanDatabase.js');
    loadScript('assets/js/modules/BotchanTimer.js');
    loadScript('assets/js/controllers/TimerController.js');
    loadScript('assets/js/controllers/MainController.js');
  });
})();
