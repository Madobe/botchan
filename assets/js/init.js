(function() {
  "use strict";

  function loadScript(url) {
    var script = document.createElement('script');
    script.src = chrome.extension.getURL(url);
    (document.head || document.documentElement).appendChild(script);
  }

  $(document).on('ready', function() {
    loadScript('assets/js/controllers/CommController.js');
    loadScript('assets/js/controllers/ConfigController.js');
    loadScript('assets/js/controllers/DataController.js');
    loadScript('assets/js/models/BotchanCommand.js');
    loadScript('assets/js/models/BotchanDatabase.js');
    loadScript('assets/js/models/BotchanTimer.js');
    loadScript('assets/js/controllers/TimerController.js');
    loadScript('assets/js/controllers/MainController.js');
  });

  window.addEventListener('message', function(e) {
    var data = e.data;
    if(typeof data == 'object' && data.id == 'yuki') {
      console.log("Sending message from content script.");
      chrome.runtime.sendMessage(data, function(response) {
        console.log("Testing.");
        console.log(response);
      });
    }
  });
})();
