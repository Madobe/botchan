/*
 * Main Controller
 * 
 * The main controller is meant to handle the incoming chat messages and make the calls which pass
 * off the call to another object which will then do the specific handling. It also holds most of
 * the runtime variables as properties.
 */

(function() {
  "use strict";

  window.MainController = {
    received_welcome: false,
    database: false,
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
    players: [],
    all_powerful: ['Nanamin', '川内', 'CDRW', 'Admiral Mikado'],
    immune: ['Mikomotoko', 'Hossinator', 'Ebisuisei'],

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
      if(DataController.cooldowns[chat.attributes.name] && DataController.cooldowns[chat.attributes.name].length + weight > 3) return true;
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

    remove_first_word(text) {
      text = text.split(' ');
      text.shift();
      return this.remove_trailing(text.join(' '), '.').toString();
    },

    get_authority(chat) {
      var user = mainRoom.model.users.findByName(chat.attributes.name);
      if(user == undefined) return 0;
      if(this.all_powerful.indexOf(chat.attributes.name) != -1) return ConstantsController.ACCESS_ALL;
      else if(user.attributes.isCanGiveChatMod) return ConstantsController.ACCESS_ADMIN;
      else if(user.attributes.isModerator) return ConstantsController.ACCESS_MODERATOR;
      else return ConstantsController.ACCESS_NORMAL;
    },

    get_weight(chat) {
      if(DataController.cooldowns[chat.attributes.name]) {
        return DataController.cooldowns[chat.attributes.name].length;
      } else {
        DataController.cooldowns[chat.attributes.name] = [];
        return 0;
      }
    },

    add_weight(chat, weight) {
      if(!DataController.cooldowns[chat.attributes.name]) DataController.cooldowns[chat.attributes.name] = [];
      var time = new Date().getTime();
      for(var i = 0; i < weight; i++) {
        DataController.cooldowns[chat.attributes.name].push(time);
      }
    },

    mode_check(chat, trigger) {
      if(ConfigController.mode == ConstantsController.MODE_EVENT) {
        if(this.get_authority(chat) >= ConstantsController.ACCESS_ADMIN) return true;
        else if(ConstantsController.EVENT_COMMAND_WHITELIST.indexOf(trigger) != -1) return true;
        else return false;
      } else if(ConfigController.mode == ConstantsController.MODE_OFF) {
        if(this.get_authority(chat) == ConstantsController.ACCESS_ALL) return true;
        else return false;
      } else {
        return true;
      }
    },

    strip_calls: function(chat) {
      // Remove the "bot-chan" from the front of the text
      var text = chat.attributes.text.split(' ');
      var plain_text = text[0].replace(/\W/gi, '').toLowerCase();
      if(plain_text == 'botchan' || plain_text == 'yuki') {
        text.shift();
        return text.join(' ');
      } else {
        return false;
      }
    },

    select_random_person: function() {
      var users = mainRoom.model.users.models;
			do {
				var rand = Math.floor(Math.random() * users.length);
			} while(this.immune.indexOf(users[rand].attributes.name) != -1);
      return users[rand].attributes.name;
    },

    initialize_db: function() {
      this.database = new BotchanDatabase();
      this.database.reset();
    },

    respond: function(chat) {
      if(!this.database) this.initialize_db();
      if(chat.attributes.text.indexOf("Welcome") != -1 && chat.attributes.isInlineAlert) {
        this.received_welcome = true;
      } else if(this.received_welcome) {
        if(this.is_inline(chat)) {
          this.inline(chat);
        } else if(this.is_regular(chat)) {
          this.check_links(chat);
          this.check_suicides(chat);
          this.check_explosions(chat);
          $.proxy(this.add_stars, mainRoom.viewDiscussion)(chat);

          chat.attributes.text = this.strip_calls(chat);
          if(chat.attributes.text || chat.attributes.text === '') {
            if(this.mode_check(chat, '^help.?$')) {
              this.regular(chat);
            }
          }
        }
      }
    },

    add_stars: function(chat) {
      var icon = '';
			for(var i in this.model.users.models) {
				if(this.model.users.models[i].attributes.name == chat.attributes.name) {
					if(this.model.users.models[i].attributes.isCanGiveChatMod) {
						icon = ConfigController.admin_icon;
					} else if(this.model.users.models[i].attributes.isModerator) {
						icon = ConfigController.mod_icon;
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
      if(null != match) DataController.links.push(match[1]);
    },

    regular: function(chat) {
      var command = this.database.search(chat.attributes.text);
      if(command) {
        if(command.type == "text") {
          if(!this.mode_check(chat, command.trigger)) return true;
          this.add_weight(chat, command.weight);
          this.say(command.message);
        } else if(command.type == "function") {
          $.proxy(command.execute, this)(command, chat);
        }
      } else {
        // Random responses
        if(!this.overweight(chat, 3)) {
          if(!this.mode_check(chat, 'N/A')) return true;
          this.add_weight(chat, 3);
          var replies = PersonalityController.get_line('randoms');
          var rand = Math.floor(Math.random() * replies.length);
          this.say(replies[rand]);
        }
      }
    },

    check_suicides: function(chat) {
      var keywords = {
        'TScript': 'suicide',
        'TScript': 'escape',
        'Epicureanpancake': 'suicide',
        'JustWastingTime': 'sudoku',
        'McDerp': 'riot',
        'Shizen144': 'futa',
        'Sylcion': 'fukou',
        'Chezbitsu': 'for the glory of falukorv',
        'Dnite77': ' kuma ',
        'Risemiria': 'explodes',
        'Erupi': 'kamo',
        'Kololz': 'nachi',
        'Leoverda': 'blood',
      };
      if(keywords[chat.attributes.name] && new RegExp(keywords[chat.attributes.name], 'gi').test(chat.attributes.text)) {
        this.kick(chat.attributes.name);
      }
    },

    check_explosions: function(chat) {
      var keywords = {
        'Risemiria': 'explodes',
        /*
        'Akaryuu-565': '\\(tenryuu\\)',
        'Koai': 'ayuzz',
        'Arkayda': '\\(yayoi\\)',
        'JustWastingTime': '\\(poi\\)',
        */
      };
      if(keywords[chat.attributes.name] && new RegExp(keywords[chat.attributes.name], 'gi').test(chat.attributes.text)) {
        for(var i = 0; i < 5; i++) {
          var rand = Math.floor(Math.random() * DataController.explosions.length);
          this.kick(DataController.explosions[rand]);
        }
        this.say(chat.attributes.name + "'s explosion has claimed a few lives.");
        this.kick(chat.attributes.name);
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
      var hands = ['rock', 'paper', 'scissors', 'rock', 'paper', 'scissors', 'rock', 'paper', 'scissors', 'rock', 'paper', 'scissors', 'rock', 'paper', 'scissors', 'rock', 'paper', 'scissors', 'rock', 'paper', 'scissors', 'rock', 'paper', 'scissors', 'rock', 'paper', 'scissors', 'rock', 'paper', 'scissors'];
      var chosen = Math.floor(Math.random() * hands.length);
      var winner = hands[(chosen + 1) % 30];
      var loser = hands[(chosen + 2) % 30];
      chosen = hands[chosen];
      if(this.rps_players[winner] && this.rps_players[winner].length == 0) {
        this.say("I chose " + chosen + "! Nobody won!");
      } else {
        this.say("I chose " + chosen + "! Winners: " + this.rps_players[winner].join(', ') + ". They gain " + ConfigController.rps_win_points + " e-peen point!");
        for(var i = 0; i < this.rps_players[winner].length; i++) {
          var username = this.rps_players[winner][i];
          DataController.epeen[username] = (DataController.epeen[username] || 0) + ConfigController.rps_win_points;
        }
      }
      if(this.rps_players[loser] && this.rps_players[loser].length == 0) {
        this.say("No losers this round!");
      } else {
        this.say("The losers are: " + this.rps_players[loser].join(', ') + ". They lose " + ConfigController.rps_lose_points + " e-peen point!");
        for(var i = 0; i < this.rps_players[loser].length; i++) {
          var username = this.rps_players[loser][i];
          DataController.epeen[username] = (DataController.epeen[username] || 0) - ConfigController.rps_lose_points;
        }
      }
      this.rps_players = { all: [], rock: [], paper: [], scissors: [] };
      DataController.game_cooldowns.rps = new Date().getTime() + ConfigController.rps_cooldown;
    },
  };

  mainRoom.model.chats.bind('afteradd', $.proxy(MainController.respond, MainController));
})();
