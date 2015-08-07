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
  window.DevtoolsManager = {
    init: function() {
      var self = this;

      this.connection = chrome.runtime.connect({ name: 'init' });

      this.connection.onMessage.addListener(function(message) {
        if(message.action == 'config') {
          $.extend(ConfigController, message.contents);
          self.create_form(message.contents, 'Configuration Variables', 'update_config');
        } else if(message.action = 'data') {
          $.extend(DataController, message.contents);
          self.create_form(message.contents, 'Saved Data', 'update_data');
        }
      });
    },

    send: function(message) {
      this.connection.postMessage(message);
    },

    update_config: function(message) {
      this.send($.extend(message, { action: 'update_config' }));
    },

    update_data: function(message) {
      this.send($.extend(message, { action: 'update_data' }));
    },

    create_form: function(contents, header, action) {
      var container = $('#templates .container').clone().appendTo('#wrapper');
      $('h3', container).text(header);
      var keys = Object.keys(contents);
      for(var i = 0; i < keys.length; i++) {
        if(typeof contents[keys[i]] == 'object') {
          this.create_array_field(container, keys[i], contents[keys[i]], action);
        } else {
          this.create_text_field(container, keys[i], contents[keys[i]], action);
        }
      }
    },

    create_text_field: function(container, field, value, action) {
      $('form', container).append('<label class="regular_label">' + field + '</label><br />');
      $('form', container).append(
        $('<input/>')
        .attr('type', 'text')
        .addClass('text_box')
        .val(value || 'N/A')
        .on('change', function() {
          DevtoolsManager.send({ field: field, value: $(this).val(), action: action });
        })
      );
      $('form', container).append('<br />');
    },

    create_array_field: function(container, field, array, action) {
      $('form', container).append('<label class="regular_label">' + field + '</label><br />');
      var keys = Object.keys(array);
      for(var i = 0; i < keys.length; i++) {
        $('form', container).append('<label class="array_label">' + keys[i] + '</label>');
        $('form', container).append(
          $('<input/>')
          .attr('type', 'text')
          .addClass('array_text_box')
          .addClass(field + '_array')
          .val(array[keys[i]] || 'N/A')
          .on('change', function() {
            var value = $(this).parent().children('.' + field + '_array').map(function() {
              return $(this).val();
            }).get();
            DevtoolsManager.send({ field: field, value: value, action: action });
          })
        );
        $('form', container).append('<div class="clear"></div>');
      }
    },
  };

  DevtoolsManager.init();
  DevtoolsManager.send({ action: 'config' });
  DevtoolsManager.send({ action: 'data' });
})();
