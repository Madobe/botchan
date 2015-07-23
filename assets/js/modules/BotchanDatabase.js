(function() {
  "use strict";

  window.BotchanDatabase = function() {
    this.entries = [];
  }

  BotchanDatabase.prototype.add = function(entry) {
    this.entries.push(entry);
  }

  BotchanDatabase.prototype.add_text = function(trigger, weight, message) {
    this.entries.push(new BotchanCommand("text", trigger, weight, message));
  }

  BotchanDatabase.prototype.add_function = function(trigger, weight, message) {
    this.entries.push(new BotchanCommand("function", trigger, weight, message));
  }

  BotchanDatabase.prototype.add_redirect = function(trigger, redirect) {
    this.entries.push(new BotchanCommand("redirect", trigger, 0, "", redirect));
  }

  BotchanDatabase.prototype.search = function(text) {
    for(var i = 0; i < this.entries.length; i++) {
      var command = this.entries[i];
      if(command.matches(text)) return this.get_executable(command);
    }
    return false;
  }

  BotchanDatabase.prototype.get_executable = function(command) {
    if(command.type == "redirect") this.get_executable(command.redirect);
    else return command;
  }

  BotchanDatabase.prototype.reset = function() {
    this.entries = [];
    this.add_text("^test.$", 0, "Poi.");
    this.add_function("^(who is|who\'?s) your (wife|waifu)", 3, function(input, name, authority) {
      var shiplist = ["Mutsuki", "Kisaragi", "Yayoi", "Uzuki", "Satsuki", "Fumizuki", "Nagatsuki", "Kikuzuki", "Mikazuki", "Mochizuki", "Fubuki", "Shirayuki", "Hatsuyuki", "Miyuki", "Murakumo", "Isonami", "Ayanami", "Shikinami", "Oboro", "Akebono", "Sazanami", "Ushio", "Akatsuki", "Hibiki/Верный", "Ikazuchi", "Inazuma", "Hatsuharu", "Nenohi", "Wakaba", "Hatsushimo", "Shiratsuyu", "Shigure", "Murasame", "Yuudachi", "Harusame", "Samidare", "Suzukaze", "Asashio", "Ooshio", "Michishio", "Arashio", "Yamagumo", "Asagumo", "Arare", "Kasumi", "Kagerou", "Shiranui", "Kuroshio", "Hatsukaze", "Yukikaze", "Amatsukaze", "Tokitsukaze", "Urakaze", "Isokaze", "Hamakaze", "Tanikaze", "Nowaki", "Maikaze", "Akigumo", "Yuugumo", "Makigumo", "Naganami", "Takanami", "Asashimo", "Hayashimo", "Kiyoshimo", "Akizuki", "Shimakaze", "Z1", "Z3", "Tenryuu", "Tatsuta", "Kuma", "Tama", "Kitakami", "Ooi", "Kiso", "Nagara", "Isuzu", "Yura", "Natori", "Kinu", "Abukuma", "Yuubari", "Sendai", "Jintsuu", "Naka", "Agano", "Noshiro", "Yahagi", "Sakawa", "Ooyodo", "Furutaka", "Kako", "Aoba", "Kinugasa", "Myoukou", "Nachi", "Ashigara", "Haguro", "Takao", "Atago", "Maya", "Choukai", "Prinz Eugen", "Mogami", "Mikuma", "Suzuya", "Tone", "Kongou", "Hiei", "Haruna", "Kirishima", "Nagato", "Mutsu", "Yamato", "Musashi", "Bismarck", "Littorio/Italia", "Roma", "Fusou", "Yamashiro", "Ise", "Houshou", "Ryuujou", "Ryuuhou", "Hiyou", "Jun'you", "Shouhou", "Zuihou", "Akagi", "Kaga", "Souryuu", "Hiryuu", "Shoukaku", "Zuikaku", "Taihou", "Unryuu", "Amagi", "Katsuragi", "I-168", "I-8", "I-19", "I-58", "I-401", "Maruyu", "U-511/Ro-500", "Chitose", "Chiyoda", "Akitsushima", "Taigei", "Akashi", "Katori", "Akitsu Maru"];
      var rand = Math.floor(Math.random() * shiplist.length);
      this.say(shiplist[rand] + ".");
    });
  }
})();
