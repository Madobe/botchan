(function() {
  "use strict";

  window.MainController = {
    received_welcome: false,
    database: false,

    is_inline: function(chat) {
      if(chat.attributes.isInlineAlert && chat.attributes.text.indexOf('has joined the chat.') != -1) return true;
      return false;
    },
  
    is_regular: function(chat) {
      if(mainRoom.isInitialized && chat.attributes.name != wgUserName && !chat.attributes.isInlineAlert) return true;
      return false;
    },

    get_authority(attributes) {
      var names = ['Nanamin', '川内', 'CDRW'];
      if(names.indexOf(attributes.name) != -1) return 3;
      else if(attributes.isCanGiveChatMod) return 2;
      else if(attributes.isModerator) return 1;
      else return 0;
    },

    strip_calls: function(chat) {
      // Remove the "bot-chan" from the front of the text
      var text = chat.attributes.text.split(' ');
      if(text[0].replace(/\W/gi, '').toLowerCase() == 'botchan') {
        text.shift();
        return text.join(' ');
      } else {
        return false;
      }
    },

    initialize_db: function() {
      this.database = new BotchanDatabase();
      this.database.reset();
    },

    respond: function(chat) {
      if(!MainController.database) MainController.initialize_db();
      if(chat.attributes.text == "Welcome to the Botchan Wikia chat" && chat.attributes.isInlineAlert) {
        MainController.received_welcome = true;
      } else if(MainController.received_welcome) {
        if(MainController.is_inline(chat)) {
          MainController.inline(chat);
        } else if(MainController.is_regular(chat)) {
          $.proxy(MainController.add_stars, mainRoom.viewDiscussion)(chat);
          MainController.regular(chat);
        }
      }
    },

    add_stars: function(chat) {
      var icon = '';
			for(var i in this.model.users.models) {
				if(this.model.users.models[i].attributes.name == chat.attributes.name) {
					if(this.model.users.models[i].attributes.isCanGiveChatMod) {
						icon = ' <img class="stafficon" src="http://img1.wikia.nocookie.net/__cb20150611191751/kancolle/images/5/58/Icon-admin.png">';
					} else if(this.model.users.models[i].attributes.isModerator) {
						icon = ' <img class="modicon" src="http://images2.wikia.nocookie.net/monchbox/images/6/6b/Icon-chatmod.png">';
					}
					break;
				}
			}
			if(icon) {this.chatUL.children().last().children('.username').html(this.chatUL.children().last().children('.username').html() + icon);}
    },

    inline: function(chat) {
    },

    regular: function(chat) {
      var command = this.database.search(chat.attributes.text);
      if(command) {
        if(command.type == "text") this.say(command.message);
        else if(command.type == "function") this.execute(command, chat);
      }
    },
    
    say: function(message) {
      var chatEntry = new models.ChatEntry({roomId: mainRoom.roomId, name: wgUserName, text: message});
      mainRoom.socket.send(chatEntry.xport());
    },

    execute: function(command, chat) {
      $.proxy(command.message, this)(chat);
    }
  };

  mainRoom.model.chats.bind('afteradd', $.proxy(MainController.respond, mainRoom.viewDiscussion));
})();
