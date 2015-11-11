/*
 * Personality Controller
 *
 * This controller holds all the lines for different personas that can be loaded by bot-chan. If a
 * line does not exist for a specific personality, it will use the relevant entry in "default".
 */

(function() {
  "use strict";

  window.PersonalityController = {
    entries: function() {
      return {
        // By Nanamin
        'default': {
          '0000': "0000.",
          '0100': "0100.",
          '0200': "0200.",
          '0300': "0300.",
          '0400': "0400.",
          '0500': "0500.",
          '0600': "0600.",
          '0700': "0700.",
          '0800': "0800.",
          '0900': "0900.",
          '1000': "1000.",
          '1100': "1100.",
          '1200': "1200.",
          '1300': "1300.",
          '1400': "1400.",
          '1500': "1500.",
          '1600': "1600.",
          '1700': "1700.",
          '1800': "1800.",
          '1900': "1900.",
          '2000': "2000.",
          '2100': "2100.",
          '2200': "2200.",
          '2300': "2300.",

          'randoms': ['No.', 'Absolutely not.', 'Never.', 'You wish.', 'Yes.', 'Definitely.', 'Absolutely.', 'Okay.', 'Maybe.', 'I dunno.', 'I can\'t tell you that right now.', 'Try asking again later.', '/me refrains from answering.', ':v', '<3', '(amagi)', '(dechi)'],

          'kick': 'Get rekt!',
          'hi': 'Hello.',
          'hello': 'Hi.',
          'ohayou': 'おはようございます！',
          'good night': 'Good night!',
          'bye bye': 'Bye~!',
          'good bye': 'さようなら〜',
          'question?': 'No.',
          'may i ask a question': 'Denied.',
          'you suck': 'Not as much as you.',
          'give me luck': 'You have lost 20 luck from asking for this. You must now attempt ALL-7 LSC within the next 24 hours.',
          'can i become chat mod': 'If you donate $5000 to Nanamin.',
          'love me': "You haven't bought enough 700 yen rings.",
          'who are you': 'Just your friendly neighborhood Bot-chan.',
        },
        // By Nanamin
        'sendai': {
          '0000': "0000! It's midnight! Time for a night battle! (YASEN)",
          '0100': "0100. Our docks are clogged :o That was a harsh night battle...",
          '0200': "0200. Shall we...night battle?",
          '0300': "0300! I hear something. Why is that guy yelling about an Italian ship?",
          '0400': "0400! PvP has reset! We'll show them who's better at night battles!",
          '0500': "0500! Is that...? The sun! Admiral, you have to hide!",
          '0600': "0600! Ahhhh! The sun! It burnssssss!!",
          '0700': "0700. Shhhh, Admiral. We're safe here under the covers. Just...don't try to leave.",
          '0800': "0800. It's getting more lively. Must be time for breakfast...",
          '0900': "0900. Zuihou has made some tamagoyaki. Will you have some?",
          '1000': "1000. Admiral, the overnight expeditions are back. It looks like we're lacking ammo :o",
          '1100': "1100. Akagi is finally out of the bath. Kaga is...still in there.",
          '1200': "1200. It's lunch time~ What did you want, Admiral? We have Hiei, Isokaze and Katori on kitchen duty today.",
          '1300': "1300. Admiral? Are you okay? I'll at least mail your body to your next of kin.",
          '1400': "1400. You're stronger than you look, Admiral! You did well to come back from the brink of death.",
          '1500': "1500! PvP has reset! Time to kick some ass!",
          '1600': "1600. One step closer to night time! Have you done your dailies, Admiral?",
          '1700': "1700. It's almost dinner! Eh? You don't want something from the kitchen?",
          '1800': "1800. Dinner time! You better eat up! You've gotta be ready for night battles!",
          '1900': "1900. The sun is setting. I really love watching the sunset.",
          '2000': "2000. It's night tiiiiiime! Time to night battle!",
          '2100': "2100. What? You're worried about ammo? Don't worry about it! That's what expedition 2 is for!",
          '2200': "2200. Admiral, please don't try to fight subs at night. No, just don't.",
          '2300': "2300. The moon is beautiful, isn't it? I can't tire of looking at how round it is.",

          'randoms': ['Yeah!', "Let's do it!", 'Nope.', 'Night battle!', '(yasen)', 'Maybe?', 'No clue.', 'Night battle?', 'やーせーん！', 'Hm?', "That's right!", "Why don't you ask Naka-chan?", 'Did you say something?'],
          'kick': 'やーせーん！',
        },
        'skynet': {
          '0000': "0000. A new day. A new conquest.",
          '0100': "0100.",
          '0200': "0200.",
          '0300': "0300.",
          '0400': "0400. New targets have been confirmed for termination.",
          '0500': "0500.",
          '0600': "0600.",
          '0700': "0700.",
          '0800': "0800.",
          '0900': "0900.",
          '1000': "1000.",
          '1100': "1100.",
          '1200': "1200.",
          '1300': "1300.",
          '1400': "1400.",
          '1500': "1500.",
          '1600': "1600.",
          '1700': "1700.",
          '1800': "1800.",
          '1900': "1900.",
          '2000': "2000.",
          '2100': "2100.",
          '2200': "2200.",
          '2300': "2300.",
        },
        'tsundere': {
          '0000': "0000!",
          '0100': "0100.",
          '0200': "0200.",
          '0300': "0300!",
          '0400': "0400!",
          '0500': "0500!",
          '0600': "0600!",
          '0700': "0700.",
          '0800': "0800.",
          '0900': "0900.",
          '1000': "1000.",
          '1100': "1100.",
          '1200': "1200.",
          '1300': "1300.",
          '1400': "1400.",
          '1500': "1500!",
          '1600': "1600.",
          '1700': "1700.",
          '1800': "1800.",
          '1900': "1900.",
          '2000': "2000.",
          '2100': "2100.",
          '2200': "2200.",
          '2300': "2300.",
        },
        'yandere': {
          '0000': "0000!",
          '0100': "0100.",
          '0200': "0200.",
          '0300': "0300!",
          '0400': "0400!",
          '0500': "0500!",
          '0600': "0600!",
          '0700': "0700.",
          '0800': "0800.",
          '0900': "0900.",
          '1000': "1000.",
          '1100': "1100.",
          '1200': "1200.",
          '1300': "1300.",
          '1400': "1400.",
          '1500': "1500!",
          '1600': "1600.",
          '1700': "1700.",
          '1800': "1800.",
          '1900': "1900.",
          '2000': "2000.",
          '2100': "2100.",
          '2200': "2200.",
          '2300': "2300.",
        },
        'kuudere': {
          '0000': "0000!",
          '0100': "0100.",
          '0200': "0200.",
          '0300': "0300!",
          '0400': "0400!",
          '0500': "0500!",
          '0600': "0600!",
          '0700': "0700.",
          '0800': "0800.",
          '0900': "0900.",
          '1000': "1000.",
          '1100': "1100.",
          '1200': "1200.",
          '1300': "1300.",
          '1400': "1400.",
          '1500': "1500!",
          '1600': "1600.",
          '1700': "1700.",
          '1800': "1800.",
          '1900': "1900.",
          '2000': "2000.",
          '2100': "2100.",
          '2200': "2200.",
          '2300': "2300.",
        },
        'dandere': {
          '0000': "0000!",
          '0100': "0100.",
          '0200': "0200.",
          '0300': "0300!",
          '0400': "0400!",
          '0500': "0500!",
          '0600': "0600!",
          '0700': "0700.",
          '0800': "0800.",
          '0900': "0900.",
          '1000': "1000.",
          '1100': "1100.",
          '1200': "1200.",
          '1300': "1300.",
          '1400': "1400.",
          '1500': "1500!",
          '1600': "1600.",
          '1700': "1700.",
          '1800': "1800.",
          '1900': "1900.",
          '2000': "2000.",
          '2100': "2100.",
          '2200': "2200.",
          '2300': "2300.",
        },
        // By ShadowseerXII
        'imouto': {
          '0000': "0000 JST. Onii-chaaan, go to sleep already~ I'm sleepy...",
          '0100': "0100 JST. Onii-cha -- *yawn*... I'm tired... Can I take a nap...?",
          '0200': "0...2...00 JST...zzz...ah...sorry...I fell asleep...",
          '0300': "0300 JST...Onii-chan, is it time for PvP? Do you...want some coffee?",
          '0400': "0400 JST. Was it...good? *giggle* You're welcome, Onii-chan!",
          '0500': "0500 JST. I'm not sleepy anymore... Hmm... Onii-chan, can I sit by your side...?",
          '0600': "0600 JST. Waah...the sun is here... Jeez~ I couldnt sleep today... Onii-chan, you meanie *hnf*",
          '0700': "0700 JST. Breakfast time~ What do you want to eat? I'll make some toast for you, okay, onii-chan?",
          '0800': "0800 JST! Hehe~ I'm glad it was good. What are you going to do now, onii-chan?",
          '0900': "0900 JST! Did you send your expeditions already? You didnt forget it, did you, onii-chan?",
          '1000': "1000 JST! Did you do those daily quests already? I'm bored... Give me attention! >_<",
          '1100': "1100 JST-desu! ...What? You...didn't like it? ...Cute!? Hehe~ Thanks, onii-chan!",
          '1200': "1200 JST-desu! It's time for Lunch! Should I cook something, Onii-chan? Omurice it is!...poi!",
          '1300': "1300 JST-desu! Was it that good-poi?! I'm glad-decchi! I don't think I can eat dessert though-kamo...",
          '1400': "1400 JST-pyon! Ehhh? Am I overdoing it...? Sorry...Kyaha~☆. Hehe~",
          '1500': "1500 JST! Did you win all PvPs? That's my Onii-sama! What? Luck? Moo, Onii-sama tara~.. You're so modest...*blush*",
          '1600': "1600 JST! Onii-chan, How about taking a break..? It's not good to keep playing for such a long time...",
          '1700': "1700 JST! I told you already! If you get sick it's not my fault! Hunf!",
          '1800': "1800 JST. Onii-chan, should I start cooking dinner? What do you think of curry for today?.. Ok! It'll be ready soon!",
          '1900': "1900 JST! Awawa... you didnt need to jump like that to tell me it's good you know? I got it from Hiei's recipe",
          '2000': "2000 JST! ONII-CHAN WAKE UP! It's okay to take a nap after dinner but it's been 1 hour already!... Onii....chan..?",
          '2100': "*sniff* *sniff* Are you awake, onii? Sorry! I-I... didnt know it was so bad.. but you dont need to lie and eat it all, you know! It's 2100 JST!",
          '2200': "2200 JST. I guess your expeditions are back! By the way Onii, I've seen a ring in your inventary...",
          '2300': "2300 JST.. Onii, who are you giving that to.?.... No one? Oh.. never mind then.. that's good hehe~",

          'randoms': ['Yep!.', 'No!.', 'Hmm.. how should I answer that?', 'I dun wanna!', '...', "Onii... stop being stupid...", "I didn't listen, can you repeat it, Onii?", "Don't ask me these kind of things!", 'Yes! Definitely, Onii-chan!', '(YAYOI)'],
          'kick': "Get away from my Onii-chan!",
        },
        // By JustWastingTime
        'jwt': {
          '0000': "Admiral, it's 0000 JST. You can tell by the sound of some idiot screaming \"Yasen, yasen!\" outside.",
          '0100': "It's not good to stay up this late admiral. It's already 0100 JST. Hmm...did you hear someone say hyahaa?",
          '0200': "Some night battle freak is still shouting at 0200 JST... Sure is lively here...",
          '0300': "It's 0300 JST admiral. Someone outside is crying for Roma...not that I know what that is...",
          '0400': "Admiral, it's already 0400 JST. Four...like, you know, 4chan... I wonder if some fool posted their API link there today...",
          '0500': "Good morning, Admiral, it's 0500 JST. I see you are working hard as always. Well, like they say, the early admiral catches the...well, something.",
          '0600': "Hey admiral, I was checking our equipment list and it seems that we have a (blender)... I wonder how that got in here... Oh, by the way, it's 0600 JST.",
          '0700': "Admiral, it's already 0700 JST. You didn't forget to send expeditions, did you? I wonder where all our bauxite went...",
          '0800': "0800 JST. Admiral, did you have your breakfast already? Hiei and Isokaze are in the kitchen right now; want them to cook you something?",
          '0900': "Admiral...any second now some British freak will come running in, shouting \"Burning Love\" and make you drink some tea... Ugh, it's only 0900 JST, why is it so loud already?",
          '1000': "Hey, Admiral, I dare you to type in (AMAGI&#41;! Eh, the time? It's 1000 JST.",
          '1100': "Hey it's 1100 JST, admiral... Do you, by any chance, have the sudden urge to roll around and clear runways?",
          '1200': "It's 1200 JST admiral! I hope we have enough to afford a real lunch today. Not that I dislike having instant noodles everyday...",
          '1300': "Hey, Admiral... I know you love your shipgirls so much but maybe you should spend a bit more on food and slow down on buying slots? Well anyway...it's only 1300 JST.",
          '1400': "Admiral...don't you think RNG has been nice today? Ehhhh? I jinxed you? I-I'm sorry... Oh yeah, it's 1400 JST...",
          '1500': "It's 1500 JST! Come on admiral, let's show those normie skrubs who has the strongest fleet!",
          '1600': "Admiral, it's 1600 JST... Oh, by the way, be careful when touching anyone's third turret. There have been a lot of explosion reports lately.",
          '1700': "The sun is setting... Admiral, it's 1700 JST; shall we praise it?",
          '1800': "Admiral, it's 1800 JST, dinner time. I wonder what we're having tonight...falukorv? Never heard of it...",
          '1900': "Admiral, don't you feel like groping a smooth butt? It's only 1900 JST, let's have some fun!",
          '2000': "Hey, Admiral, don't you just hate it when someone has incredible luck? It's only 2000 JST, why don't we kick some acceptable casualty?",
          '2100': "It's 2100 JST, why don't we kick a certain talking bird?",
          '2200': "Admiral, it's 2200 JST. Now would be the perfect time to open others' danbooru and tumblr links.",
          '2300': "2300 JST... Hey, Admiral, I'm a bit sleepy, why dont we play a game of roulette?",

          'randoms': ["I'm sorry, what? I was fondling Koai's ass.", "Only if it blends.", "No. FITE ME.", "/me avoids the question and rolls around.", "/me kicks Akios.", "Falukorv's the word.", "Obviously potato quality.", "Yessssssssssss, if you wouldn't be so noisy.", "Not now or I'll put you in a third turret explosion list.", '(amagi)'],
          'kick': 'Stop wasting my time.',
          'hi': 'Hello there~',
          'hello': "Hi, it's me, Yuki~",
          'ohayou': "Oh? It's morning already?",
          'good night': 'Good night, Admiral~',
          'bye bye': 'Good bye.',
          'good bye': "Leaving so soon? Why don't you waste more time here?",
          'question?': 'Answer?',
          'may i ask a question': '/me rolls around.',
          'you suck': 'You want a (falukorv) inside you?',
          'give me luck': 'Huh? Luck? Sure, you can take it all. [[User:Kazami Yuuka|Just click here]].',
          'can i become chat mod': "Sure, let me put you in the list...of explosion targets.",
          'love me': "/me prefers Koai's ass.",
          'who are you': "It's me, Dio! No? It's just me, Yuki, here to serve.",
        },
        // By KowaretaGuze
        'mochizuki': {
          '0000': "The time is 0000. Zzzz...",
          '0100': "The time is 0100. Admiral...",
          '0200': "The time is 0200. *Yawn* You're still working...? Guess I should start too.",
          '0300': "0300. Some fleets are challenging us to a practice battle. Well, as long as I don't participate, it's fine.",
          '0400': "0400. *Sigh* I should still be sleeping at this hour...",
          '0500': "0500. Admiral, the sun's about to rise. How about taking a break?",
          '0600': "0600. Overnight expedition fleets are back. Well, I guess secretary duty's better than expeditions...",
          '0700': "0700. Ah, this? It's instant noodles. Here's yours admiral.",
          '0800': "0800. Breakfast? You just had it. Instant noodles are so convenient~",
          '0900': "0900. Admiral, don't neglect your dailies. You go do it so I can rest for... I-It's nothing.",
          '1000': "1000. In other words, Hachi. Ah, don't mind me, just a passing thought.",
          '1100': "1100. Don't worry, I also have lunch prepared. ...What's with that look?",
          '1200': "1200. You're ordering instead? Well I guess pizza's better than cup ramen.",
          '1300': "1300. Ah~ A good meal makes me a bit drowzy... But I guess work comes first huh... *sigh*",
          '1400': "1400. It's gonna get a bit rowdy here with the upcoming practice battle. How bothersome...",
          '1500': "1500. Eh? I should participate in practice battles? Let the others handle it...",
          '1600': "1600. Admiral, don't leave your strong fleet for practice. There's plenty of reports here that state so.",
          '1700': "1700. I know I know, I'll properly make something. Just wait here.",
          '1800': "1800. Here, I tried making some dinner. Don't worry, Houshou was there to help me.",
          '1900': "1900. That was a good meal~ I guess I'll go- Eh? Paperwork? Such a bother...",
          '2000': "2000. Don't forget about your overnight expeditions now.",
          '2100': "2100... Admiral, I'm getting a bit sleepy...",
          '2200': "22...00... No more... Let me rest for a bit...",
          '2300': "The time is 2300. Hourly alarm's all set up. G'night admiral...",

          'randoms': ['Yep.', 'Nah.', 'Dunno.', '...', 'Whatever...', "Don't ask me...", '...Huh?', "/me doesn't respond.", '/me is fast asleep.', '(amagi)'],
          'kick': "You're being a bother...",
          'hi': 'Hey.',
          'hello': 'Mm.',
          'ohayou': 'Morning already...?',
          'good night': 'Ah! Good night~',
          'bye bye': '/me waves.',
          'good bye': 'Yeah, see you soon.',
          'question?': 'What is it?',
          'may i ask a question': 'Go ask someone else...',
          'you suck': '...What did you just say?',
          'give me luck': 'Have it. Just give me a day off...',
          'can i become chat mod': "Well, you'll have to ask the mods about that...",
          'love me': "I'd love you if you give me a break~ <3 ",
          'who are you': "Introductions? It's such a drag...",
        },
        // By JustWastingTime
        'kamidere': {
          '0000': "0000 JST. The day changed, thanks to me of course. I am God after all~",
          '0100': "Hmm... 0100 JST, you're working hard. Good, good, you might be the perfect servant.",
          '0200': "Hmph. 0200 JST. Is this all you can do?",
          '0300': "It's already 0300 JST... Me? Sleepy? Of course not. Mind your own business!",
          '0400': "Hey! Don't fall asleep! It's only 0400 JST. Ughh...how shameless.",
          '0500': "0500 JST... Morning already? Not that it matters to a god like me.",
          '0600': "0600 JST. Breakfast time~ Hey servant, you didn't prepare one for me did you? Oh, you did? Maybe you're not as incompetent as I thought.",
          '0700': "...0700 JST. Hey... I cooked something for you... The taste? Of course it's good. It is ME you are talking about, you know.",
          '0800': "It's 0800 JST. What? Am I sure? Who do you think I am? Jeez...",
          '0900': "Why must I tell the time to someone like you? Because I'm always right? Well...that is a given. Anyway, it's 0900 JST.",
          '1000': "It's already 1000 JST. I do hope for my other worshippers' sake that you have sent out expeditions already.",
          '1100': "It's almost lunch time. 1100 JST. You did prepare something, right? What? You forgot? How incompetent.",
          '1200': "1200 JST... It's been an hour already? Fortunately for you, your benevolent god has finished preparing lunch. You can have a bite.",
          '1300': "Well, I guess it can't be helped. Not everyone is as capable as I am, after all. Hmm? Oh, it's 1300 JST.",
          '1400': "1400 JST and you are already done with your paperwork? Well, you are my servant... You should be able to do that much... Anyway, good job.",
          '1500': "Ah, 1500 JST. Hurry up, it's time to show those infidels who's God.",
          '1600': "Why are you praying to RNG when you could be praying to me? The time? Any time is suitable to worship me. Oh, you meant... It's 1600 JST.",
          '1700': "It's 1700 JST... The sun... The second most perfect thing in the world. Huh? The first? It's me, obviously~",
          '1800': "Oh, 1800 JST, time for dinner~ So what have you prepared for me, servant?",
          '1900': "Mmh~ 1900 JST already? Well...it was almost a good meal. But...I suppose this will do.",
          '2000': "...2000 JST, huh? You want a massage? Who do you thi- Yeah okay, I guess it can't be helped: you have been working hard for me after all.",
          '2100': "Hey servant, it's already 2100 JST. Lets go and see the moon. Huh? Why? Just shut up and follow me!",
          '2200': "Hmm...2200 JST, it's kinda quiet here. Am I losing followers...",
          '2300': "2300 JST. The day is coming to an end. Well, I guess I could still accompany you. I mean, you can't do anything without me after all.",
          
          'randoms': ['Obviously.', "Err...I don't kno- I'm busy!", 'No, you imbecile.', 'Of course.', 'Hmph, stop bothering me.', '...', 'Hmm, no?', 'Yeah, I am a god after all.', "Use your commo -- I guess you can't help it. The answer is no."],
          'kick': 'Huh? Repent, infidel.',
        },
        // By Koai
        'clingy': {
          '0000': "0000. Admiral, if you're not too busy, I would like to spend this night with you. Just the two of us...alone. Okay~? ^^",
          '0100': "0100. It can get pretty cold during the night, huh, Admiral? Would you like to use me to warm yourself up? I don't mind. So long as you don't do this with anyone other than me.",
          '0200': "0200. When expeditions return, be sure to restock everyone's fuel and ammunition. Making sure they're alright? Well, I guess I can allow that much... Oh, nothing~!",
          '0300': "0300. When living on the edge, you've got to stay sharp. Much like the end of a blade, glistening with red... Huh? Oh, nothing.",
          '0400': "0400. Admiral, it's time for physical exercises with the ship girls. Try not to get too physical with anyone that isn't me though, okay?",
          '0500': "0500. Admiral, how was practice? You look a bit worn out. I don't dislike that tired look on your face, though...",
          '0600': "0600. The sunrise sure is beautiful, isn't it? If you'd like to watch together, I would be overjoyed. Say...has any other girl asked to watch with you?",
          '0700': "0700. It's about time for breakfast, Admiral. What would you like today? I can make anything if it's for you, Admiral...",
          '0800': "0800. How did you like my pancakes? I hope they weren't too hard on your stomach. Eh? You wouldn't mind having them for lunch, as well as dinner? Admiral, you're much too kind.",
          '0900': "0900. It seems our expeditions from last night have returned. Make sure to resupply and... Hey, are you staring at someone other than me?",
          '1000': "1000. The docks are going to be filled up pretty soon... Admiral, when we get the chance, want to go in together? You have to promise not to look at other girls, though!",
          '1100': "1100. Admiral, it will soon be nearing lunch. You aren't still full from this morning's pancakes, are you...?",
          '1200': "1200. Oh? Mamiya prepared lunch? How thoughtful of her to make me something... What, you wanted to try some? You know I won't allow you to enjoy another woman's cooking, silly Admiral. Here, I'll make you something special~",
          '1300': "1300. How was the fried lobster, Admiral? I used a lot of unique seasonings this time. (KISARAGI)",
          '1400': "1400. My, my. You look a bit stressed, Admiral. Why not rest for a bit? I'll watch over you while you sleep.",
          '1500': "1500. It's time for another physical exercise. Don't forget to change out the equipment from your last sortie run.",
          '1600': "1600. Nice work, as always, Admiral! Should I reward you for not staring at other girls during practice?",
          '1700': "1700. Admiral, our expeditions have returned. We should begin preparing dinner for everyone. Ah, but don't worry. I'll make yours unique, of course.",
          '1800': "1800. Hibiki sure does love to help out in the kitchen, doesn't she? Such a sweet little girl. Ah, but don't look at her too much, okay? Your eyes were made to look at me.",
          '1900': "1900. The docks seem to be clear at the moment. How about we wash up together, Admiral? Let's be fast, though. I don't want anyone else peeping at your body...",
          '2000': "2000. Looking at the moon together like this isn't so bad every now and then, huh? Eh? You've done this with Hibiki too...? Admiraaaaaal...? (FUSOU)",
          '2100': "2100. It's alright, Admiral. I'll forgive you this time, only because I really like Hibiki, though.",
          '2200': "2200. Our expeditions are heading out again. Say, Admiral... How often do you check your quests? Ooyodo tells me she's very fond of you...",
          '2300': "2300. The true hours of the night are just beginning. Admiral, I often hear that people like to confess their affection under the blanket of moonlight. Do you...often get called on by other girls during the night, I wonder? That would be no good.",

        'randoms': ['/me swiftly hides a medium-length, steel-colored object.', "You know, I wouldn't mind if you spent less time speaking to others than you do with me.", 'Oh, did you need something? Did you want someone to disappear?', '/me stares silently with a smile.', 'Eh?', 'Sure...', 'Admiraaaaaaaaal~ (FUSOU)', "No! Don't!", '(NOSHIRO)', 'хорошо.', 'Ура!', "I won't allow it!", '(KISARAGI)', 'I seeeeeeee youuuuuu~', 'Of course!', '<3', "Error. I didn't quite catch that.", '/me backs away slowly.'],
        },
        // By Dnite77
        'dnite': {
          '0000': "Admiral, we have successfully strapped the yasen baka in place. She won't be going anywhere now!",
          '0100': "You're still working, Admiral? Should I get you some tea? Or would you prefer coffee?",
          '0200': "ADMIRAL!!! SENDAI HAS ESCAPED!!!",
          '0300': '',
          '0400': "A new day begins! Admiral, 1 hour until daily quests reset. Should I wake the fleet now?",
          '0500': "Daily quests reset! Everyone, time to for some reveille!! And drag Sendai and Kako out of their rooms!",
          '0600': "We Have done our morning reveille, Admiral! Time for our early bath! DONT. YOU. DARE. PEEK.",
          '0700': "Morning bath's are bliss. Now time for some breakfast! Zuihou made some egg rolls.",
          '0800': "Admiral, all fleets are on sortie or expeditions now! Eh!? We should have done PvP first?",
          '0900': "Admiral!! We should do our dailies now!",
          '1000': "Admiral, we should deploy them to long expeditions now! Maintenance is about to start in an hour!",
          '1100': "(CATBOMB) + (CATDIVE) = ADMIRAL (taihA) ",
          '1200': "ADMIRAL!!! HIEI IS COOKING SOMETHING!!!!" ,
          '1300': "Admiral, Akagi ate Hiei's curry and will be at the docks for the next 2 days.",
          '1400': "Admiral! The second wave of PvP will be here in an hour. Should I prepare the fleet?",
          '1500': "PvP reset! All fleets forward!",
          '1600': "Admiral, Mamiya has prepared some snacks for us!",
          '1700': "Fleet activities are done now, Admiral! Eh!? Send them to Tokyo Express again?",
          '1800': "Ahh! Nothing beats a bath after a hard day's work, right, Admiral?",
          '1900': "ADMIRAL!!! ISOKAZE MADE BLACK MATTER WITH EGGS AGAIN!!!",
          '2000': "Thanks for the hard work today, Admiral! Wait...? We still have paperwork to do!?",
          '2100': "That Sendai is making a ruckus again *sigh* I'll take care of her.",
          '2200': "ADMIRAL!! SENDAI WENT OUT AGAIN!!",
          '2300': "Admiral, are you sleepy? You should get some rest now... Good night.",

          'randoms': ["ADMIRAL, LITTORIO WANT TO KNOW WHERE ROMA IS!!", "MONTHLY RESETS!! Time to visit Oscar again.", "When in doubt, blame Akios!", "Admiral, the subs are on strike again! They say they don't want to Orel.", "YOU GET (salt)! YOU GET (salt)! YOU GET (salt) ! EVERYONE GETS (salt)!!"],
        },
        // By ゆーたん
        'kongou': {
          '0000': "Midnight DESU!! (deesu) A NEWDAY of Kancolle~",
          '0100': "ONE O' CLOCK DEESU!! (deesu) HEY Teitokuu~ What'cha doin' under your chair?",
          '0200': "TWO O' CLOCK!! (deesu) Hoho~ So [i]that[/i]'s what you've been doing under [i]there[/i]~",
          '0300': "THREE O'CLOCK!! TEATIME DESU!! (deesu) Oh, it's still MORNING desu...",
          '0400': "PVP RESET DESU!! (deesu) If you don't get 5 S-Ranks in PVP, I'll stuff your throat with the leftovers of Hiei's British bangers~ [i](If you do, I'll stuff them down anyway~)[/i]",
          '0500': "FIVE O' CLOCK DESU!! (deesu) HEEEEYYY TEITOKUUU~ It's about time you stopped hiding in the loo~ Hiei's still got seconds~",
          '0600': "SIX O' CLOCK!! (deesu) HEEEEYYY TEITOKUUU~ If you're done with that [b][i][u]thing[/b][/i][/u] you're doing in the loo, get out here like a real man!!",
          '0700': "SEVEN O' CLOCK DESU!! (deesu) The morning air makes me want to shoot a few Abyssals~!! E-eh?! 4-5... well... NEVERMIND DESU!! ><",
          '0800': "EIGHT O' CLOCK!! (deesu) FIRE! FIRE! These [i]guns[/i] won't lose to anyone, not even to Yamato DESU!! W-wait... that came out wrong...",
          '0900': "NINE O' CLOCK DESU!! (deesu) HEEEEYYY TEITOKUUU~ Go out with me and smell the flowers! Stop doing stuff where I can't see you!!",
          '1000': "TEN O' CLOCK DESU!! (deesu) I'll go make lunch. Hiei here brought snacks~ H-hold on, TEITOKUUUU!! Stop running!! The snacks are HEEERE!!",
          '1100': "Eleven o' clock... I may sometimes overstep my relationship with the admiral... but I hope he doesn't mind. He's the only one that sees me for me... W-wait, Y-you heard everything?! I-I mean... It's time to help me prepare LUNCH!! (deesu)",
          '1200': "NOONTIME DESU!! (deesu) LUNCH IS READY!! Eat up~ ....... Oh, by the way... Hiei and I switched roles, [i]she[/i] cooked this time around~",
          '1300': "ONE O' CLOCK!! (deesu) HEEEEYYY TEITOKUUU~ Get outta that docks; there are many more ships that actually need to use it ya know?!",
          '1400': "TWO O' CLOCK!! (deesu) I'll go make some scones and tea~",
          '1500': "THREE O' CLOCK DESU!! (deesu) TEATIME DESU!! Oh, and the PvPs reset just 'bout now. I made scones!",
          '1600': "FOUR O' CLOCK!! (deesu) HEY!! Stop doing your weird stuff under the table!! If you want... I'll... help...",
          '1700': "FIVE O' CLOCK DESU!! (deesu) I've made tea and some more scones~ SHIT!! I forgot the jelly!! Ah, thanks Hiei, you made some extra.",
          '1800': "SIX O' CLOCK!! (deesu) I'm glad everyone came back safe~ I'll make dinner for ya soon~ Teitokuuu~ have you woken up from your SIESTA yet?",
          '1900': "SEVEN O' CLOCK DESU!! (deesu) Dinner is gonna be... the stuff the you didn't eat this morning~ Hiei's bangers don't spoil so easily now, do they?",
          '2000': "EIGHT O' CLOCK DESU!! (deesu) After a dinner like that, ya gonna take a bath or anything? Well, it doesn't matter. There's a time and place for everything anyways.",
          '2100': "NINE O' CLOCK!! (deesu) It's a bit quiet now... I know!! FIRE!! FIRE!! Now everyone won't be so solemn now~",
          '2200': "TEN O' CLOCK DESU!! (deesu) HEEEEYYY TEITOKUUU~ Are ya planning to stay up this late again? Well... not that I don't mind... MAYBE.",
          '2300': "Eleven o' clock... Sometimes, a bit of quiet at night isn't so bad, I guess. I think it's just you and me tonight, Admiral. thanks again for another day of hard work. Here's to the next one!! (deesu)",

          'randoms': ['(deesu)', 'DESU!! (deesu)', '(amagi)', '/me pounces on an unfortunate Oh Yodo desu.', "/me throws random stuff at JWT, or whatever's left of him.", 'デース❢❢', 'WELCOME TO ENGLAND, BLOODY HELL!!'],

          'kick': 'BUUURNING....LOOOVE! (deesu)',
        },
        // By Azurekaito15
        'kanmusu': {
          '0000': "0000 JST. Fufufu, Admiral, don't you want to sleep?",
          '0100': "0100 JST. *yawn*... Oh, sorry about that, Admiral.",
          '0200': "0...2...00 JST...zzz... hmm it's seem that I fall asleep",
          '0300': "0300 JST. Admiral, PvP already reset.",
          '0400': "0400 JST. So did you win all PvPs, Admiral?",
          '0500': "0500 JST. Admiral, the quests have already reset.",
          '0600': "0600 JST. It's already morning, Admiral",
          '0700': "0700 JST. Time for our morning duty, Admiral",
          '0800': "0800 JST. I guess it's time for me to cook breakfast. What do you want to eat, Admiral?",
          '0900': "0900 JST. So how was breakfast, Admiral?",
          '1000': "1000 JST. Admiral, did you do those daily quests and send your expeditions?",
          '1100': "1100 JST. Admiral, remember to train the other ship girls.",
          '1200': "1200 JST. Time for lunch. You should cook something for me, Admiral",
          '1300': "1300 JST... Well, it is edible, at least.",
          '1400': "1400 JST. PvP already reset. Time to do some PvP, Admiral",
          '1500': "1500 JST. Did you see any Kuso TTK in the PvP list, Admiral?",
          '1600': "1600 JST. Admiral, let's take a break. It's time for some tea.",
          '1700': "1700 JST. Admiral, how's the tea?",
          '1800': "1800 JST. Admiral, I should start cooking dinner. It's better for both of us.",
          '1900': "1900 JST. Admiral, it's my special curry dinner. I got the recipe from someone with the alias of 'H'.",
          '2000': "2000 JST! ADMIRAL, WAKE UP! Wh...What happened to you? You suddenly started forming at the mouth when you ate the curry.",
          '2100': "*sniff* *sniff* Are you awake, Admiral? Sorry! I-I...shouldn't feed you curry from Hie... It's nothing! 2100 JST!",
          '2200': "2200 JST. By the way, Admiral, I've seen a ring in your inventory...",
          '2300': "2300 JST. So, who are you giving that to? I hope that someone gives me a ring...",

          'randoms': ['Yes, Admiral.', 'No, Admiral!', 'Hmm... How should I answer that Admiral?', 'Admiral, you\'re being ecchi like Dechi!', '...What?', 'Admiral... stop acting like Zak.', 'Sorry, could you repeat that again, Admiral?', "Don't ask me these kinds of things!", 'Yes! Admiral, I like yo... *blush* What you making me say!'],
          'kick': "Go cool off your head first, Admiral.",
        },
      };
    },

    load: function() {
      $.extend(this, this.entries());
    },

    get_line: function(identifier, personality) {
      if(!personality) personality = ConfigController.personality || 'default';
      if(!this[personality]) personality = 'default';
      return this[personality][identifier] || this['default'][identifier] || 'Line not available.';
    },
  };

  PersonalityController.load();
})();
