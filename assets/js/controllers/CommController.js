/*
 * Communications Controller
 *
 * In order to communicate with the extension, a window message must be first made to communicate
 * with the content script, which in turn will communicate with the extension and vice versa.
 */

(function() {
  window.CommController = {
    listen: function() {
      window.addEventListener('message', function(e) {
        var data = e.data;
        if(typeof data == 'object' && data.id == 'yuki' && data.target == 'injected') {
          console.log("CommController received message.");
        }
      });
    },

    send: function(message) {
      console.log("Sending message from injected script.");
      window.postMessage($.extend(message, { id: 'yuki', target: 'extension' }), '*');
    },
  };

  CommController.listen();
})();
