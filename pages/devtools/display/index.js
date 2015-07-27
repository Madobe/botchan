/*
 * Devtools Script
 *
 * This handles the functionality of the devtools panel.
 *
 * Full workflow when starting here:
 * Devtools page -> background page -> content script -> injected script ->
 * Content script -> devtools page
 */

(function() {
  window.CommManager = {
    init: function() {
      this.connection = chrome.runtime.connect({ name: 'init' });

      this.connection.onMessage.addListener(function(message) {
        console.log("Devtools script received message.");
      });
    },

    send: function(message) {
      this.connection.postMessage(message);
    },
  };

  CommManager.init();

  $('#test').on('click', function() {
    var message = { action: 'config', message: "Testing."};

    // Here -> background script
    CommManager.send(message);
  });
})();
