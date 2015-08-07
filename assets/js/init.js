/*
 * Content Script
 *
 * This is the initial script that injects all scripts onto the page. It also serves as the gateway
 * for messages being sent from the injected scripts to the extension (and devtools) and vice versa.
 */

(function() {
  "use strict";

  function loadScript(url) {
    var script = document.createElement('script');
    script.src = chrome.extension.getURL(url);
    (document.head || document.documentElement).appendChild(script);
  }

  $(document).on('ready', function() {
    loadScript('assets/js/controllers/ConstantsController.js');
    loadScript('assets/js/controllers/CommController.js');
    loadScript('assets/js/controllers/ConfigController.js');
    loadScript('assets/js/controllers/DataController.js');
    loadScript('assets/js/models/BotchanCommand.js');
    loadScript('assets/js/models/BotchanDatabase.js');
    loadScript('assets/js/models/BotchanTimer.js');
    loadScript('assets/js/controllers/PersonalityController.js');
    loadScript('assets/js/controllers/TimerController.js');
    loadScript('assets/js/controllers/MainController.js');
  });

  // Injected script -> here -> devtools page
  window.addEventListener('message', function(e) {
    var data = e.data;
    if(typeof data == 'object' && data.id == 'yuki' && data.target == 'extension') {
      chrome.runtime.sendMessage(data);
    }
  });

  // Background page -> here -> injected script
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    window.postMessage($.extend(request, { id: 'yuki', target: 'injected' }), '*');
  });
})();
