(function() {
  "use strict";

  window.MainController = {
    received_welcome: false,
    database: false,
    cooldowns: {},
    game_cooldowns: {
      russian_roulette: 0,
      rps: 0,
    },
    flags: {
      rps: false,
    },
    rps_players: {
      all: [],
      rock: [],
      paper: [],
      scissors: [],
    },
    timers: {},
    epeen: {},
    links: [],
    silence: 0,
    explosions: ['Akios'],
    players: [],
    infobits: {},

    is_inline: function(chat) {
      if(chat.attributes.isInlineAlert && chat.attributes.text.indexOf('has joined the chat.') != -1) return true;
      return false;
    },
  
    is_regular: function(chat) {
      if(mainRoom.isInitialized && chat.attributes.name != wgUserName && !chat.attributes.isInlineAlert) return true;
      return false;
    },

    overweight: function(chat, weight) {
      if(this.get_authority(chat)) return false;
      if(this.cooldowns[chat.attributes.name] && this.cooldowns[chat.attributes.name].length + weight > 3) return true;
      else return false;
    },

    extract_name(text) {
      if(mainRoom.model.users.findByName(text) === undefined) {
        text = text.split('');
        text.pop();
        text = text.join('');
      }
      return text;
    },

    remove_trailing(text, remove) {
      if(text == undefined) return text;
      text = text.split('');
      while(text[0] == remove) { text.shift() }
      text.reverse();
      while(text[0] == remove) { text.shift() }
      return text.reverse().join('');
    },

    get_authority(chat) {
      var names = ['Nanamin', '川内', 'CDRW'];
      var user = mainRoom.model.users.findByName(chat.attributes.name);
      if(names.indexOf(chat.attributes.name) != -1) return 3;
      else if(user.attributes.isCanGiveChatMod) return 2;
      else if(user.attributes.isModerator) return 1;
      else return 0;
    },

    get_weight(chat) {
      if(this.cooldowns[chat.attributes.name]) {
        return this.cooldowns[chat.attributes.name].length;
      } else {
        this.cooldowns[chat.attributes.name] = [];
        return 0;
      }
    },

    add_weight(chat, weight) {
      if(!this.cooldowns[chat.attributes.name]) this.cooldowns[chat.attributes.name] = [];
      var time = new Date().getTime();
      for(var i = 0; i < weight; i++) {
        this.cooldowns[chat.attributes.name].push(time);
      }
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

    select_random_person: function() {
      var immune = ['Mikomotoko'];
      var users = mainRoom.model.users.models;
			do {
				var rand = Math.floor(Math.random() * users.length);
			} while(immune.indexOf(users[rand].attributes.name) != -1);
      return users[rand].attributes.name;
    },

    initialize_db: function() {
      this.database = new BotchanDatabase();
      this.database.reset();
    },

    respond: function(chat) {
      if(!this.database) this.initialize_db();
      if(chat.attributes.text == "Welcome to the Botchan Wikia chat" && chat.attributes.isInlineAlert) {
        this.received_welcome = true;
      } else if(this.received_welcome) {
        if(this.is_inline(chat)) {
          this.inline(chat);
        } else if(this.is_regular(chat)) {
          this.check_links(chat);
          this.check_explosions(chat);
          $.proxy(this.add_stars, mainRoom.viewDiscussion)(chat);

          chat.attributes.text = this.strip_calls(chat);
          if(chat.attributes.text) {
            this.regular(chat);
          }
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

    check_links: function(chat) {
      var regex = /.*(https?[^\s]+).*/gi;
      var match = regex.exec(chat.attributes.text);
      if(null != match) this.links.push(match[1]);
    },

    regular: function(chat) {
      var command = this.database.search(chat.attributes.text);
      if(command) {
        if(command.type == "text") {
          this.add_weight(chat, command.weight);
          this.say(command.message);
        } else if(command.type == "function") {
          $.proxy(command.execute, this)(command, chat);
        }
      } else {
        // Random responses
        var randomreplies = [
          'No.', 'Absolutely not.', 'Never.', 'You wish.',
          'Yes.', 'Definitely.', 'Absolutely.', 'Okay.',
          'Maybe.', 'I dunno.',
          'I can\'t tell you that right now.', 'Try asking again later.', '/me refrains from answering.',
          ':v', '<3', '(amagi)',
        ];
        if(!this.overweight(chat, 3)) {
          this.add_weight(chat, 3);
          var rand = Math.floor(Math.random() * randomreplies.length);
          this.say(randomreplies[rand]);
        }
      }
    },

    check_explosions: function(chat) {
      var keywords = {
        /*
        'Akaryuu-565': '\\(tenryuu\\)',
        'Koai': 'ayuzz',
        'Arkayda': '\\(yayoi\\)',
        'JustWastingTime': '\\(poi\\)',
        */
      }
      if(keywords[chat.attributes.name] && new RegExp(keywords[chat.attributes.name], 'gi').test(chat.attributes.text)) {
        for(var i = 0; i < 5; i++) {
          //var rand = Math.floor(Math.random() * this.explosions.length);
          //this.kick(this.explosions[rand]);
          this.kick(this.select_random_person());
        }
        this.kick(chat.attributes.name);
        this.say(chat.attributes.name + "'s explosion has claimed a few lives.");
      }
    },
    
    say: function(message) {
      var chatEntry = new models.ChatEntry({roomId: mainRoom.roomId, name: wgUserName, text: message});
      mainRoom.socket.send(chatEntry.xport());
    },

    kick: function(name) {
      name = this.extract_name(name);
      var kickCommand = new models.KickCommand({userToKick: name});
      mainRoom.socket.send(kickCommand.xport());
    },

    rps: function() {
      clearTimeout(this.timers['rps']);
      this.flags['rps'] = false;
      var hands = ['rock', 'paper', 'scissors'];
      var chosen = Math.floor(Math.random() * hands.length);
      var winner = (chosen + 1) % 3;
      if(this.rps_players[hands[winner]] && this.rps_players[hands[winner]].length == 0) {
        this.say("I chose " + hands[chosen] + "! Nobody won!");
      } else {
        this.say("I chose " + hands[chosen] + "! Winners: " + this.rps_players[hands[winner]].join(', ') + ". They gain +1 e-peen points!");
        for(var i = 0; i < this.rps_players[hands[winner]].length; i++) {
          if(!this.epeen[this.rps_players[hands[winner]][i]]) this.epeen[this.rps_players[hands[winner]][i]] = 1;
          else this.epeen[this.rps_players[hands[winner]][i]] += 1;
        }
      }
      this.rps_players = { all: [], rock: [], paper: [], scissors: [] };
      //this.game_cooldowns.rps = new Date().getTime() + 300000;
      this.game_cooldowns.rps = 0;
    },
  };

  mainRoom.model.chats.bind('afteradd', $.proxy(MainController.respond, MainController));
})();
