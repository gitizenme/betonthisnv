// require Platino
var platino = require("co.lanica.platino");

/*
 $.sex_shake_web.init($.shakeItWin);
 $.sex_shake_web.on('click', function(e) {
 Ti.API.debug('index.' + arguments.callee.name + ': ' + JSON.stringify(e));
 var arg = {
 targetPage : 0
 };
 var win1 = Alloy.createController('BetOnThisNVWebView', arg).getView();
 });
 */

var args = {
	title : "SEX SAFE"
};

var reels = {
	reel1 : {
		numberOfSprites : 10,
		spriteNames : [],
		symbolNames : ["Female", "Trans - M to F", "Trans - F to M", "Indifferent", "Male"],
		stops : []
	},
	reel2 : {
		numberOfSprites : 36,
		spriteNames : [],
		symbolNames : ["Oral Sex", "Massage", "Fingering", "Fisting", "Sex with Man", "Sex with Woman", "Sex Toy", "Dry Humping", "Rubbing a Vagina", "Masturbation", "Penis Rubbing", "Rimming", "Kissing", "Scissoring", "Sex Safe", "Anal Sex"],
		stops : []
	},
	reel3 : {
		numberOfSprites : 8,
		spriteNames : [],
		symbolNames : ["Condom", "Dental Dam", "Clothing", "None"],
		stops : []
	}
};

var activityMapping = {
	data : [{
		"mapping" : "Male:Anal Sex",
		"activity" : "Giving Anal Sex"
	}, {
		"mapping" : "Female:Anal Sex",
		"activity" : "Giving Anal Sex"
	}, {
		"mapping" : "Trans - M to F:Anal Sex",
		"activity" : "Giving Anal Sex"
	}, {
		"mapping" : "Trans - F to M:Anal Sex",
		"activity" : "Giving Anal Sex"
	}, {
		"mapping" : "Indifferent:Anal Sex",
		"activity" : "Giving Anal Sex"
	}, {
		"mapping" : "Male:Oral Sex",
		"activity" : "Getting Oral Sex"
	}, {
		"mapping" : "Female:Oral Sex",
		"activity" : "Getting Oral Sex"
	}, {
		"mapping" : "Trans - M to F:Oral Sex",
		"activity" : "Getting Oral Sex"
	}, {
		"mapping" : "Trans - F to M:Oral Sex",
		"activity" : "Getting Oral Sex"
	}, {
		"mapping" : "Indifferent:Oral Sex",
		"activity" : "Getting Oral Sex"
	}, {
		"mapping" : "Female:Oral Sex",
		"activity" : "Going Down on a Vagina"
	}, {
		"mapping" : "Trans - M to F:Oral Sex",
		"activity" : "Going Down on a Vagina"
	}, {
		"mapping" : "Trans - F to M:Oral Sex",
		"activity" : "Going Down on a Vagina"
	}, {
		"mapping" : "Indifferent:Oral Sex",
		"activity" : "Going Down on a Vagina"
	}, {
		"mapping" : "Male:Anal Sex",
		"activity" : "Getting Anal Sex"
	}, {
		"mapping" : "Female:Anal Sex",
		"activity" : "Getting Anal Sex"
	}, {
		"mapping" : "Trans - M to F:Anal Sex",
		"activity" : "Getting Anal Sex"
	}, {
		"mapping" : "Trans - F to M:Anal Sex",
		"activity" : "Getting Anal Sex"
	}, {
		"mapping" : "Indifferent:Anal Sex",
		"activity" : "Getting Anal Sex"
	}, {
		"mapping" : "Male:Oral Sex",
		"activity" : "Giving a Blow Job"
	}, {
		"mapping" : "Female:Oral Sex",
		"activity" : "Giving a Blow Job"
	}, {
		"mapping" : "Trans - M to F:Oral Sex",
		"activity" : "Giving a Blow Job"
	}, {
		"mapping" : "Trans - F to M:Oral Sexb",
		"activity" : "Giving a Blow Job"
	}, {
		"mapping" : "Indifferent:Oral Sex",
		"activity" : "Giving a Blow Job"
	}, {
		"mapping" : "Male:Fingering",
		"activity" : "Fingering or Fisting"
	}, {
		"mapping" : "Female:Fingering",
		"activity" : "Fingering or Fisting"
	}, {
		"mapping" : "Trans - M to F:Fingering",
		"activity" : "Fingering or Fisting"
	}, {
		"mapping" : "Trans - F to M:Fingering",
		"activity" : "Fingering or Fisting"
	}, {
		"mapping" : "Indifferent:Fingering",
		"activity" : "Fingering or Fisting"
	}, {
		"mapping" : "Male:Fisting",
		"activity" : "Fingering or Fisting"
	}, {
		"mapping" : "Female:Fisting",
		"activity" : "Fingering or Fisting"
	}, {
		"mapping" : "Trans - M to F:Fisting",
		"activity" : "Fingering or Fisting"
	}, {
		"mapping" : "Trans - F to M:Fisting",
		"activity" : "Fingering or Fisting"
	}, {
		"mapping" : "Indifferent:Fisting",
		"activity" : "Fingering or Fisting"
	}, {
		"mapping" : "Male:Sex with Woman",
		"activity" : "Sex (Vaginal)"
	}, {
		"mapping" : "Female:Sex with Man",
		"activity" : "Sex"
	}, {
		"mapping" : "Trans - M to F:Sex with Man",
		"activity" : "Sex"
	}, {
		"mapping" : "Trans - M to F:Sex with Woman",
		"activity" : "Sex (Vaginal)"
	}, {
		"mapping" : "Trans - F to M:Sex with Woman",
		"activity" : "Sex (Vaginal)"
	}, {
		"mapping" : "Trans - F to M:Sex with Man",
		"activity" : "Sex"
	}, {
		"mapping" : "Indifferent:Sex with Man",
		"activity" : "Sex"
	}, {
		"mapping" : "Male:Sex with Woman",
		"activity" : "Decide to Have Sex"
	}, {
		"mapping" : "Female:Sex with Man",
		"activity" : "Decide to Have Sex"
	}, {
		"mapping" : "Trans - M to F:Sex with Man",
		"activity" : "Decide to Have Sex"
	}, {
		"mapping" : "Trans - F to M:Sex with Woman",
		"activity" : "Decide to Have Sex"
	}, {
		"mapping" : "Indifferent:Sex with Man",
		"activity" : "Decide to Have Sex"
	}, {
		"mapping" : "Male:Sex Toy",
		"activity" : "Insert a Sex Toy"
	}, {
		"mapping" : "Female:Sex Toy",
		"activity" : "Insert a Sex Toy"
	}, {
		"mapping" : "Trans - M to F:Sex Toy",
		"activity" : "Insert a Sex Toy"
	}, {
		"mapping" : "Trans - F to M:Sex Toy",
		"activity" : "Insert a Sex Toy"
	}, {
		"mapping" : "Indifferent:Sex Toy",
		"activity" : "Insert a Sex Toy"
	}, {
		"mapping" : "Male:Sex Toy",
		"activity" : "Play with a Sex Toy (No Insertion)"
	}, {
		"mapping" : "Female:Sex Toy",
		"activity" : "Play with a Sex Toy (No Insertion)"
	}, {
		"mapping" : "Trans - M to F:Sex Toy",
		"activity" : "Play with a Sex Toy (No Insertion)"
	}, {
		"mapping" : "Trans - F to M:Sex Toy",
		"activity" : "Play with a Sex Toy (No Insertion)"
	}, {
		"mapping" : "Indifferent:Sex Toy",
		"activity" : "Play with a Sex Toy (No Insertion)"
	}, {
		"mapping" : "Male:Dry Humping",
		"activity" : "Dry Humping"
	}, {
		"mapping" : "Female:Dry Humping",
		"activity" : "Dry Humping"
	}, {
		"mapping" : "Trans - M to F:Dry Humping",
		"activity" : "Dry Humping"
	}, {
		"mapping" : "Trans - F to M:Dry Humping",
		"activity" : "Dry Humping"
	}, {
		"mapping" : "Indifferent:Dry Humping",
		"activity" : "Dry Humping"
	}, {
		"mapping" : "Male:Rubbing a Vagina",
		"activity" : "Rubbing a Vagina"
	}, {
		"mapping" : "Female:Rubbing a Vagina",
		"activity" : "Rubbing a Vagina"
	}, {
		"mapping" : "Trans - M to F:Rubbing a Vagina",
		"activity" : "Rubbing a Vagina"
	}, {
		"mapping" : "Trans - F to M:Rubbing a Vagina",
		"activity" : "Rubbing a Vagina"
	}, {
		"mapping" : "Indifferent:Rubbing a Vagina",
		"activity" : "Rubbing a Vagina"
	}, {
		"mapping" : "Male:Masturbation",
		"activity" : "Masturbation"
	}, {
		"mapping" : "Female:Masturbation",
		"activity" : "Masturbation"
	}, {
		"mapping" : "Trans - M to F:Masturbation",
		"activity" : "Masturbation"
	}, {
		"mapping" : "Trans - F to M:Masturbation",
		"activity" : "Masturbation"
	}, {
		"mapping" : "Indifferent:Masturbation",
		"activity" : "Masturbation"
	}, {
		"mapping" : "Male:Penis Rubbing",
		"activity" : "Penis Rubbing"
	}, {
		"mapping" : "Female:Penis Rubbing",
		"activity" : "Penis Rubbing"
	}, {
		"mapping" : "Trans - M to F:Penis Rubbing",
		"activity" : "Penis Rubbing"
	}, {
		"mapping" : "Trans - F to M:Penis Rubbing",
		"activity" : "Penis Rubbing"
	}, {
		"mapping" : "Indifferent:Penis Rubbing",
		"activity" : "Penis Rubbing"
	}, {
		"mapping" : "Male:Rimming",
		"activity" : "Rimming (Licking) Anus"
	}, {
		"mapping" : "Female:Rimming",
		"activity" : "Rimming (Licking) Anus"
	}, {
		"mapping" : "Trans - M to F:Rimming",
		"activity" : "Rimming (Licking) Anus"
	}, {
		"mapping" : "Trans - F to M:Rimming",
		"activity" : "Rimming (Licking) Anus"
	}, {
		"mapping" : "Indifferent:Rimming",
		"activity" : "Rimming (Licking) Anus"
	}, {
		"mapping" : "Male:Kissing",
		"activity" : "Kissing"
	}, {
		"mapping" : "Female:Kissing",
		"activity" : "Kissing"
	}, {
		"mapping" : "Trans - M to F:Kissing",
		"activity" : "Kissing"
	}, {
		"mapping" : "Trans - F to M:Kissing",
		"activity" : "Kissing"
	}, {
		"mapping" : "Indifferent:Kissing",
		"activity" : "Kissing"
	}, {
		"mapping" : "Male:Scissoring",
		"activity" : "Scissoring"
	}, {
		"mapping" : "Female:Scissoring",
		"activity" : "Scissoring"
	}, {
		"mapping" : "Trans - M to F:Scissoring",
		"activity" : "Scissoring"
	}, {
		"mapping" : "Trans - F to M:Scissoring",
		"activity" : "Scissoring"
	}, {
		"mapping" : "Indifferent:Scissoring",
		"activity" : "Scissoring"
	}, {
		"mapping" : "Male:Massage",
		"activity" : "Massage Partner"
	}, {
		"mapping" : "Female:Massage",
		"activity" : "Massage Partner"
	}, {
		"mapping" : "Trans - M to F:Massage",
		"activity" : "Massage Partner"
	}, {
		"mapping" : "Trans - F to M:Massage",
		"activity" : "Massage Partner"
	}, {
		"mapping" : "Indifferent:Massage",
		"activity" : "Massage Partner"
	}, {
		"mapping" : "Male:Massage",
		"activity" : "Apply Massage Oil"
	}, {
		"mapping" : "Female:Massage",
		"activity" : "Apply Massage Oil"
	}, {
		"mapping" : "Trans - M to F:Massage",
		"activity" : "Apply Massage Oil"
	}, {
		"mapping" : "Trans - F to M:Massage",
		"activity" : "Apply Massage Oil"
	}, {
		"mapping" : "Indifferent:Massage",
		"activity" : "Apply Massage Oil"
	}, {
		"mapping" : "Male:Sex Safe",
		"activity" : "Cuddle (Naked or Clothed)"
	}, {
		"mapping" : "Female:Sex Safe",
		"activity" : "Cuddle (Naked or Clothed)"
	}, {
		"mapping" : "Trans - M to F:Sex Safe",
		"activity" : "Cuddle (Naked or Clothed)"
	}, {
		"mapping" : "Trans - F to M:Sex Safe",
		"activity" : "Cuddle (Naked or Clothed)"
	}, {
		"mapping" : "Indifferent:Sex Safe",
		"activity" : "Cuddle (Naked or Clothed)"
	}, {
		"mapping" : "Male:Sex Safe",
		"activity" : "Play with Partner's Hair"
	}, {
		"mapping" : "Female:Sex Safe",
		"activity" : "Play with Partner's Hair"
	}, {
		"mapping" : "Trans - M to F:Sex Safe",
		"activity" : "Play with Partner's Hair"
	}, {
		"mapping" : "Trans - F to M:Sex Safe",
		"activity" : "Play with Partner's Hair"
	}, {
		"mapping" : "Indifferent:Sex Safe",
		"activity" : "Play with Partner's Hair"
	}, {
		"mapping" : "Male:Sex Safe",
		"activity" : "Undress Your Partner"
	}, {
		"mapping" : "Female:Sex Safe",
		"activity" : "Undress Your Partner"
	}, {
		"mapping" : "Trans - M to F:Sex Safe",
		"activity" : "Undress Your Partner"
	}, {
		"mapping" : "Trans - F to M:Sex Safe",
		"activity" : "Undress Your Partner"
	}, {
		"mapping" : "Indifferent:Sex Safe",
		"activity" : "Undress Your Partner"
	}, {
		"mapping" : "Male:Sex Safe",
		"activity" : "Dance (Naked or Clothed)"
	}, {
		"mapping" : "Female:Sex Safe",
		"activity" : "Dance (Naked or Clothed)"
	}, {
		"mapping" : "Trans - M to F:Sex Safe",
		"activity" : "Dance (Naked or Clothed)"
	}, {
		"mapping" : "Trans - F to M:Sex Safe",
		"activity" : "Dance (Naked or Clothed)"
	}, {
		"mapping" : "Indifferent:Sex Safe",
		"activity" : "Dance (Naked or Clothed)"
	}, {
		"mapping" : "Male:Sex Safe",
		"activity" : "Say Something Sexy"
	}, {
		"mapping" : "Female:Sex Safe",
		"activity" : "Say Something Sexy"
	}, {
		"mapping" : "Trans - M to F:Sex Safe",
		"activity" : "Say Something Sexy"
	}, {
		"mapping" : "Trans - F to M:Sex Safe",
		"activity" : "Say Something Sexy"
	}, {
		"mapping" : "Indifferent:NV",
		"activity" : "Say Something Sexy"
	}, {
		"mapping" : "Male:Sex Safe",
		"activity" : "Flirt with Your Partner"
	}, {
		"mapping" : "Female:Sex Safe",
		"activity" : "Flirt with Your Partner"
	}, {
		"mapping" : "Trans - M to F:Sex Safe",
		"activity" : "Flirt with Your Partner"
	}, {
		"mapping" : "Trans - F to M:Sex Safe",
		"activity" : "Flirt with Your Partner"
	}, {
		"mapping" : "Indifferent:Sex Safe",
		"activity" : "Flirt with Your Partner"
	}]
};

var paytableData = {
	data : [{
		"orientation" : "Male",
		"activity" : "Giving Anal Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: HIV can be transmitted through this activity. Do not ignore this risk.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to use one.  If Dental Dam: A dental dam won't be any use here. Use a condom.  If Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Female",
		"activity" : "Giving Anal Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "Last time we checked, a female couldn't give anal sex. Try rimming, fingering or fisting.",
		"safety" : "N/A"
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Giving Anal Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "Last time we checked, a transgender female to male couldn't give anal sex. If you have not undergone full transition yet, try male or indifferent to get your result.",
		"safety" : "N/A"
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Giving Anal Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: HIV can be transmitted through this activity. Do not ignore this risk.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to use one.  If Dental Dam: A dental dam won't be any use here. Use a condom.  If Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Indifferent",
		"activity" : "Giving Anal Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: HIV can be transmitted through this activity. Do not ignore this risk.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe!  If Dental Dam: A dental dam won't be any use here. Use a condom.  If Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Male",
		"activity" : "Getting Oral Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe!  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: You can ask that they blow on or caress with their mouth over clothing. As long as no fluids enter the mouth, your partner is safe. "
	}, {
		"orientation" : "Female",
		"activity" : "Getting Oral Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a dental dam. Touch right here to learn how to use one.  If Condom: A condom won't be of any use here unless you make it into a barrier. Touch right here to learn how to make one.  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, your partner is safe. "
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Getting Oral Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a dental dam. Touch right here to learn how to use one.  If Condom: A condom won't be of any use here unless you make it into a barrier. Touch right here to learn how to make one.  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, your partner is safe. "
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Getting Oral Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Ask your partner to use a dental dam. Touch right here to learn how to use one.  If Condom: A condom won't be of any use here unless you make it into a barrier. Touch right here to learn how to make one.  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, your partner is safe. "
	}, {
		"orientation" : "Indifferent",
		"activity" : "Getting Oral Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Ask your partner to use a dental dam. Touch right here to learn how to use one.  If Condom: A condom won't be of any use here unless you make it into a barrier. Touch right here to learn how to make one.  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, your partner is safe. "
	}, {
		"orientation" : "Male",
		"activity" : "Giving Oral Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Ask your partner to use a dental dam. Touch right here to learn how to use one.  If Condom: A condom won't be of any use here unless you make it into a barrier. Touch right here to learn how to make one.  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, your partner is safe. "
	}, {
		"orientation" : "Female",
		"activity" : "Going Down on a Vagina",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a dental dam. Touch right here to learn how to use one.  If Condom: A condom won't be of any use here unless you make it into a barrier. Touch right here to learn how to make one.  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, your partner is safe. "
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Going Down on a Vagina",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a dental dam. Touch right here to learn how to use one.  If Condom: A condom won't be of any use here unless you make it into a barrier. Touch right here to learn how to make one.  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, your partner is safe. "
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Going Down on a Vagina",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a dental dam. Touch right here to learn how to use one.  If Condom: A condom won't be of any use here unless you make it into a barrier. Touch right here to learn how to make one.  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, your partner is safe. "
	}, {
		"orientation" : "Indifferent",
		"activity" : "Going Down on a Vagina",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a dental dam. Touch right here to learn how to use one.  If Condom: A condom won't be of any use here unless you make it into a barrier. Touch right here to learn how to make one.  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, your partner is safe. "
	}, {
		"orientation" : "Male",
		"activity" : "Getting Anal Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity has the highest risk for transmitting HIV.  Other STD Risk: Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts  ",
		"safety" : "If None: Ask your partner to use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to use one.  If Dental Dam: A dental dam won't be any use here. Use a condom.  If Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Female",
		"activity" : "Getting Anal Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity has the highest risk for transmitting HIV.  Other STD Risk: Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts  ",
		"safety" : "If None: Ask your partner to use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to use one.  If Dental Dam: A dental dam won't be any use here. Use a condom.  If Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Getting Anal Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity has the highest risk for transmitting HIV.  Other STD Risk: Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts  ",
		"safety" : "If None: Ask your partner to use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to use one.  If Dental Dam: A dental dam won't be any use here. Use a condom.  If Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Getting Anal Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity has the highest risk for transmitting HIV.  Other STD Risk: Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts  ",
		"safety" : "If None: Ask your partner to use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to use one.  If Dental Dam: A dental dam won't be any use here. Use a condom.  If Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Indifferent",
		"activity" : "Getting Anal Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity has the highest risk for transmitting HIV.  Other STD Risk: Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts  ",
		"safety" : "If None: Ask your partner to use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to use one.  If Dental Dam: A dental dam won't be any use here. Use a condom.  If Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Male",
		"activity" : "Giving a Blow Job",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a dental dam. Touch right here to learn how to use one.  If Condom: A condom won't be of any use here unless you make it into a barrier. Touch right here to learn how to make one.  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, you are safe. "
	}, {
		"orientation" : "Female",
		"activity" : "Giving a Blow Job",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a dental dam. Touch right here to learn how to use one.  If Condom: A condom won't be of any use here unless you make it into a barrier. Touch right here to learn how to make one.  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, you are safe. "
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Giving a Blow Job",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a dental dam. Touch right here to learn how to use one.  If Condom: A condom won't be of any use here unless you make it into a barrier. Touch right here to learn how to make one.  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, you are safe. "
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Giving a Blow Job",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a dental dam. Touch right here to learn how to use one.  If Condom: A condom won't be of any use here unless you make it into a barrier. Touch right here to learn how to make one.  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, you are safe. "
	}, {
		"orientation" : "Indifferent",
		"activity" : "Giving a Blow Job",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a dental dam. Touch right here to learn how to use one.  If Condom: A condom won't be of any use here unless you make it into a barrier. Touch right here to learn how to make one.  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, you are safe. "
	}, {
		"orientation" : "Male",
		"activity" : "Fingering or Fisting",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.  Other STD Risk: Herpes, Genital Warts   ",
		"safety" : "If None: Use a barrier: a condom, dental dam or medical gloves. Touch right here to learn how to use a condom.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Female",
		"activity" : "Fingering or Fisting",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.  Other STD Risk: Herpes, Genital Warts   ",
		"safety" : "If None: Use a barrier: a condom, dental dam or medical gloves. Touch right here to learn how to use a condom.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Fingering or Fisting",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.  Other STD Risk: Herpes, Genital Warts   ",
		"safety" : "If None: Use a barrier: a condom, dental dam or medical gloves. Touch right here to learn how to use a condom.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Fingering or Fisting",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.  Other STD Risk: Herpes, Genital Warts   ",
		"safety" : "If None: Use a barrier: a condom, dental dam or medical gloves. Touch right here to learn how to use a condom.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Indifferent",
		"activity" : "Fingering or Fisting",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.  Other STD Risk: Herpes, Genital Warts   ",
		"safety" : "If None: Use a barrier: a condom, dental dam or medical gloves. Touch right here to learn how to use a condom.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Male",
		"activity" : "Sex (Vaginal)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity can transmit HIV.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to use one.  If Dental Dam: A dental dam won't be any use here. Use a condom.  If Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Female",
		"activity" : "Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity can transmit HIV and is the most common way women get infected with HIV.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Ask your partner to use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to use one.  If Dental Dam: A dental dam won't be any use here. Use a condom.  If Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity can transmit HIV and is the most common way women get infected with HIV.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Ask your partner to use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to use one.  If Dental Dam: A dental dam won't be any use here. Use a condom.  If Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Sex (Vaginal)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity can transmit HIV.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to use one.  If Dental Dam: A dental dam won't be any use here. Use a condom.  If Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Indifferent",
		"activity" : "Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity can transmit HIV.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to use one.  If Dental Dam: A dental dam won't be any use here. Use a condom.  If Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Male",
		"activity" : "Insert a Sex Toy",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity can transmit HIV.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to use one.  If Dental Dam: A dental dam won't be any use here. Use a condom.  If Clothing: Sex toys over clothing can be fun. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Female",
		"activity" : "Insert a Sex Toy",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity can transmit HIV.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to use one.  If Dental Dam: A dental dam won't be any use here. Use a condom.  If Clothing: Sex toys over clothing can be fun. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Insert a Sex Toy",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity can transmit HIV.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to use one.  If Dental Dam: A dental dam won't be any use here. Use a condom.  If Clothing: Sex toys over clothing can be fun. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Insert a Sex Toy",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : " Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to use one.  If Dental Dam: A dental dam won't be any use here. Use a condom.  If Clothing: Sex toys over clothing can be fun. Do not try to insert wearing clothing. Ouch!"
	}, {
		"orientation" : "Indifferent",
		"activity" : "Insert a Sex Toy",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity can transmit HIV.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to use one.  If Dental Dam: A dental dam won't be any use here. Use a condom.  If Clothing: Sex toys over clothing can be fun. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Male",
		"activity" : "Dry Humping",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.  Other STD Risk: None reported, although under certain conditions transmission could be possible. ",
		"safety" : "Play safe!"
	}, {
		"orientation" : "Female",
		"activity" : "Dry Humping",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.  Other STD Risk: None reported, although under certain conditions transmission could be possible. ",
		"safety" : "Play safe!"
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Dry Humping",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.  Other STD Risk: None reported, although under certain conditions transmission could be possible. ",
		"safety" : "Play safe!"
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Dry Humping",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.  Other STD Risk: None reported, although under certain conditions transmission could be possible. ",
		"safety" : "Play safe!"
	}, {
		"orientation" : "Indifferent",
		"activity" : "Dry Humping",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.  Other STD Risk: None reported, although under certain conditions transmission could be possible. ",
		"safety" : "Play safe!"
	}, {
		"orientation" : "Male",
		"activity" : "Rubbing a Vagina",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.  Other STD Risk: None reported, although under certain conditions transmission could be possible. ",
		"safety" : "Play safe!"
	}, {
		"orientation" : "Female",
		"activity" : "Rubbing a Vagina",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.  Other STD Risk: None reported, although under certain conditions transmission could be possible. ",
		"safety" : "Play safe! You can choose to use a barrier if you like."
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Rubbing a Vagina",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.  Other STD Risk: None reported, although under certain conditions transmission could be possible. ",
		"safety" : "Play safe! You can choose to use a barrier if you like."
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Rubbing a Vagina",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.  Other STD Risk: None reported, although under certain conditions transmission could be possible. ",
		"safety" : "Play safe! You can choose to use a barrier if you like."
	}, {
		"orientation" : "Indifferent",
		"activity" : "Rubbing a Vagina",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.  Other STD Risk: None reported, although under certain conditions transmission could be possible. ",
		"safety" : "Play safe! You can choose to use a barrier if you like."
	}, {
		"orientation" : "Male",
		"activity" : "Masturbation",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Female",
		"activity" : "Masturbation",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Masturbation",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Masturbation",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Indifferent",
		"activity" : "Masturbation",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Male",
		"activity" : "Penis Rubbing",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Lower Risk Activity  Other STD Risk: Herpes, Genital Warts    ",
		"safety" : "If None: Ask your partner to use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to use one.  If Dental Dam: A dental dam won't be any use here. Use a condom.  If Clothing: This is more commonly known as fondling. "
	}, {
		"orientation" : "Female",
		"activity" : "Penis Rubbing",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Lower Risk Activity  Other STD Risk: Herpes, Genital Warts    ",
		"safety" : "If None: Ask your partner to use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to use one.  If Dental Dam: A dental dam won't be any use here. Use a condom.  If Clothing: This is more commonly known as fondling. "
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Penis Rubbing",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Lower Risk Activity  Other STD Risk: Herpes, Genital Warts    ",
		"safety" : "If None: Ask your partner to use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to use one.  If Dental Dam: A dental dam won't be any use here. Use a condom.  If Clothing: This is more commonly known as fondling. "
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Penis Rubbing",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Lower Risk Activity  Other STD Risk: Herpes, Genital Warts    ",
		"safety" : "If None: Ask your partner to use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to use one.  If Dental Dam: A dental dam won't be any use here. Use a condom.  If Clothing: This is more commonly known as fondling. "
	}, {
		"orientation" : "Indifferent",
		"activity" : "Penis Rubbing",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Lower Risk Activity  Other STD Risk: Herpes, Genital Warts    ",
		"safety" : "If None: Ask your partner to use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to use one.  If Dental Dam: A dental dam won't be any use here. Use a condom.  If Clothing: This is more commonly known as fondling. "
	}, {
		"orientation" : "Male",
		"activity" : "Rimming (Licking) Anus",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.  Other STD Risk: Herpes, Genital Warts   ",
		"safety" : "If None: Use a dental dam. Touch right here to learn how to use one.  If Condom: A condom won't be of any use here unless you make it into a barrier. Touch right here to learn how to make one.  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, you are safe. "
	}, {
		"orientation" : "Female",
		"activity" : "Rimming (Licking) Anus",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.  Other STD Risk: Herpes, Genital Warts   ",
		"safety" : "If None: Use a dental dam. Touch right here to learn how to use one.  If Condom: A condom won't be of any use here unless you make it into a barrier. Touch right here to learn how to make one.  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, you are safe. "
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Rimming (Licking) Anus",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.  Other STD Risk: Herpes, Genital Warts   ",
		"safety" : "If None: Use a dental dam. Touch right here to learn how to use one.  If Condom: A condom won't be of any use here unless you make it into a barrier. Touch right here to learn how to make one.  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, you are safe. "
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Rimming (Licking) Anus",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.  Other STD Risk: Herpes, Genital Warts   ",
		"safety" : "If None: Use a dental dam. Touch right here to learn how to use one.  If Condom: A condom won't be of any use here unless you make it into a barrier. Touch right here to learn how to make one.  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, you are safe. "
	}, {
		"orientation" : "Indifferent",
		"activity" : "Rimming (Licking) Anus",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.  Other STD Risk: Herpes, Genital Warts   ",
		"safety" : "If None: Use a dental dam. Touch right here to learn how to use one.  If Condom: A condom won't be of any use here unless you make it into a barrier. Touch right here to learn how to make one.  If Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!  If Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, you are safe. "
	}, {
		"orientation" : "Male",
		"activity" : "Kissing",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Safe! Safe! Safe!  Other STD Risk: Herpes   ",
		"safety" : "If None: Ask your partner - Do you ever get cold sores?  If Condom: A condom won't be of any use here. Best to ask your partner'Do you ever get cold sores?  If Dental Dam: A dental dam won't be of any use here. Best to ask your partner'Do you ever get cold sores?  If Clothing: Kiss someone while pulling their shirt over their head. That's sexy. But when you really start kissing, best to ask your partner'Do you ever get cold sores? "
	}, {
		"orientation" : "Female",
		"activity" : "Kissing",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Safe! Safe! Safe!  Other STD Risk: Herpes   ",
		"safety" : "If None: Ask your partner - Do you ever get cold sores?  If Condom: A condom won't be of any use here. Best to ask your partner'Do you ever get cold sores?  If Dental Dam: A dental dam won't be of any use here. Best to ask your partner'Do you ever get cold sores?  If Clothing: Kiss someone while pulling their shirt over their head. That's sexy. But when you really start kissing, best to ask your partner'Do you ever get cold sores? "
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Kissing",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Safe! Safe! Safe!  Other STD Risk: Herpes   ",
		"safety" : "If None: Ask your partner - Do you ever get cold sores?  If Condom: A condom won't be of any use here. Best to ask your partner'Do you ever get cold sores?  If Dental Dam: A dental dam won't be of any use here. Best to ask your partner'Do you ever get cold sores?  If Clothing: Kiss someone while pulling their shirt over their head. That's sexy. But when you really start kissing, best to ask your partner'Do you ever get cold sores? "
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Kissing",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Safe! Safe! Safe!  Other STD Risk: Herpes   ",
		"safety" : "If None: Ask your partner - Do you ever get cold sores?  If Condom: A condom won't be of any use here. Best to ask your partner'Do you ever get cold sores?  If Dental Dam: A dental dam won't be of any use here. Best to ask your partner'Do you ever get cold sores?  If Clothing: Kiss someone while pulling their shirt over their head. That's sexy. But when you really start kissing, best to ask your partner'Do you ever get cold sores? "
	}, {
		"orientation" : "Indifferent",
		"activity" : "Kissing",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Safe! Safe! Safe!  Other STD Risk: Herpes   ",
		"safety" : "If None: Ask your partner - Do you ever get cold sores?  If Condom: A condom won't be of any use here. Best to ask your partner'Do you ever get cold sores?  If Dental Dam: A dental dam won't be of any use here. Best to ask your partner'Do you ever get cold sores?  If Clothing: Kiss someone while pulling their shirt over their head. That's sexy. But when you really start kissing, best to ask your partner'Do you ever get cold sores? "
	}, {
		"orientation" : "Male",
		"activity" : "Scissoring",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "Better known as Docking for men.  HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts  ",
		"safety" : "If None: Use a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to use one.  If Dental Dam: A dental dam won't be any use here. Use a condom.  If Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Female",
		"activity" : "Scissoring",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Find a condom and turn it into a barrier. Touch right here to learn how to make one.  If Condom: Great, you have a condom! Turn it into a barrier. Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to make one.  If Dental Dam: A dental dam won't be any use here. Use a condom and turn it into a barrier. Touch right here to learn how to make one.  If Clothing: This is more commonly known as dry humping. "
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Scissoring",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Find a condom and turn it into a barrier. Touch right here to learn how to make one.  If Condom: Great, you have a condom! Turn it into a barrier. Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to make one.  If Dental Dam: A dental dam won't be any use here. Use a condom and turn it into a barrier. Touch right here to learn how to make one.  If Clothing: This is more commonly known as dry humping. "
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Scissoring",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "Better known as Docking for men.  HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts  ",
		"safety" : "If None: Find a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to make one.  If Dental Dam: A dental dam won't be any use here. Use a condom. Touch right here to learn how to use one.  If Clothing: This is more commonly known as dry humping. "
	}, {
		"orientation" : "Indifferent",
		"activity" : "Scissoring",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "Better known as Docking for men.  HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.  Other STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts  ",
		"safety" : "None: Find a condom. Touch right here to learn how to use one.  If Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Touch right here to learn how to make one.  If Dental Dam: A dental dam won't be any use here. Use a condom. Touch right here to learn how to use one.  If Clothing: This is more commonly known as dry humping. "
	}, {
		"orientation" : "Male",
		"activity" : "Undress Your Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Female",
		"activity" : "Undress Your Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Undress Your Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Undress Your Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Indifferent",
		"activity" : "Undress Your Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Male",
		"activity" : "Cuddle (Naked or Clothed)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Female",
		"activity" : "Cuddle (Naked or Clothed)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Cuddle (Naked or Clothed)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Cuddle (Naked or Clothed)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Indifferent",
		"activity" : "Cuddle (Naked or Clothed)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Male",
		"activity" : "Massage Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Female",
		"activity" : "Massage Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Massage Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Massage Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Indifferent",
		"activity" : "Massage Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Male",
		"activity" : "Play with Partner's Hair",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Female",
		"activity" : "Play with Partner's Hair",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Play with Partner's Hair",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Play with Partner's Hair",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Indifferent",
		"activity" : "Play with Partner's Hair",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Male",
		"activity" : "Apply Massage Oil",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Female",
		"activity" : "Apply Massage Oil",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Apply Massage Oil",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Apply Massage Oil",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Indifferent",
		"activity" : "Apply Massage Oil",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Male",
		"activity" : "Dance (Naked or Clothed)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Female",
		"activity" : "Dance (Naked or Clothed)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Dance (Naked or Clothed)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Dance (Naked or Clothed)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Indifferent",
		"activity" : "Dance (Naked or Clothed)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Male",
		"activity" : "Say Something Sexy",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Female",
		"activity" : "Say Something Sexy",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Say Something Sexy",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Say Something Sexy",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Indifferent",
		"activity" : "Say Something Sexy",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Male",
		"activity" : "Play with a Sex Toy (No Insertion)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Female",
		"activity" : "Play with a Sex Toy (No Insertion)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Play with a Sex Toy (No Insertion)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Play with a Sex Toy (No Insertion)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Indifferent",
		"activity" : "Play with a Sex Toy (No Insertion)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Male",
		"activity" : "Flirt with Your Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Female",
		"activity" : "Flirt with Your Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Flirt with Your Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Flirt with Your Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Indifferent",
		"activity" : "Flirt with Your Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Male",
		"activity" : "Decide to Have Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "If you decide to have sex, be sure you know your status and the status of your partner (HIV and STDs). Be prepared with a condom, dental dam or both. The best experiences come with both partners are completely honest with each other.",
		"safety" : ""
	}, {
		"orientation" : "Female",
		"activity" : "Decide to Have Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "If you decide to have sex, be sure you know your status and the status of your partner (HIV and STDs). Be prepared with a condom, dental dam or both. The best experiences come with both partners are completely honest with each other.",
		"safety" : ""
	}, {
		"orientation" : "Trans - M to F",
		"activity" : "Decide to Have Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "If you decide to have sex, be sure you know your status and the status of your partner (HIV and STDs). Be prepared with a condom, dental dam or both. The best experiences come with both partners are completely honest with each other.",
		"safety" : ""
	}, {
		"orientation" : "Trans - F to M",
		"activity" : "Decide to Have Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "If you decide to have sex, be sure you know your status and the status of your partner (HIV and STDs). Be prepared with a condom, dental dam or both. The best experiences come with both partners are completely honest with each other.",
		"safety" : ""
	}, {
		"orientation" : "Indifferent",
		"activity" : "Decide to Have Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "If you decide to have sex, be sure you know your status and the status of your partner (HIV and STDs). Be prepared with a condom, dental dam or both. The best experiences come with both partners are completely honest with each other.",
		"safety" : ""
	}]
};

/*
 var collection = Backbone.Collection.extend({
 comparator : function(model) {
 return model.get('orientation');
 }
 });

 var paytable = new collection(paytableData.data);

 var maleOrientation = paytable.where({
 orientation : 'Male'
 });
 Ti.API.debug('maleOrienation = ' + JSON.stringify(maleOrientation));

 for (var i = maleOrientation.length - 1; i >= 0; i--) {
 var male = maleOrientation[i];
 Ti.API.debug('male = ', JSON.stringify(male));
 };

 var orientation = 'Male';
 var activity = 'Giving Anal Sex';
 var protection = 'Condom';
 */

var argsTitleContol = {
	leftTitle: "SEX",
	title: "SAFE"
};

$.shakeItWin.titleControl = Alloy.createController('NavTitleControl', argsTitleContol).getView();

$.shakeItWin.rightNavButton = Alloy.createController('NavRightButton', {}).getView();
$.shakeItWin.leftNavButton = Alloy.createController('NavLeftButton', {}).getView();

// create game view
var game = platino.createGameView();

// TODO disables debug logs (not to be used for production)
if (ENV_PRODUCTION) {
	game.debug = false;
} else {
	game.debug = true;
}
game.debug = true;

game.getTiScale = function(x, y) {
	return {
		x : (x / game.touchScaleX),
		y : (y / game.touchScaleY)
	};
};

// create a game scene
var scene = platino.createScene();
scene.color(0, 0, 0);

var touchable = [];

//add your scene to game view
game.pushScene(scene);
/////////////////////////////
// Add transform for the lever
var transform = platino.createTransform();
transform.duration = 1000;
transform.y = 400;

// User is allowed to spin
var canSpin = true;

// Variable for the original Y of the lever
var oY;
var reel1Y = 0, reel2Y = 0, reel3Y = 0;

// Background
// var bg = platino.createSprite({image:"graphics/bg.png"});
// scene.add(bg);

var topBorder, reel1, reel2, reel3, lever;
var genderUnLockIcon, genderLockIcon, genderLockLabel, isGenderLocked;
var activityUnLockIcon, activityLockIcon, activityLockLabel, isActivityLocked;
var protectionUnLockIcon, protectionLockIcon, protectionLockLabel, isProtectionLocked;
var riskLabel, safetyLabel;
var armFrame;
var touchToSpinButton, resultsButton, resultsNewButton, tryAgainButton;

function lockGender() {
	if (!isGenderLocked) {
		genderLockIcon.alpha = 0;
		genderUnLockIcon.alpha = 1;
		genderLockLabel.color(0, 0, 0);
	} else {
		genderLockIcon.alpha = 1;
		genderUnLockIcon.alpha = 0;
		genderLockLabel.color(1, 1, 1);
	}

}

function onGenderLockTouch(e) {
	Ti.API.debug("BEGIN - onGenderLockTouch: " + JSON.stringify(e));
	var type, sprite;

	type = e.type;
	sprite = e.source;

	if (type === 'touchstart') {
		Ti.API.info('Touch started on Your Gender sprite.');

	} else if (type === 'touchmove') {
		Ti.API.info('Touch moved on Your Gender sprite.');

	} else if (type === 'touchend') {
		Ti.API.info('Touch ended on Your Gender sprite.');
		isGenderLocked = !isGenderLocked;
		lockGender();
	}

}

function lockActivity() {
	if (!isActivityLocked) {
		activityLockIcon.alpha = 0;
		activityUnLockIcon.alpha = 1;
		activityLockLabel.color(0, 0, 0);
	} else {
		activityLockIcon.alpha = 1;
		activityUnLockIcon.alpha = 0;
		activityLockLabel.color(1, 1, 1);
	}
}

function onActivityLockTouch(e) {
	Ti.API.debug("BEGIN - onActivityLockTouch: " + JSON.stringify(e));
	var type, sprite;

	type = e.type;
	sprite = e.source;

	if (type === 'touchstart') {
		Ti.API.info('Touch started on Activity sprite.');

	} else if (type === 'touchmove') {
		Ti.API.info('Touch moved on Activity sprite.');

	} else if (type === 'touchend') {
		Ti.API.info('Touch ended on Activity sprite.');
		isActivityLocked = !isActivityLocked;
		lockActivity();
	}

}

function lockProtection() {
	if (!isProtectionLocked) {
		protectionLockIcon.alpha = 0;
		protectionUnLockIcon.alpha = 1;
		protectionLockLabel.color(0, 0, 0);
	} else {
		protectionLockIcon.alpha = 1;
		protectionUnLockIcon.alpha = 0;
		protectionLockLabel.color(1, 1, 1);
	}
}

function onProtectionIconTouch(e) {
	Ti.API.debug("BEGIN - onProtectionIconTouch: " + JSON.stringify(e));
	var type, sprite;

	type = e.type;
	sprite = e.source;

	if (type === 'touchstart') {
		Ti.API.info('Touch started on Protection sprite.');

	} else if (type === 'touchmove') {
		Ti.API.info('Touch moved on Protection sprite.');

	} else if (type === 'touchend') {
		Ti.API.info('Touch ended on Protection sprite.');
		isProtectionLocked = !isProtectionLocked;
		lockProtection();
	}

}

function displayWin() {
	Ti.API.debug('ShakeIt.' + arguments.callee.name);

	var args = {
		win : win
	};

	var contactController = Alloy.createController('DisplayWin', args);

	if (OS_IOS) {
		contactController.getView().open();
	}
};

function onResultsButtonTouch(e) {
	Ti.API.debug("BEGIN - onResultsButtonTouch: " + JSON.stringify(e));
	var type, sprite;

	type = e.type;
	sprite = e.source;

	if (type === 'touchstart') {
		Ti.API.info('Touch started on Protection sprite.');

	} else if (type === 'touchmove') {
		Ti.API.info('Touch moved on Protection sprite.');
		armFrame.animate(0, 5, 50, 0);
	} else if (type === 'touchend') {
		Ti.API.info('Touch ended on Protection sprite.');
		if (e.tag == 'resultsButton') {
			resultsNewButton.alpha = 0;
			resultsButton.alpha = 0;
			tryAgainButton.alpha = 0;
			touchToSpinButton.alpha = 1;
			touchToSpinButton.animate(0,4,500,-1);
			displayWin();
		} else if (e.tag == 'resultsNewButton') {
			resultsNewButton.alpha = 0;
			resultsButton.alpha = 1;
			tryAgainButton.alpha = 0;
			touchToSpinButton.alpha = 0;
			displayWin();
		} else if (e.tag == 'tryAgainButton') {
			resultsNewButton.alpha = 0;
			resultsButton.alpha = 0;
			tryAgainButton.alpha = 0;
			touchToSpinButton.alpha = 0;
			armFrame.animate(0, 5, 50, 0);
			spin();
		} else if (e.tag == 'touchToSpinButton') {
			resultsNewButton.alpha = 0;
			resultsButton.alpha = 0;
			tryAgainButton.alpha = 0;
			touchToSpinButton.alpha = 0;
			touchToSpinButton.pauseAt(0);
			armFrame.animate(0, 5, 50, 0);
			spin();
		}
	}

}

/*

 function onResultsNewButtonTouch(e) {
 Ti.API.debug("BEGIN - onResultsNewButtonTouch: " + JSON.stringify(e));
 var type, sprite;

 type = e.type;
 sprite = e.source;

 if (type === 'touchstart') {
 Ti.API.info('Touch started on Protection sprite.');

 } else if (type === 'touchmove') {
 Ti.API.info('Touch moved on Protection sprite.');

 } else if (type === 'touchend') {
 Ti.API.info('Touch ended on Protection sprite.');
 resultsNewButton.alpha = 0;
 resultsButton.alpha = 0;
 tryAgainButton.alpha = 0;
 touchToSpinButton.alpha = 1;
 displayWin();
 }

 }

 function onTryAgainButtonTouch(e) {
 Ti.API.debug("BEGIN - onTryAgainButtonTouch: " + JSON.stringify(e));
 var type, sprite;

 type = e.type;
 sprite = e.source;

 if (type === 'touchstart') {
 Ti.API.info('Touch started on Protection sprite.');

 } else if (type === 'touchmove') {
 Ti.API.info('Touch moved on Protection sprite.');
 armFrame.animate(0, 5, 250, 0);
 } else if (type === 'touchend') {
 Ti.API.info('Touch ended on Protection sprite.');
 resultsNewButton.alpha = 0;
 resultsButton.alpha = 0;
 tryAgainButton.alpha = 0;
 touchToSpinButton.alpha = 1;
 spin();
 }
 }
 */

function onLeverTouch(e) {
	Ti.API.debug("BEGIN - onLeverTouch: " + JSON.stringify(e));
	var type, sprite;

	type = e.type;
	sprite = e.source;

	if (type === 'touchstart') {
		Ti.API.info('Touch started on first sprite.');
	} else if (type === 'touchmove') {
		Ti.API.info('Touch moved on first sprite.');
		resultsNewButton.alpha = 0;
		resultsButton.alpha = 0;
		tryAgainButton.alpha = 0;
		touchToSpinButton.pauseAt(0);
		armFrame.animate(0, 5, 50, 0);
		spin();
	} else if (type === 'touchend') {
		Ti.API.info('Touch ended on first sprite.');
	}

}

function findFrameIdx(reel, reelYPos, newYPos) {
	Ti.API.debug("reelYPos = " + reelYPos);
	Ti.API.debug("reel.frameCount = " + reel.frameCount);
	Ti.API.debug("reel.frame = " + reel.frame);
	var frameIdx = reel.frame;
	if (reelYPos < (newYPos - 10)) {
		frameIdx -= 2;
		if (frameIdx < 0) {
			frameIdx = reel.frameCount - 2;
		}
	} else if (reelYPos > (newYPos + 10)) {
		frameIdx += 2;
		if (frameIdx >= reel.frameCount) {
			frameIdx = 0;
		}
	}
	return frameIdx;
}

var scrubAnimationTime = 750;

function onReelTouch(e) {
	Ti.API.debug("BEGIN - onReelTouch: " + JSON.stringify(e));
	var type, sprite;

	type = e.type;
	sprite = e.source;
	if (type === 'touchstart') {
		Ti.API.info('Touch started on Reel sprite.');
	} else if (type === 'touchmove') {
		Ti.API.info('Touch moved on Reel sprite.');
		if (e.tag == 'reel1') {
			if (reel1Y != 0) {
				var frameIdx = findFrameIdx(reel1, reel1Y, e.y);
				reel1Random = frameIdx;
				isGenderLocked = true;
				lockGender();
				Ti.API.debug("frameIdx = " + frameIdx);
				reel1.animate([frameIdx], scrubAnimationTime, 0, 0);
			}
			reel1Y = e.y;

		} else if (e.tag == 'reel2') {
			Ti.API.debug("reel2Y = " + reel2Y);
			if (reel2Y != 0) {
				var frameIdx = findFrameIdx(reel2, reel2Y, e.y);
				reel2Random = frameIdx;
				isActivityLocked = true;
				lockActivity();
				Ti.API.debug("frameIdx = " + frameIdx);
				reel2.animate([frameIdx], scrubAnimationTime, 0, 0);
			}
			reel2Y = e.y;

		} else if (e.tag == 'reel3') {
			Ti.API.debug("reel3Y = " + reel3Y);
			if (reel3Y != 0) {
				var frameIdx = findFrameIdx(reel3, reel3Y, e.y);
				reel3Random = frameIdx;
				isProtectionLocked = true;
				lockProtection();
				Ti.API.debug("frameIdx = " + frameIdx);
				reel3.animate([frameIdx], scrubAnimationTime, 0, 0);
			}
			reel3Y = e.y;

		}
	} else if (type === 'touchend') {
		Ti.API.info('Touch ended on Reel sprite.');
	}

}

var oldPRessFontName = 'Old Press';
if (OS_ANDROID) {
	oldPRessFontName = 'Old-Press';
}

function initGameScene() {
	Ti.API.debug("BEGIN - initGameScene");

	var suffix = "-hd";
	var imageSuffix = "@2x";

	// if (game.screen.width == 320 || game.screen.width == 480) {//iphone 2G,3G 3GS
	// suffix = "";
	// }

	var scaleFactor = 1;
	var imageScaleFactor = 1;
	var positionFactor = 1;
	var fontFactor = 1;
	var lockLabelFontSize = 24;

	if (OS_ANDROID) {
		if (game.size.width == 360) {
			scaleFactor = 1.75;
			imageScaleFactor = 1.75;
			fontFactor = 1.75;
			positionFactor = 1.75;
			imageSuffix = "";
		} else if (game.size.width == 320) {
			scaleFactor = 2;
			imageScaleFactor = 2;
			fontFactor = 2;
			positionFactor = 2;
			imageSuffix = "";
		}
	}
	if (OS_IOS) {
		if (Ti.Platform.displayCaps.dpi == 160) {
			scaleFactor = 1;
			imageScaleFactor = 2;
			positionFactor = 2;
			fontFactor = 2;
			suffix = "";
			imageSuffix = "";
		}
	}
	var lockImage = 'images/LockedIcon' + imageSuffix + '.png';
	var unLockImage = 'images/UnlockedIcon' + imageSuffix + '.png';

	Ti.API.debug("BEGIN - scaleFactor = " + scaleFactor);
	Ti.API.debug("BEGIN - positionFactor = " + positionFactor);
	Ti.API.debug("BEGIN - suffix = " + suffix);

	var reelFrame = platino.createSprite({
		image : "images/ReelFrame.png",
		x : 0 / positionFactor,
		y : 0 / positionFactor,
		width : 640 / imageScaleFactor,
		height : 476 / imageScaleFactor
	});

	topBorder = platino.createCanvasSprite({
		x : 0,
		y : 0,
		width : game.screen.width,
		height : 13
	});
	topBorder.color(0, 0, 0);
	topBorder.fillRect(0, 0, topBorder.width, topBorder.height);

	genderLockIcon = platino.createSprite({
		image : lockImage,
		width : 30 / imageScaleFactor,
		height : 30 / imageScaleFactor,
		x : 40 / positionFactor,
		y : 50 / positionFactor,
		alpha : 0
	});
	touchable.push(genderLockIcon);
	genderLockIcon.addEventListener('touchend', onGenderLockTouch);

	genderUnLockIcon = platino.createSprite({
		image : unLockImage,
		width : 30 / imageScaleFactor,
		height : 30 / imageScaleFactor,
		x : 40 / positionFactor,
		y : 50 / positionFactor,
		alpha : 1
	});
	touchable.push(genderUnLockIcon);
	genderUnLockIcon.addEventListener('touchend', onGenderLockTouch);
	isGenderLocked = false;

	genderLockLabel = platino.createTextSprite({
		text : 'Your Gender',
		fontSize : lockLabelFontSize / fontFactor,
		x : 75 / positionFactor,
		y : 55 / positionFactor
	});
	genderLockLabel.width += 60;
	genderLockLabel.height += 15;
	touchable.push(genderLockLabel);
	genderLockLabel.addEventListener('touchend', onGenderLockTouch);

	activityLockIcon = platino.createSprite({
		image : lockImage,
		width : 30 / imageScaleFactor,
		height : 30 / imageScaleFactor,
		x : 260 / positionFactor,
		y : 50 / positionFactor,
		alpha : 0
	});
	touchable.push(activityLockIcon);
	activityLockIcon.addEventListener('touchend', onActivityLockTouch);
	isActivityLocked = false;

	activityUnLockIcon = platino.createSprite({
		image : unLockImage,
		width : 30 / imageScaleFactor,
		height : 30 / imageScaleFactor,
		x : 260 / positionFactor,
		y : 50 / positionFactor,
		alpha : 1
	});
	touchable.push(activityUnLockIcon);
	activityUnLockIcon.addEventListener('touchend', onActivityLockTouch);

	activityLockLabel = platino.createTextSprite({
		text : 'Activity',
		fontSize : lockLabelFontSize / fontFactor,
		x : 295 / positionFactor,
		y : 55 / positionFactor
	});
	activityLockLabel.width += 60;
	activityLockLabel.height += 15;
	touchable.push(activityLockLabel);
	activityLockLabel.addEventListener('touchend', onActivityLockTouch);

	protectionLockIcon = platino.createSprite({
		image : lockImage,
		width : 30 / imageScaleFactor,
		height : 30 / imageScaleFactor,
		x : 445 / positionFactor,
		y : 50 / positionFactor,
		alpha : 0
	});
	touchable.push(protectionLockIcon);
	protectionLockIcon.addEventListener('touchend', onProtectionIconTouch);

	protectionUnLockIcon = platino.createSprite({
		image : unLockImage,
		width : 30 / imageScaleFactor,
		height : 30 / imageScaleFactor,
		x : 445 / positionFactor,
		y : 50 / positionFactor,
		alpha : 1
	});
	touchable.push(protectionUnLockIcon);
	protectionUnLockIcon.addEventListener('touchend', onProtectionIconTouch);
	isProtectionLocked = false;

	protectionLockLabel = platino.createTextSprite({
		text : 'Protection',
		fontSize : lockLabelFontSize / fontFactor,
		x : 480 / positionFactor,
		y : 55 / positionFactor
	});
	protectionLockLabel.width += 60;
	protectionLockLabel.height += 15;
	touchable.push(protectionLockLabel);
	protectionLockLabel.addEventListener('touchend', onProtectionIconTouch);

	var stopIdx = 0;
	for (var i = 0, j = reels.reel1.numberOfSprites; i < j; i++) {
		reels.reel1.spriteNames[i] = "Reel1Frame" + String.format("%02d", i) + "@2X.png";
		reels.reel1.stops[i] = stopIdx;
		if (i % 2 == 0) {
			stopIdx += 2;
		}
	};

	stopIdx = 0;
	for (var i = 0, j = reels.reel2.numberOfSprites; i < j; i++) {
		reels.reel2.spriteNames[i] = "Reel2Frame" + String.format("%02d", i) + "@2X.png";
		reels.reel2.stops[i] = stopIdx;
		if (i % 2 == 0) {
			stopIdx += 2;
		}
	};

	stopIdx = 0;
	for (var i = 0, j = reels.reel3.numberOfSprites; i < j; i++) {
		reels.reel3.spriteNames[i] = "Reel3Frame" + String.format("%02d", i) + "@2X.png";
		reels.reel3.stops[i] = stopIdx;
		if (i % 2 == 0) {
			stopIdx += 2;
		}
	};

	armFrame = platino.createSpriteSheet({
		asset : 'graphics/Reels_ArmFrame' + suffix + '.xml',
		x : 580 / positionFactor,
		y : 480 / positionFactor,
		scaleX : 1 / scaleFactor,
		scaleY : 1 / scaleFactor
	});
	touchable.push(armFrame);
	armFrame.addEventListener('touchstart', onLeverTouch);
	armFrame.addEventListener('touchmove', onLeverTouch);
	armFrame.addEventListener('touchend', onLeverTouch);

	// Reel spritesheets
	reel1 = platino.createSpriteSheet({
		asset : 'graphics/Reels_Reel1' + suffix + '.xml',
		tag : 'reel1',
		x : 40 / positionFactor,
		y : 100 / positionFactor,
		scaleX : 1 / scaleFactor,
		scaleY : 1 / scaleFactor
	});
	reel1.selectFrame(reels.reel1.spriteNames[0]);
	touchable.push(reel1);
	reel1.addEventListener('touchmove', onReelTouch);

	reel2 = platino.createSpriteSheet({
		asset : 'graphics/Reels_Reel2' + suffix + '.xml',
		tag : 'reel2',
		x : 230 / positionFactor,
		y : 100 / positionFactor,
		scaleX : 1 / scaleFactor,
		scaleY : 1 / scaleFactor
	});
	reel2.selectFrame(reels.reel2.spriteNames[0]);
	touchable.push(reel2);
	reel2.addEventListener('touchmove', onReelTouch);

	reel3 = platino.createSpriteSheet({
		asset : 'graphics/Reels_Reel3' + suffix + '.xml',
		tag : 'reel3',
		x : 420 / positionFactor,
		y : 100 / positionFactor,
		scaleX : 1 / scaleFactor,
		scaleY : 1 / scaleFactor
	});
	reel3.selectFrame(reels.reel3.spriteNames[0]);
	touchable.push(reel3);
	reel3.addEventListener('touchmove', onReelTouch);

	// Dimmers at top and bottom of screen
	// var borders = platino.createSprite({image:"graphics/mask.png"});
	// scene.add(borders);

	var winLine = platino.createSprite({
		image : "images/WinningLine.png",
		x : 0 / positionFactor,
		y : 200 / positionFactor,
		width : 640 / imageScaleFactor,
		height : 154 / imageScaleFactor
	});

	var slotMachine = platino.createSprite({
		image : "images/SlotMachine.png",
		x : 0 / positionFactor,
		y : 476 / positionFactor,
		width : 640 / imageScaleFactor,
		height : 444 / imageScaleFactor
	});

	touchToSpinButton = platino.createSpriteSheet({
		asset : 'graphics/Reels_PullHandle' + suffix + '.xml',
		tag : "touchToSpinButton",
		x : 100 / positionFactor,
		y : 532 / positionFactor,
		scaleX : 1 / scaleFactor,
		scaleY : 1 / scaleFactor
	});
	touchToSpinButton.pauseAt(0);
	touchable.push(touchToSpinButton);
	touchToSpinButton.addEventListener('touchend', onResultsButtonTouch);

	resultsButton = platino.createSprite({
		image : "images/ResultsButton.png",
		tag : "resultsButton",
		x : 120 / positionFactor,
		y : 540 / positionFactor,
		width : 400 / imageScaleFactor,
		height : 76 / imageScaleFactor,
		alpha : 0
	});
	touchable.push(resultsButton);
	resultsButton.addEventListener('touchend', onResultsButtonTouch);

	resultsNewButton = platino.createSprite({
		image : "images/ResultsNewButton.png",
		tag : "resultsNewButton",
		x : 120 / positionFactor,
		y : 540 / positionFactor,
		width : 400 / imageScaleFactor,
		height : 76 / imageScaleFactor,
		alpha : 0
	});
	touchable.push(resultsNewButton);
	resultsNewButton.addEventListener('touchend', onResultsButtonTouch);

	tryAgainButton = platino.createSprite({
		image : "images/TryAgainButton.png",
		tag : "tryAgainButton",
		x : 120 / positionFactor,
		y : 540 / positionFactor,
		width : 400 / imageScaleFactor,
		height : 76 / imageScaleFactor,
		alpha : 0
	});
	touchable.push(tryAgainButton);
	tryAgainButton.addEventListener('touchend', onResultsButtonTouch);

	var divider1 = platino.createSprite({
		image : "images/ReelLabelDivider.png",
		x : 224 / positionFactor,
		y : 40 / positionFactor,
		width : 4 / imageScaleFactor,
		height : 48 / imageScaleFactor
	});

	var divider2 = platino.createSprite({
		image : "images/ReelLabelDivider.png",
		x : 412 / positionFactor,
		y : 40 / positionFactor,
		width : 4 / imageScaleFactor,
		height : 48 / imageScaleFactor
	});

	scene.add(reel1);
	scene.add(reel2);
	scene.add(reel3);
	scene.add(reelFrame);
	scene.add(winLine);
	scene.add(slotMachine);
	scene.add(topBorder);
	scene.add(genderLockIcon);
	scene.add(genderUnLockIcon);
	scene.add(genderLockLabel);
	scene.add(activityLockIcon);
	scene.add(activityUnLockIcon);
	scene.add(activityLockLabel);
	scene.add(protectionLockIcon);
	scene.add(protectionUnLockIcon);
	scene.add(protectionLockLabel);
	scene.add(divider1);
	scene.add(divider2);
	scene.add(armFrame);
	scene.add(resultsButton);
	scene.add(resultsNewButton);
	scene.add(tryAgainButton);
	scene.add(touchToSpinButton);
	// scene.add(lever);

	// riskLabel = platino.createTextSprite({
	// text : '',
	// fontSize : 24 / fontFactor,
	// x : 10 / positionFactor,
	// y : 500 / positionFactor,
	// width : (game.screen.width - (85/positionFactor)),
	// height : 90 / scaleFactor
	// });
	// riskLabel.color(1,1,1);
	// scene.add(riskLabel);
	// touchable.push(riskLabel);
	// riskLabel.addEventListener('touchend', onLeverTouch);

	// safetyLabel = platino.createTextSprite({
	// text : '',
	// fontSize : 24 / fontFactor,
	// x : 10 / positionFactor,
	// y : 600 / positionFactor,
	// width : (game.screen.width - (85/positionFactor)),
	// height : 90 / scaleFactor
	// });
	// safetyLabel.color(1,1,1);
	// scene.add(safetyLabel);

}

// Add coin text
// var coinText = platino.createTextSprite({text:"Coins: "+coins, fontSize:20,
// width:150, height:50, x:25,y:10});
// scene.add(coinText);

// Add spin text and light
// var spinText = platino.createTextSprite({text:"Spin:", fontSize:20, width:150,
// height:50, x:300, y:10});
// scene.add(spinText);
// var spinLight = platino.createSpriteSheet({image:"graphics/greenLight.png",
// width:35, height:35, x:350, y:5});
// scene.add(spinLight);

var collection = Backbone.Collection.extend({
	comparator : function(model) {
		return model.get('orientation');
	}
});

var paytable = new collection(paytableData.data);
var activityMapping = new collection(activityMapping.data);
var reel1Random, reel2Random, reel3Random;

var win = {
	risk : "",
	safety : "",
	orientation : "",
	activity : "",
	protection : "",
	winFound: true
};

// Check reels, show particle effect if winning spin, allow user to spin again
function checkWin() {

	Ti.API.debug('reel1.frame = ' + reel1.frame);
	Ti.API.debug('reel2.frame = ' + reel2.frame);
	Ti.API.debug('reel3.frame = ' + reel3.frame);

	Ti.API.debug('reel1Random = ' + reel1Random);
	Ti.API.debug('reel2Random = ' + reel2Random);
	Ti.API.debug('reel3Random = ' + reel3Random);

	var orientation = reels.reel1.symbolNames[reel1Random / 2];
	var activity = reels.reel2.symbolNames[reel2Random / 2];
	var protection = reels.reel3.symbolNames[reel3Random / 2];

	Ti.API.debug('orientation = ' + orientation);
	Ti.API.debug('activity = ' + activity);
	Ti.API.debug('protection = ' + protection);

	var activities = activityMapping.where({
		mapping : orientation + ':' + activity
	});
	Ti.API.debug('activities.length = ' + activities.length);

	if (activities.length > 0) {

		var randomIdx = Math.floor(Math.random() * (activities.length));
		var activityRandom = activities[randomIdx];
		var activityName = activityRandom.attributes.activity;

		Ti.API.debug('randomIdx = ' + randomIdx);
		Ti.API.debug('activityRandom = ' + activityRandom);
		Ti.API.debug('activityName = ' + activityName);

		var outcome = paytable.find(function(item) {
			// Ti.API.debug('item = ', JSON.stringify(item));
			if (item.attributes.orientation == orientation) {
				if (item.attributes.activity == activityName) {
					if (item.attributes.protection.indexOf(protection) != -1) {
						return item;
					}
				}
			}
		});

		if (outcome != undefined) {
			Ti.API.debug('outcome = ' + JSON.stringify(outcome));

			var indexStr = "If " + protection + ":";
			var safety = outcome.attributes.safety;
			var safetyDetailIdx = safety.indexOf(indexStr);
			if (safetyDetailIdx != -1) {
				var nextColon = safety.indexOf(".  If", safetyDetailIdx + indexStr.length);
				if (nextColon != -1) {
					safety = safety.substr(safetyDetailIdx, (nextColon - safetyDetailIdx) + 1);
				} else {
					safety = safety.substr(safetyDetailIdx);
				}
			}

			Ti.API.debug('outcome.risk = ' + outcome.attributes.risk);
			Ti.API.debug('safety = ' + safety);
			win.risk = outcome.attributes.risk;
			win.safety = safety;
			win.activity = activityName;
			win.orientation = orientation;
			win.protection = protection;
			win.found = true;
		} else {
			win.risk = "Please spin again!";
			win.safety = "None.";
			win.found = false;
		}
	} else {
		win.risk = "Please spin again!";
		win.safety = "None.";
		win.found = false;
	}

	canSpin = true;
};

function displayWinButton() {
	if (win.found) {
		resultsNewButton.alpha = 1;
		resultsButton.alpha = 0;
		tryAgainButton.alpha = 0;
		touchToSpinButton.alpha = 0;
	} else {
		resultsButton.alpha = 0;
		resultsNewButton.alpha = 0;
		tryAgainButton.alpha = 1;
		touchToSpinButton.alpha = 0;
	}
}

// Stop the reels one by one, then check if user has won
function endRoll() {
	// Random values to stop at

	if (isGenderLocked == false) {
		reel1Random = reels.reel1.stops[Math.floor(Math.random() * (reel1.frameCount - 1))];
		reel1.pauseAt(reel1Random);
	}

	if (isActivityLocked == false) {
		reel2Random = reels.reel2.stops[Math.floor(Math.random() * (reel2.frameCount - 1))];
		setTimeout(function() {
			reel2.pauseAt(reel2Random);
		}, 500);
	}

	if (isProtectionLocked == false) {
		reel3Random = reels.reel3.stops[Math.floor(Math.random() * (reel3.frameCount - 1))];
		setTimeout(function() {
			reel3.pauseAt(reel3Random);
		}, 1000);
	}
	checkWin();
	if (isGenderLocked && isActivityLocked && isProtectionLocked) {
		displayWinButton();
	} else {
		setTimeout(displayWinButton, 1550);
	}
};

// Spin function
function spin() {
	// If user is allowed to spin, spin the reels
	if (canSpin == true) {
		canSpin = false;
		// spinLight.frame = 1;
		if (isGenderLocked == false) {
			reel1.animate(0, 10, 50, -1);
		}

		if (isActivityLocked == false) {
			reel2.animate(0, 32, 70, -1);
		}

		if (isProtectionLocked == false) {
			reel3.animate(0, 8, 90, -1);
		}

		// Stop the reels randomly between .8 and 2.5 seconds
		var ranVal = Math.floor((Math.random() * 4000) + 800);
		if (isGenderLocked && isActivityLocked && isProtectionLocked) {
			endRoll();
		} else {
			setTimeout(endRoll, ranVal);
		}

	}
};

var TOUCH_SCALE = 1;

function onScreenTouch(e) {
	Ti.API.debug("BEGIN - onScreenTouch: " + JSON.stringify(e));
	var _event, i, sprite;

	// Create a new object to send with the event
	var _event = {
		x : e.x * TOUCH_SCALE,
		y : e.y * TOUCH_SCALE
	};

	// iterate backwards so last items added to 'touchable' array
	// receive touch events first
	for ( i = touchable.length - 1; i >= 0; i--) {
		sprite = touchable[i];
		// Ti.API.debug('Checking sprite: x=' + sprite.x + ", y=" + sprite.y);

		if (sprite.alpha > 0 && sprite.contains(_event.x, _event.y)) {
			Ti.API.debug('Sprite found!');
			var args = {
				x : e.x * TOUCH_SCALE,
				y : e.y * TOUCH_SCALE,
				tag : sprite.tag
			};
			sprite.fireEvent(e.type, args);
			break;
		}
	}
};

////////////
game.addEventListener("touchstart", function(e) {
	Ti.API.debug("BEGIN - touchstart");
	onScreenTouch(e);
	/*
	 if (lever.contains(e.x, e.y) && lever.y > 45 && lever.y < 245) {
	 oY = lever.y - e.y;
	 }
	 */
});
game.addEventListener("touchmove", function(e) {
	Ti.API.debug("BEGIN - touchmove");
	onScreenTouch(e);
	/*
	 if (lever.contains(e.x, e.y) && lever.y > 45 && lever.y < 245) {
	 lever.y = e.y + oY;
	 }
	 */
});
////////////
// Listener to spin
game.addEventListener("touchend", function(e) {
	Ti.API.debug("BEGIN - touchend");
	onScreenTouch(e);
	/*
	 if (lever.y > 49) {
	 spin();
	 }
	 transform.duration = lever.y * 1.5;
	 lever.transform(transform);
	 */
});
////////////////////////////

game.addEventListener("onload", function(e) {
	Ti.API.debug("BEGIN - onload");
	Ti.API.info('******************************** isDeviceSupported = ' + game.isDeviceSupported());

	Ti.API.info("game.screen = " + game.screen.width + " x " + game.screen.height);
	Ti.API.info("game.size = " + game.size.width + " x " + game.size.height);

	TOUCH_SCALE = game.screen.width / game.size.width;

	initGameScene();

	// Start the game
	game.start();
	
	touchToSpinButton.animate(0,4,500,-1);



});

function spinOnShake(e) {
	Ti.API.trace('ShakeIt.' + arguments.callee.name);
	 spin();
}

function enableShake() { 
	Ti.API.trace('ShakeIt.' + arguments.callee.name);
	 Ti.Gesture.addEventListener('shake', spinOnShake);
}

function disableShake() {
	Ti.API.trace('ShakeIt.' + arguments.callee.name);
	 Ti.Gesture.removeEventListener('shake', spinOnShake);
}

Ti.App.addEventListener('pause', disableShake);
Ti.App.addEventListener('resumed', enableShake);

function init() {
	Ti.API.trace('ShakeIt.' + arguments.callee.name);
	// Add objects and open game window
	$.shakeItWin.add(game);
	enableShake();
}

function openWebView() {
	var args = {
	};

	var controller = Alloy.createController('BetOnThisNVWebView', args);

	if (OS_IOS) {
		controller.getView().open();
	}
}

function openAboutView() {
	var args = {
	};

	var controller = Alloy.createController('About', args);

	if (OS_IOS) {
		controller.getView().open();
	}
}


// Android
if (OS_ANDROID) {
	$.shakeItTab.addEventListener('focus', function() {
		if ($.shakeItTab.tabGroup.activity) {
			var activity = $.shakeItTab.tabGroup.activity;

			// Menu
			activity.invalidateOptionsMenu();
			activity.onCreateOptionsMenu = function(e) {
				var menu = e.menu;
				var menuItem1 = menu.add({
					// title: 'Bet On This',
					titleCondensed : 'Bet On This',
					icon : 'images/BetOnThisIcon.png',
					showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
				});
				menuItem1.addEventListener('click', openWebView);
			};

			// Action Bar
			if (Alloy.Globals.Android.Api >= 11 && activity.actionBar != null) {
				activity.actionBar.title = 'NV SexSafe';
				activity.actionBar.onHomeIconItemSelected = openAboutView;
			}
		}
	});
}

function open() {

	init();

}
