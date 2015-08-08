/*
 * Logs Controller
 *
 * This controls the logging of the chat. It's adapted from Joeytje50's script, which was modified
 * by Spydar007 and with slight changes from Sloshedtrain.
 */

(function() {
  "use strict";

  window.LogsController = {
    init: function() {
      // Change to 600s for production
      TimerController.set_from_now($.proxy(this.process_logs, this), 600, 600);
    },

    to_utc_time: function(time) {
      time = time.split(':');
      var date = new Date();
      var offset = date.getTimezoneOffset() / 60;
      var hour = parseInt(time[0]);
      hour += offset;
      if(date.getUTCHours() - hour >= 12) hour += 12;
      return ('0' + hour).slice(-2) + ':' + ('0' + time[1]).slice(-2);
    },

    utc_date: function() {
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var date = new Date();
      return date.getUTCDate() + '_' + months[date.getUTCMonth()] + '_' + date.getUTCFullYear();
    },

    clear_window: function() {
      mainRoom.viewDiscussion.chatUL.html('');
    },

    send: function(data, method, callback) {
      data['format'] = 'json';
      $.ajax({
        data: data,
        dataType: 'json',
        url: wgScriptPath + '/api.php',
        type: method,
        success: function(response) {
          if(response.error) showError('API error: ' + response.error.info);
          else callback(response);
        },
        error: function(xhr, error) {
          console.log('AJAX error.');
          console.log(error);
        }
      });
    },

    process_logs: function() {
      var self = this;

      var entries = $('.Chat').find('.message').map(function() {
        return {
          user: $(this).parent().attr('data-user'),
          text: $(this).html(),
          time: $(this).parent().children('.time').text(),
        };
      });
      var wikilinks = new RegExp('<a href="' + wgServer + '/wiki/([^"]*)">([^<]*)</a>', 'g')

      // Perform replacements
      entries = entries.map(function() {
        return {
          user: this.user,
          text: this.text
            .replace(/( |  ){2,}/g, ' ') // Remove excess spaces
            .replace(/<img src="[^"]+".*?alt="([^"]+)"[^>]*>/g, '$1') // Tear out emoticons from their links
            .replace(wikilinks, function(match, page, title) { return '[[' + page.replace(/_/g, ' ') + '|' + title + ']]' }) // Aliased internal links
            .replace(/\[\[([^\]]*?) {2,}/g, '[[$1 ') // Internal links
            .replace(/\[\[([^|]*)\|\1]]/g, '[[$1]]') // More internal links
            .replace(/<a href="([^"]+)">[^<]*<\/a>/g, '$1') // Pulls links out of their tags
            .replace('[[' + wgServer + '/wiki/]]', wgServer + '/wiki/'), // Fix incorrect linking of base directory
          time: self.to_utc_time(this.time),
        };
      });

      this.format(entries);
    },

    format: function(entries) {
      var logs = '';
      for(var i = 0; i < entries.length; i++) {
        logs += '[' + entries[i].time + '] <' + entries[i].user + '> ' + entries[i].text + '\n';
      }
      this.update(logs);
    },

    update: function(logs) {
      var self = this;

      var date = this.utc_date();
      var data = {
        'action'      : 'query',
        'prop'        : 'info|revisions',
        'intoken'     : 'edit',
        'titles'      : 'Project:Chat/Logs/' + date,
        'rvprop'      : 'content',
        'rvlimit'     : '1',
        'indexpageids': 'true',
      };

      this.send(data, 'GET', function(response) {
        var page = response.query.pages[response.query.pageids[0]];
        var exists = response.query.pages['-1'] ? false : true;
        var content = typeof(page['revisions']) != 'undefined' ? page.revisions[0]['*'] : '';

        // If it exists, then we're sending the content + the logs back. Otherwise, just send the
        // logs and attach the category to it.
        if(exists) logs = content.replace('</pre>', logs + '</pre>');
        else logs = '<pre class="ChatLog">' + logs + '</pre>\n[[Category:Chat logs]]';

        var data = {
          'minor'        : 'no',
          'bot'          : 'yes',
          'summary'      : 'Updating chat logs.',
          'action'       : 'edit',
          'title'        : 'Project:Chat/Logs/' + date,
          'startimestamp': page.starttimestamp,
          'token'        : page.edittoken,
          'text'         : logs,
        };

        self.send(data, 'POST', function(response) {
          self.clear_window();
        });
      });
    },
  };

  LogsController.init();
})();
