(function() {
  "use strict";

  window.BotchanDatabase = function() {
    this.entries = [];
  }

  BotchanDatabase.prototype.add = function(entry) {
    this.entries.push(entry);
    return this.entries.slice(-1)[0];
  }

  BotchanDatabase.prototype.add_text = function(trigger, weight, message) {
    this.add(new BotchanCommand("text", trigger, weight, message));
    return this.entries.slice(-1)[0];
  }

  BotchanDatabase.prototype.add_function = function(trigger, weight, message) {
    this.add(new BotchanCommand("function", trigger, weight, message));
    return this.entries.slice(-1)[0];
  }

  BotchanDatabase.prototype.add_redirect = function(trigger, redirect) {
    this.add(new BotchanCommand("redirect", trigger, 0, "", redirect));
  }

  BotchanDatabase.prototype.search = function(text) {
    for(var i = 0; i < this.entries.length; i++) {
      var command = this.entries[i];
      if(command.matches(text)) return this.get_executable(command);
    }
    return false;
  }

  BotchanDatabase.prototype.get_executable = function(command) {
    if(command.type == "redirect") return this.get_executable(command.redirect);
    else return command;
  }

  BotchanDatabase.prototype.reset = function() {
    // ======================================================================
    // == Text only
    // ======================================================================
    var redirect;

    this.entries = [];
    this.add_text('^test.$', 0, "Poi.");
    this.add_text('^$', 3, 'Yup?');
    this.add_text('^o$', 3, 'o7');
    this.add_text('^o7$', 3, 'o/');
    this.add_text('^\\^5.?$', 3, 'ヽ(。 ワ ﾟ)ノヽ( ﾟ ワ 。)ノ');
    this.add_text('^beep.?$', 3, 'Boop.');
    this.add_text('^boop.?$', 3, 'Beep.');
    this.add_text('^beep boop.?$', 3, 'Boop beep.');
    this.add_text('^boop beep.?$', 3, 'Beep boop.');
    this.add_text('^stupid question', 3, '(newsflash) READ THE FOCKIN\' WIKI!');
    this.add_text('^hi', 3, 'Hello.');
    this.add_text('^hello', 3, 'Hi.');
    redirect = this.add_text('^おはよう', 3, 'おはようございます！');
    this.add_redirect('^ohayou?', redirect);
    this.add_text('^good\\s?night', 3, 'Good night!');
    this.add_text('^bye.?bye', 3, 'Bye~!');
    this.add_text('^good.?bye', 3, 'さようなら〜');
    this.add_text('^question$', 3, 'No.');
    redirect = this.add_text('^may i ask a question', 3, 'Denied.');
    this.add_redirect('^can i ask a question', redirect);
    this.add_text('^what is life', 3, '42.');
    this.add_text('^what is love.?$', 3, 'Baby don\'t hurt me.');
    this.add_text('^(baby\\s)?don\'?t hurt me.?$', 3, 'NO MOAR.');
    this.add_text('^you suck', 3, 'Not as hard as you.');
    this.add_text('^give me luck', 3, 'You have lost 20 luck from asking for this. You must now attempt ALL-7 LSC within the next 24 hours.');
    this.add_text('^can i become chat\\s?mod.?$', 3, 'If you donate $5000 to Nanamin.');
    this.add_text('^fetch', 3, '/me grabs stick.');
    this.add_text('love me', 3, 'You haven\'t bought enough 700 yen rings.');
    this.add_text('^what version number', 3, 'v. Skynet.');

    this.add_text('^jwt.?$', 3, 'Kick it!');
    this.add_text('^cdrw.?$', 3, 'Daily reminder to CDRW to fire TheLenrir.');
    this.add_text('^af.?$', 3, 'http://img3.wikia.nocookie.net/__cb20150211023826/kancolle/images/a/a3/KCLcomic.jpg');
    redirect = this.add_text('^khorosho.?$', 3, 'хорошо.');
    this.add_redirect('^harasho.?$', redirect);
    this.add_text('^hoppou?.?$', 3, 'レップウ...オイテケ......');
    this.add_text('roma', 3, 'https://gyazo.com/6b5cc8aaf5158325d1052ff0187ea8c7');
    this.add_text('(?=.*\\becho\\b)(?=.*(\\bsakawa\\b|\\bpyan\\b))', 3, 'Hah! She won\'t be dropping.');

    this.add_text( '^dechi', 3, '(de ) (chi )');
    this.add_text('^nanodesu', 3, '(na) (no) (de) (su)');
    this.add_text('^nanodeath', 3, '(nanodesu)');

    this.add_text('^poi.?$', 1, 'http://anohito.tw/poi/');
    this.add_text('^naka', 1, 'https://www.youtube.com/watch?v=8l5cJBpTNQE');
    this.add_text('^yasen.?$', 1, 'https://www.youtube.com/watch?v=zvg7hHTnJVk');
    this.add_text('^kuma.?$', 1, 'https://www.youtube.com/watch?v=yxUpJnySeCQ');
    this.add_text('^shireee.?$', 1, 'https://www.youtube.com/watch?v=ocDB5zxSrgQ');
    this.add_text('^mogu\\s?mogu.?$', 1, 'http://www.myinstants.com/instant/mogu-mogu/');
    this.add_text('^deesu.?$', 1, 'https://www.youtube.com/watch?v=TtlrQKOeFM8');
    this.add_text('^anthem.?$', 1, 'https://www.youtube.com/watch?v=ocaq4c-YbwQ');
    redirect = this.add_text('^taigei.?$', 1, 'https://www.youtube.com/watch?v=VjdV-CSxyKc');
    this.add_redirect('^\\(?whale\\)?.?$', redirect);
    this.add_text('^unlimited (cat|error) works.?$', 1, 'http://i.imgur.com/Aa5nSof.jpg');

    redirect = this.add_text('^tweets.?$', 0, 'https://twitter.com/kancolle_staff');
    this.add_redirect('^twitter.?$', redirect);
    this.add_redirect('^(staff|dev)\\s(tweets|twitter).?$', redirect);
    this.add_text('^emoticon list.?$', 0, 'http://kancolle.wikia.com/wiki/MediaWiki:Emoticons');
    this.add_text('^kc3 kai.?$', 0, 'http://kancolle.wikia.com/wiki/User_blog:Dragonjet/KC3%E6%94%B9');
    this.add_text('^orel cruising', 1, 'https://www.youtube.com/watch?v=c1-TPCwXV8s');
    this.add_text('^lsc.?$', 1, 'https://www.youtube.com/watch?v=lw7IA1AEVVA');
    this.add_text('^help.?$', 0, 'Documentation on bot-chan\'s use is detailed [[User:KancolleChatlogger|here]].');
    this.add_text('^combat.?$', 0, 'http://kancolle.wikia.com/wiki/Combat');
    this.add_text('^aa.?$', 0, 'http://kancolle.wikia.com/wiki/Combat#Fleet_Anti-air_Defense');
    this.add_text('^los.?$', 0, 'http://kancolle.wikia.com/wiki/Line_of_Sight#Effective_Line_of_Sight_.28new_formula.29');
    this.add_text('^connect.?$', 0, 'http://kancolle.wikia.com/wiki/Tutorial:_Proxy_Connection');
    this.add_text('^news.?$', 0, 'http://kancolle.wikia.com/wiki/Recent_Updates');
    this.add_text('air\\s?calc', 0, 'https://a4b81641afe20619f5ed716627d72ef95dcd42d1-www.googledrive.com/host/0B37L_d6zeTfUS0puRTRFVml1czA/');
    this.add_text('los\\s?calc', 0, 'http://tsoft-web.com/sub/kancolle/2-5/');
    this.add_text('event guide', 0, 'http://kancolle.wikia.com/wiki/User_blog:Shinhwalee/Major_Event_Preparation_Guide_for_Admirals');
    this.add_text('^arsenal.?$', 0, 'http://kancolle.wikia.com/wiki/Akashi%27s_Improvement_Arsenal');
    this.add_text('^suggestion thread', 0, 'http://kancolle.wikia.com/wiki/Thread:233278');

    this.add_text('^1-5 guide', 0, 'http://kancolle.wikia.com/wiki/User_blog:Admiral_Mikado/Extra_Operations_for_Dummies:_1-5');
    this.add_text('^3-2 leveling', 0, 'http://kancolle.wikia.com/wiki/User_blog:Shinhwalee/Guide_to_Power_Leveling_Heavy_Cruiser_%28CA%29_in_World_3-2A');
    this.add_text('^4-3 leveling', 0, 'http://kancolle.wikia.com/wiki/User_blog:Shinhwalee/World_4-3_Power_Level_Guide_for_DD_%26_CL');

    this.add_text('as 1-1|1-1 as', 0, '[1-1] No AS values on this map');
    this.add_text('as 1-2|1-2 as', 0, '[1-2] No AS values on this map');
    this.add_text('as 1-3|1-3 as', 0, '[1-3] No AS values on this map');
    this.add_text('as 1-4|1-4 as', 0, '[1-4] PA:14, AS:30, AS+:60');
    this.add_text('as 1-5|1-5 as', 0, '[1-5] No AS values on this map');
    this.add_text('as 1-6|1-6 as', 0, '[1-6] South: PA:38, AS:83, AS+:165 / North: PA:88, AS:198, AS+:396 / Node L: PA:128, AS:288, AS+:576');
    this.add_text('as 2-1|2-1 as', 0, '[2-1] PA:19, AS:42, AS+:84');
    this.add_text('as 2-2|2-2 as', 0, '[2-2] PA:36, AS:81, AS+:162');
    this.add_text('as 2-3|2-3 as', 0, '[2-3] PA:25, AS:56, AS+:111');
    this.add_text('as 2-4|2-4 as', 0, '[2-4] PA:55, AS:123, AS+:246');
    this.add_text('as 2-5|2-5 as', 0, '[2-5] South Heavy Fleet: PA:68, AS:153, AS+:306 / South Light Fleet: PA:16, AS:35, AS+:69');
    this.add_text('as 3-1|3-1 as', 0, '[3-1] PA:48, AS:108, AS+:216');
    this.add_text('as 3-2|3-2 as', 0, '[3-2] PA:52, AS:117, AS+:234');
    this.add_text('as 3-3|3-3 as', 0, '[3-3] PA:53, AS:119, AS+:237');
    this.add_text('as 3-4|3-4 as', 0, '[3-4] PA:55, AS:123, AS+:246');
    this.add_text('as 3-5|3-5 as', 0, '[3-5] Hoppo: PA:148, AS:332, AS+:663 / Hoppo Final: PA:170, AS:381, AS+:762');
    this.add_text('as 4-1|4-1 as', 0, '[4-1] PA:32, AS:72, AS+:144');
    this.add_text('as 4-2|4-2 as', 0, '[4-2] PA:50, AS:113, AS+:225');
    this.add_text('as 4-3|4-3 as', 0, '[4-3] To Boss: PA:51, AS:114, AS+:228 / To SS Nodes: PA:32, AS:72, AS+:144');
    this.add_text('as 4-4|4-4 as', 0, '[4-4] PA:70, AS:156, AS+:312 / Princess: PA:68, AS:153, AS+:306');
    this.add_text('as 4-5|4-5 as', 0, '[4-5] South: PA:112, AS:252, AS+:504 / Boss: PA: 92, AS:207, AS+:414 / Final: PA:74, AS:166, AS+:332');
    this.add_text('as 5-1|5-1 as', 0, '[5-1] PA:70, AS:156, AS+:312');
    this.add_text('as 5-2|5-2 as', 0, '[5-2] Final / Cleared : PA:65, AS:146, AS+:291');
    this.add_text('as 5-3|5-3 as', 0, '[5-3] No AS values on this map');
    this.add_text('as 5-4|5-4 as', 0, '[5-4] North: PA:78, AS:174, AS+:348 / Center: PA:64, AS:144, AS+:288 / South: PA:51, AS:114, AS+:228');
    this.add_text('as 5-5|5-5 as', 0, '[5-5] Carrier Route: PA:158, AS:356, AS+:711 / Carrier R. Final: PA:168, AS:377, AS+:753');
    this.add_text('as 6-1|6-1 as', 0, '[6-1] PA:56, AS:126, AS+:252 / H Node: PA:120, AS:270, AS+:540');
    this.add_text('as 6-2|6-2 as', 0, '[6-2] H Node: PA:16, AS:35, AS+:69 / I Node: PA:68, AS:153, AS+:306 / Boss: PA:56, AS:126, AS+:252');

		this.add_text('^who\\sare\\syou', 3, 'Just your friendly neighborhood Bot-chan.');

    // ======================================================================
    // == Functions
    // ======================================================================
    this.add_function('^(who is|who\'?s) your (wife|waifu)', 3, function(input, name, authority) {
      var shiplist = ["Mutsuki", "Kisaragi", "Yayoi", "Uzuki", "Satsuki", "Fumizuki", "Nagatsuki", "Kikuzuki", "Mikazuki", "Mochizuki", "Fubuki", "Shirayuki", "Hatsuyuki", "Miyuki", "Murakumo", "Isonami", "Ayanami", "Shikinami", "Oboro", "Akebono", "Sazanami", "Ushio", "Akatsuki", "Hibiki/Верный", "Ikazuchi", "Inazuma", "Hatsuharu", "Nenohi", "Wakaba", "Hatsushimo", "Shiratsuyu", "Shigure", "Murasame", "Yuudachi", "Harusame", "Samidare", "Suzukaze", "Asashio", "Ooshio", "Michishio", "Arashio", "Yamagumo", "Asagumo", "Arare", "Kasumi", "Kagerou", "Shiranui", "Kuroshio", "Hatsukaze", "Yukikaze", "Amatsukaze", "Tokitsukaze", "Urakaze", "Isokaze", "Hamakaze", "Tanikaze", "Nowaki", "Maikaze", "Akigumo", "Yuugumo", "Makigumo", "Naganami", "Takanami", "Asashimo", "Hayashimo", "Kiyoshimo", "Akizuki", "Shimakaze", "Z1", "Z3", "Tenryuu", "Tatsuta", "Kuma", "Tama", "Kitakami", "Ooi", "Kiso", "Nagara", "Isuzu", "Yura", "Natori", "Kinu", "Abukuma", "Yuubari", "Sendai", "Jintsuu", "Naka", "Agano", "Noshiro", "Yahagi", "Sakawa", "Ooyodo", "Furutaka", "Kako", "Aoba", "Kinugasa", "Myoukou", "Nachi", "Ashigara", "Haguro", "Takao", "Atago", "Maya", "Choukai", "Prinz Eugen", "Mogami", "Mikuma", "Suzuya", "Tone", "Kongou", "Hiei", "Haruna", "Kirishima", "Nagato", "Mutsu", "Yamato", "Musashi", "Bismarck", "Littorio/Italia", "Roma", "Fusou", "Yamashiro", "Ise", "Houshou", "Ryuujou", "Ryuuhou", "Hiyou", "Jun'you", "Shouhou", "Zuihou", "Akagi", "Kaga", "Souryuu", "Hiryuu", "Shoukaku", "Zuikaku", "Taihou", "Unryuu", "Amagi", "Katsuragi", "I-168", "I-8", "I-19", "I-58", "I-401", "Maruyu", "U-511/Ro-500", "Chitose", "Chiyoda", "Akitsushima", "Taigei", "Akashi", "Katori", "Akitsu Maru"];
      var rand = Math.floor(Math.random() * shiplist.length);
      this.say(shiplist[rand] + ".");
    });
		
		this.add_function('(who is|who\'?s) my (wife|waifu)', 3, function(input, name, authority) {
			var shiplist = ['Tsu-Class Light Cruiser', 'Ri-Class Heavy Cruiser', 'Ne-Class Heavy Cruiser', 'Wo-chan', 'Ru-Class Battleship', 'Ta-Class Battleship', 'Re-Class Battleship', 'Armored Carrier Demon', 'Armored Carrier Princess', 'Anchorage Demon', 'Anchorage Princess', 'Southern Demon', 'Southern War Demon', 'Southern War Princess', 'Airfield Princess', 'Battleship Princess', 'Seaport-chan', 'Isolated Island Demon', 'Hoppou', 'Aircraft Carrier Demon', 'Midway Princess', 'Aircraft Carrier Princess', 'Destroyer Princess', 'Aircraft Carrier Water Demon', 'Light Cruiser Demon', 'Battleship Water Demon', 'Harbour Water Demon', 'Anchorage Water Demon'];
			if(name == 'TScript' || name == 'Epicureanpancake') shiplist = ['I-Class Destroyer'];
			if(name == 'Ebisuisei') shiplist = ['Anchorage Water Demon'];
			var rand = Math.floor(Math.random() * shiplist.length);
			this.say(shiplist[rand] + ".");
		});
		
		redirect = this.add_function('^pick', 2, function(input, name, authority) {
			var choices = input.split(' or ');
			var rand = Math.floor(Math.random() * choices.length);
			this.say(this.remove_trailing(choices[rand], '.') + '.');
		});
		this.add_redirect('^choose', redirect);
		
		redirect = this.add_function('^latest links', 3, function(input, name, authority) {
			var latest_links = this.links.slice(-5);
			this.say('Latest links (WARNING: May contain NSFW links):\n' + latest_links.join('\n'));
		});
		this.add_redirect('^recent links', redirect);
		
		this.add_function('^full links list', 1, function(input, name, authority) {
			if(mainRoom.model.privateUsers.findByName(name) == undefined) {
				var users = [name, wgUserName];
				$.ajax({
					type: 'POST',
					url: wgScript + '?action=ajax&rs=ChatAjax&method=getPrivateRoomID',
					data: {
						users: JSON.stringify(users)
					},
					success: $.proxy(function(data) {
						$().log("Attempting create private room with users " + users.join(','));
						var data = new models.OpenPrivateRoom({
							roomId: data.id,
							users: users
						});
						mainRoom.baseOpenPrivateRoom(data, true);
						mainRoom.showRoom(data.get('roomId'));
						mainRoom.chats.privates[data.get('roomId')].init();
						var chatEntry = new models.ChatEntry({roomId: data.get('roomId'), name: wgUserName, text: 'All links stored (WARNING: May contain NSFW links):\n' + this.links.all.join('\n')});
						mainRoom.chats.privates[data.get('roomId')].socket.send(chatEntry.xport());
					}, this)
				});
			} else {
				var privateRoomId = mainRoom.model.privateUsers.findByName(name).attributes.roomId;
				var chatEntry = new models.ChatEntry({roomId: privateRoomId, name: wgUserName, text: 'All links stored (WARNING: May contain NSFW links):\n' + this.links.all.join('\n')});
				mainRoom.chats.privates[privateRoomId].socket.send(chatEntry.xport());
			}
		});

		redirect = this.add_function('^kick me', 1, function(input, name, authority) {
			this.kick(name);
		});
		this.add_redirect('do you want to see my ship\\s?list', redirect);
		this.add_redirect('i\'?m kuso', redirect);
		this.add_redirect('^kill me', redirect);
		this.add_redirect('^sink me', redirect);
		this.add_redirect('^chat\\s?nuke', redirect);

		redirect = this.add_function('^kick', 0, function(input, name, authority) {
			if(authority) {
        var short = {'JWT': 'JustWastingTime', 'TS': 'TScript'};
        if(short[this.remove_trailing(input, '.')]) input = short[this.remove_trailing(input, '.')];
        input = this.extract_name(input);
        this.say('Get rekt!');
        this.kick(input);
      }
		});
		this.add_redirect('^sink', redirect);
		this.add_redirect('^terminate', redirect);
		this.add_redirect('^exterminate', redirect);
		this.add_redirect('^slap', redirect);
		this.add_redirect('^punch', redirect);
		this.add_redirect('^nuke', redirect);
		this.add_redirect('^rekt', redirect);
		this.add_redirect('^grate', redirect);
		this.add_redirect('^torpedo', redirect);
		this.add_redirect('^cut-in', redirect);
		
		this.add_function('^ban', 0, function(input, name, authority) {
			if(authority < 2) return true;
			input = input.split(' ');
			var time = 300;
			if(!isNaN(parseInt(input[0]))) time = parseInt(input.shift()) * 60;
			input = input.join(' ');
			var ban_name = this.remove_trailing(input, '.');
			banCommand = new models.BanCommand({userToBan: ban_name, time: time, reason: 'Bot-chan command ban by ' + name});
			mainRoom.socket.send(banCommand.xport());
		});
		
		this.add_function('^reset games', 0, function(input, name, authority) {
			if(authority == 3) {
				this.game_cooldowns = {};
        this.flags.rps = false;
        this.rps_players = { all: [], rock: [], paper: [], scissors: [] };
        this.timers = {};
				this.say('Game cooldowns reset!');
			}
		});
		
		redirect = this.add_function('^reset all', 0, function(input, name, authority) {
			if(authority == 3) {
				this.cooldowns = [];
				this.say('All cooldowns reset!');
			}
		});
		this.add_redirect('^reset cooldowns', redirect);
		
		this.add_function('^reset', 0, function(input, name, authority) {
			if(authority == 3) {
				this.cooldowns[this.remove_trailing(input, '.')] = [];
				this.say('Cooldowns reset for ' + this.remove_trailing(input, '.') + '!');
			}
		});
		
		this.add_function('^silence left', 0, function(input, name, authority) {
      if(authority) {
        if(!this.silence) this.silence = 0;
        this.say(parseInt((this.silence - new Date().getTime()) / 60000) + ' minutes remaining.');
      }
		});
		
		this.add_function('^silence', 0, function(input, name, authority) {
			if(authority) {
				this.silence = new Date().getTime() + (parseInt(input) * 60000);
			}
		});
		
		this.add_function('^add explosion', 0, function(input, name, authority) {
			if(authority) {
				input = this.remove_trailing(input.substr(10), '.');
				this.explosions.push(input.toString());
				this.say(input + ' has been added to the list of explosion targets!');
			}
		});
		
		this.add_function('^remove explosion', 0, function(input, name, authority) {
			if(authority) {
				input = this.remove_trailing(input.substr(10), '.');
				var index = this.explosions.indexOf(input);
				if(input == 'Akios') {
					this.say('Akios can\'t be removed from the list.');
				} else if(index != -1) {
					this.explosions.splice(index, 1);
					this.say(input + ' has been removed from the list of explosion targets!');
				} else {
					this.say(input + ' wasn\'t in the list!');
				}
			}
		});
		
		this.add_function('^list explosion', 0, function(input, name, authority) {
			if(authority) {
				this.say('Current possible targets: ' + this.explosions.join(', '));
			}
		});
		
		this.add_function('^clear explosion', 0, function(input, name, authority) {
			if(authority) {
				this.explosions = ['Akios'];
				this.say('Explosion list reset!');
			}
		});
		
		this.add_function('^i (wanna|want to) play', 2, function(input, name, authority) {
			if(this.players.indexOf(name) != -1) {
				this.say('You already registered, ' + name + '.');
			} else {
				this.players.push(name);
				this.say(name + ' has registered to play!');
			}
		});
		
		this.add_function('^i quit', 0, function(input, name, authority) {
			var index = this.players.indexOf(name);
			if(index != -1) {
				this.players.splice(index, 1);
				this.say(name + ' has quit!');
			} else {
				this.say(name + ', you were never playing!');
			}
		});
		
		this.add_function('^russian roulette', 0, function(input, name, authority) {
			if(this.players.length < 2) {
				this.say('We need at least two people.');
			} else {
				var rand = Math.floor(Math.random() * this.players.length);
				var loser = this.players[rand];
				this.kick(loser);
				if(loser != name) {
					if(!this.cooldowns[loser]) this.cooldowns[loser] = [];
					for(var i = 0; i < 2; i++) {
						this.cooldowns[loser].push(new Date().getTime() + 15 * 60000);
					}
				}
				if(!this.cooldowns[name]) this.cooldowns[name] = [];
				for(var i = 0; i < 2; i++) {
					this.cooldowns[name].push(new Date().getTime() + 15 * 60000);
				}
				this.players.splice(rand, 1);
			}
		});
		
		this.add_function('^reverse roulette', 0, function(input, name, authority) {
			if(!this.game_cooldowns.russian_roulette) this.game_cooldowns.russian_roulette = 0;
			if(this.game_cooldowns.russian_roulette - new Date().getTime() > 0) return true;
			if(this.players.indexOf(name) == -1) return true;
			
			if(this.players.length < 2) {
				this.say('We need at least two people.');
			} else {
				while(this.players.length > 1) {
					var rand = Math.floor(Math.random() * this.players.length);
					this.kick(this.players[rand]);
					this.players.splice(rand, 1);
				}
				var winner = this.players.pop();
				this.cooldowns[winner] = [];
				this.say(winner + ' is the winner! Their cooldowns have been reset and they have been awarded 1 e-peen point!');
        if(!this.epeen[winner]) this.epeen[winner] = 1;
        else this.epeen[winner] += 1;
				this.game_cooldowns.russian_roulette = new Date().getTime() + 15 * 60000;
			}
		});
		
		this.add_function('^rps', 0, function(input, name, authority) {
			if(this.game_cooldowns.rps - new Date().getTime() > 0) return true;
			if(this.flags['rps']) return true;
			
			this.say('Rock, Paper, Scissors is starting! Say "rock", "paper", or "scissors" to me to play!');
			this.flags['rps'] = true;
			this.timers['rps'] = setTimeout($.proxy(this.rps, this), 20000);
		});

    this.add_function('^end rps', 0, function(input, name, authority) {
      if(authority) MainController.rps();
    });
		
		this.add_function('rock', 0, function(input, name, authority) {
			if(!this.flags['rps'] || this.rps_players.all.indexOf(name) != -1) return true;
      this.rps_players['all'].push(name);
			this.rps_players['rock'].push(name);
		});
		
		this.add_function('paper', 0, function(input, name, authority) {
			if(!this.flags['rps'] || this.rps_players.all.indexOf(name) != -1) return true;
      this.rps_players['all'].push(name);
			this.rps_players['paper'].push(name);
		});
		
		this.add_function('scissors', 0, function(input, name, authority) {
			if(!this.flags['rps'] || this.rps_players.all.indexOf(name) != -1) return true;
      this.rps_players['all'].push(name);
			this.rps_players['scissors'].push(name);
		});

    this.add_function('^my e-peen', 1, function(input, name, authority) {
      var epeen = this.epeen[name] || 0;
      this.say("Your e-peen is " + epeen + " falukorv long!");
    });
		
		this.add_function('(who\'?s|who is) playing', 1, function(input, name, authority) {
			if(this.players.length > 0) {
				this.say('Players: ' + this.players.join(', '));
			} else {
				this.say('Nobody is playing at the moment.');
			}
		});
		
		this.add_function('^who am i', 3, function(input, name, authority) {
			this.say(name + '.');
		});
		
		this.add_function('^who', 2, function(input, name, authority) {
			this.say(this.select_random_person() + '.');
		});
		
		this.add_function('^register', 0, function(input, name, authority) {
			input = input.split(' = ');
			this.infobits[input[0]] = this.remove_trailing(input[1], '.');
			this.say('"' + input[0] + '" has been registered with value "' + input[1] + '".');
		});
		
		this.add_function('^recall', 0, function(input, name, authority) {
			input = this.remove_trailing(input, '.');
			if(this.infobits[input] != undefined) {
				this.say(input + ': ' + this.infobits[input] + '.');
			}
		});

    redirect = this.add_function('^chat\\s?nuke', 0, function(input, name, authority) {
      if(authority >= 2) {
        var users = mainRoom.model.users.models;
        for(var i = 0; i < users.length; i++) {
          this.kick(users[i].attributes.name);
        }
        this.say("Feel the power of Skynet!!");
      }
    });
    this.add_redirect('^judgment day', redirect);

    this.add_function('^fortune.?$', 3, function(input, name, authority) {
      var fortunes = [
        "Compass-chan will take you for a ride ride ride~",
        "A lot of (salt) is in your future.",
        "You will have BEAVER LEVELS of luck.",
        "That BW2 quest of yours will take 50 more sorties.",
        "*Attaches falukorv magnet on your back*",
        "Beware of Ru, she's related to Re.",
        "Warning (CATDIVE) is imminent.",
        "You are Hoss' most likely next (HAMMER) victim.",
        "You are now registered for Rise's explosion list. (ARA) Have a good day!",
        "You will get a (TAIHA) first node, next sortie :v",
        "You will have two level 1s and four 99s in your pvp list next reset.",
        "RNG will almost be nice to you, you will redirect away from boss node.",
        "YOU ARE NOW ROMA-CURSED with whatever ship you -truly- want.",
        "(falukorv)",
        "Oscar will let you through.",
        "(YASEN) BEST SENDAI!",
        "Poi?",
        "FUSOU will visit your next 3 LSCs (Go visit Yuuka's page to negate this)!",
        "You might one-shot your next LSC target.",
        "You will KUSO next event. LSC 7/7/7/7 100 to avoid this.",
        "A Nagamon will come for your best DDs.",
        "You will get Akbar'd unless you give Nanamin your soul.",
        "Swear at Akios to have some of his luck.",
      ];
      var rand = Math.floor(Math.random() * fortunes.length);
      this.say(fortunes[rand]);
    });
	};
})();
