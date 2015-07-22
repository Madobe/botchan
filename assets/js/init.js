(function() {
  "use strict";

  function loadScript(url) {
    var script = document.createElement('script');
    script.src = chrome.extension.getURL(url);
    (document.head || document.documentElement).appendChild(script);
  }

  $(document).on('ready', function() {
    loadScript('assets/js/modules/BotchanCommand.js');
    loadScript('assets/js/modules/BotchanDatabase.js');
    loadScript('assets/js/controllers/MainController.js');
  });
})();
