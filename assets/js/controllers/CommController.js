/*
 * Communications Controller
 *
 * In order to communicate with the extension, a window message must be first made to communicate
 * with the content script, which in turn will communicate with the extension and vice versa.
 *
 * This controller represents the injected scripts.
 *
 * Full workflow when starting here:
 * Injected script -> content script -> devtools page ->
 * Background page -> content script => injected script
 */

(function() {
  window.CommController = {
    // Content script -> here
    listen: function() {
      var self = this;

      window.addEventListener('message', function(e) {
        var data = e.data;
        if(typeof data == 'object' && data.id == 'yuki' && data.target == 'injected') {
          if(data.action == 'config') {
            // Send a copy so ConfigController doesn't gain "id" and "target"
            var contents = JSON.parse(JSON.stringify(ConfigController));
            self.send({ action: 'config', contents: contents });
          } else if(data.action == 'data') {
            var contents = JSON.parse(JSON.stringify(DataController));
            self.send({ action: 'data', contents: contents });
          } else if(data.action == 'update_config') {
            ConfigController[data.field] = data.value;
          } else if(data.action == 'update_data') {
            DataController[data.field] = data.value;
          }
        }
      });
    },

    // Here -> content script
    send: function(message) {
      window.postMessage($.extend(message, { id: 'yuki', target: 'extension' }), '*');
    },
  };

  CommController.listen();
})();
