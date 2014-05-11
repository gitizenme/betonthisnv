// require Platino
var platino = require("co.lanica.platino");

if (OS_IOS) {
	Ti.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;
}

var reelScrobbleSound = Ti.Media.createSound({
	url : '/sounds/ActionMovement_AP1.74.mp3'
});

var touchForResultsSound = Ti.Media.createSound({
	url : '/sounds/ButtonPush_S011FO.79.mp3'
});

var reel1StopSound = Ti.Media.createSound({
	url : '/sounds/ButtonSwitchGear_S08TE.204.mp3'
});
var reel2StopSound = Ti.Media.createSound({
	url : '/sounds/ButtonSwitchGear_S08TE.204.mp3'
});
var reel3StopSound = Ti.Media.createSound({
	url : '/sounds/ButtonSwitchGear_S08TE.204.mp3'
});

var winningSpinSound = Ti.Media.createSound({
	url : '/sounds/Win_Beeps.mp3'
});

var leverPullSound = Ti.Media.createSound({
	url : '/sounds/LeverCrankShort_SEU02.35.mp3'
});

var reelSpinMusicSound = Ti.Media.createSound({
	url : '/sounds/MarimbaArpeggio_S08MU.721.mp3'
});
reelSpinMusicSound.looping = true;

var tryAgainSound = Ti.Media.createSound({
	url : '/sounds/MMFX_GLITCH BUZZ_SB01.439.mp3'
});

var reelSpinGearsSound = Ti.Media.createSound({
	url : '/sounds/PhonographCrank_S011TE.775.mp3'
});
reelSpinGearsSound.looping = true;

var args = {
	title : "SEX SAFE"
};

var reels = {
	reel1 : {
		numberOfSprites : 10,
		spriteNames : [],
		symbolNames : ["Woman", "Trans-Woman", "Trans-Man", "Genderqueer", "Man"],
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
		"mapping" : "Man:Anal Sex",
		"activity" : "Giving Anal Sex"
	}, {
		"mapping" : "Woman:Anal Sex",
		"activity" : "Giving Anal Sex"
	}, {
		"mapping" : "Trans-Man:Anal Sex",
		"activity" : "Giving Anal Sex"
	}, {
		"mapping" : "Trans-Woman:Anal Sex",
		"activity" : "Giving Anal Sex"
	}, {
		"mapping" : "Genderqueer:Anal Sex",
		"activity" : "Giving Anal Sex"
	}, {
		"mapping" : "Man:Oral Sex",
		"activity" : "Getting Oral Sex"
	}, {
		"mapping" : "Woman:Oral Sex",
		"activity" : "Getting Oral Sex"
	}, {
		"mapping" : "Trans-Man:Oral Sex",
		"activity" : "Getting Oral Sex"
	}, {
		"mapping" : "Trans-Woman:Oral Sex",
		"activity" : "Getting Oral Sex"
	}, {
		"mapping" : "Genderqueer:Oral Sex",
		"activity" : "Getting Oral Sex"
	}, {
		"mapping" : "Woman:Oral Sex",
		"activity" : "Going Down on a Vagina"
	}, {
		"mapping" : "Trans-Man:Oral Sex",
		"activity" : "Going Down on a Vagina"
	}, {
		"mapping" : "Trans-Woman:Oral Sex",
		"activity" : "Going Down on a Vagina"
	}, {
		"mapping" : "Genderqueer:Oral Sex",
		"activity" : "Going Down on a Vagina"
	}, {
		"mapping" : "Man:Anal Sex",
		"activity" : "Getting Anal Sex"
	}, {
		"mapping" : "Woman:Anal Sex",
		"activity" : "Getting Anal Sex"
	}, {
		"mapping" : "Trans-Man:Anal Sex",
		"activity" : "Getting Anal Sex"
	}, {
		"mapping" : "Trans-Woman:Anal Sex",
		"activity" : "Getting Anal Sex"
	}, {
		"mapping" : "Genderqueer:Anal Sex",
		"activity" : "Getting Anal Sex"
	}, {
		"mapping" : "Man:Oral Sex",
		"activity" : "Giving a Blow Job"
	}, {
		"mapping" : "Woman:Oral Sex",
		"activity" : "Giving a Blow Job"
	}, {
		"mapping" : "Trans-Man:Oral Sex",
		"activity" : "Giving a Blow Job"
	}, {
		"mapping" : "Trans-Woman:Oral Sexb",
		"activity" : "Giving a Blow Job"
	}, {
		"mapping" : "Genderqueer:Oral Sex",
		"activity" : "Giving a Blow Job"
	}, {
		"mapping" : "Man:Fingering",
		"activity" : "Fingering or Fisting"
	}, {
		"mapping" : "Woman:Fingering",
		"activity" : "Fingering or Fisting"
	}, {
		"mapping" : "Trans-Man:Fingering",
		"activity" : "Fingering or Fisting"
	}, {
		"mapping" : "Trans-Woman:Fingering",
		"activity" : "Fingering or Fisting"
	}, {
		"mapping" : "Genderqueer:Fingering",
		"activity" : "Fingering or Fisting"
	}, {
		"mapping" : "Man:Fisting",
		"activity" : "Fingering or Fisting"
	}, {
		"mapping" : "Woman:Fisting",
		"activity" : "Fingering or Fisting"
	}, {
		"mapping" : "Trans-Man:Fisting",
		"activity" : "Fingering or Fisting"
	}, {
		"mapping" : "Trans-Woman:Fisting",
		"activity" : "Fingering or Fisting"
	}, {
		"mapping" : "Genderqueer:Fisting",
		"activity" : "Fingering or Fisting"
	}, {
		"mapping" : "Man:Sex with Woman",
		"activity" : "Sex (Vaginal)"
	}, {
		"mapping" : "Woman:Sex with Man",
		"activity" : "Sex"
	}, {
		"mapping" : "Man:Sex with Man",
		"activity" : "Sex"
	}, {
		"mapping" : "Woman:Sex with Woman",
		"activity" : "Sex"
	}, {
		"mapping" : "Trans-Man:Sex with Man",
		"activity" : "Sex"
	}, {
		"mapping" : "Trans-Man:Sex with Woman",
		"activity" : "Sex"
	}, {
		"mapping" : "Trans-Man:Sex with Woman",
		"activity" : "Sex (Vaginal)"
	}, {
		"mapping" : "Trans-Woman:Sex with Woman",
		"activity" : "Sex (Vaginal)"
	}, {
		"mapping" : "Trans-Woman:Sex with Man",
		"activity" : "Sex"
	}, {
		"mapping" : "Trans-Woman:Sex with Woman",
		"activity" : "Sex"
	}, {
		"mapping" : "Trans-Man:Sex with Woman",
		"activity" : "Sex"
	}, {
		"mapping" : "Genderqueer:Sex with Woman",
		"activity" : "Sex"
	}, {
		"mapping" : "Genderqueer:Sex with Man",
		"activity" : "Sex"
	}, {
		"mapping" : "Man:Sex with Woman",
		"activity" : "Decide to Have Sex"
	}, {
		"mapping" : "Woman:Sex with Man",
		"activity" : "Decide to Have Sex"
	}, {
		"mapping" : "Trans-Man:Sex with Man",
		"activity" : "Decide to Have Sex"
	}, {
		"mapping" : "Trans-Woman:Sex with Woman",
		"activity" : "Decide to Have Sex"
	}, {
		"mapping" : "Genderqueer:Sex with Man",
		"activity" : "Decide to Have Sex"
	}, {
		"mapping" : "Man:Sex Toy",
		"activity" : "Insert a Sex Toy"
	}, {
		"mapping" : "Woman:Sex Toy",
		"activity" : "Insert a Sex Toy"
	}, {
		"mapping" : "Trans-Man:Sex Toy",
		"activity" : "Insert a Sex Toy"
	}, {
		"mapping" : "Trans-Woman:Sex Toy",
		"activity" : "Insert a Sex Toy"
	}, {
		"mapping" : "Genderqueer:Sex Toy",
		"activity" : "Insert a Sex Toy"
	}, {
		"mapping" : "Man:Sex Toy",
		"activity" : "Play with a Sex Toy (No Insertion)"
	}, {
		"mapping" : "Woman:Sex Toy",
		"activity" : "Play with a Sex Toy (No Insertion)"
	}, {
		"mapping" : "Trans-Man:Sex Toy",
		"activity" : "Play with a Sex Toy (No Insertion)"
	}, {
		"mapping" : "Trans-Woman:Sex Toy",
		"activity" : "Play with a Sex Toy (No Insertion)"
	}, {
		"mapping" : "Genderqueer:Sex Toy",
		"activity" : "Play with a Sex Toy (No Insertion)"
	}, {
		"mapping" : "Man:Dry Humping",
		"activity" : "Dry Humping"
	}, {
		"mapping" : "Woman:Dry Humping",
		"activity" : "Dry Humping"
	}, {
		"mapping" : "Trans-Man:Dry Humping",
		"activity" : "Dry Humping"
	}, {
		"mapping" : "Trans-Woman:Dry Humping",
		"activity" : "Dry Humping"
	}, {
		"mapping" : "Genderqueer:Dry Humping",
		"activity" : "Dry Humping"
	}, {
		"mapping" : "Man:Rubbing a Vagina",
		"activity" : "Rubbing a Vagina"
	}, {
		"mapping" : "Woman:Rubbing a Vagina",
		"activity" : "Rubbing a Vagina"
	}, {
		"mapping" : "Trans-Man:Rubbing a Vagina",
		"activity" : "Rubbing a Vagina"
	}, {
		"mapping" : "Trans-Woman:Rubbing a Vagina",
		"activity" : "Rubbing a Vagina"
	}, {
		"mapping" : "Genderqueer:Rubbing a Vagina",
		"activity" : "Rubbing a Vagina"
	}, {
		"mapping" : "Man:Masturbation",
		"activity" : "Masturbation"
	}, {
		"mapping" : "Woman:Masturbation",
		"activity" : "Masturbation"
	}, {
		"mapping" : "Trans-Man:Masturbation",
		"activity" : "Masturbation"
	}, {
		"mapping" : "Trans-Woman:Masturbation",
		"activity" : "Masturbation"
	}, {
		"mapping" : "Genderqueer:Masturbation",
		"activity" : "Masturbation"
	}, {
		"mapping" : "Man:Penis Rubbing",
		"activity" : "Penis Rubbing"
	}, {
		"mapping" : "Woman:Penis Rubbing",
		"activity" : "Penis Rubbing"
	}, {
		"mapping" : "Trans-Man:Penis Rubbing",
		"activity" : "Penis Rubbing"
	}, {
		"mapping" : "Trans-Woman:Penis Rubbing",
		"activity" : "Penis Rubbing"
	}, {
		"mapping" : "Genderqueer:Penis Rubbing",
		"activity" : "Penis Rubbing"
	}, {
		"mapping" : "Man:Rimming",
		"activity" : "Rimming (Licking) Anus"
	}, {
		"mapping" : "Woman:Rimming",
		"activity" : "Rimming (Licking) Anus"
	}, {
		"mapping" : "Trans-Man:Rimming",
		"activity" : "Rimming (Licking) Anus"
	}, {
		"mapping" : "Trans-Woman:Rimming",
		"activity" : "Rimming (Licking) Anus"
	}, {
		"mapping" : "Genderqueer:Rimming",
		"activity" : "Rimming (Licking) Anus"
	}, {
		"mapping" : "Man:Kissing",
		"activity" : "Kissing"
	}, {
		"mapping" : "Woman:Kissing",
		"activity" : "Kissing"
	}, {
		"mapping" : "Trans-Man:Kissing",
		"activity" : "Kissing"
	}, {
		"mapping" : "Trans-Woman:Kissing",
		"activity" : "Kissing"
	}, {
		"mapping" : "Genderqueer:Kissing",
		"activity" : "Kissing"
	}, {
		"mapping" : "Man:Scissoring",
		"activity" : "Scissoring"
	}, {
		"mapping" : "Woman:Scissoring",
		"activity" : "Scissoring"
	}, {
		"mapping" : "Trans-Man:Scissoring",
		"activity" : "Scissoring"
	}, {
		"mapping" : "Trans-Woman:Scissoring",
		"activity" : "Scissoring"
	}, {
		"mapping" : "Genderqueer:Scissoring",
		"activity" : "Scissoring"
	}, {
		"mapping" : "Man:Massage",
		"activity" : "Massage Partner"
	}, {
		"mapping" : "Woman:Massage",
		"activity" : "Massage Partner"
	}, {
		"mapping" : "Trans-Man:Massage",
		"activity" : "Massage Partner"
	}, {
		"mapping" : "Trans-Woman:Massage",
		"activity" : "Massage Partner"
	}, {
		"mapping" : "Genderqueer:Massage",
		"activity" : "Massage Partner"
	}, {
		"mapping" : "Man:Massage",
		"activity" : "Apply Massage Oil"
	}, {
		"mapping" : "Woman:Massage",
		"activity" : "Apply Massage Oil"
	}, {
		"mapping" : "Trans-Man:Massage",
		"activity" : "Apply Massage Oil"
	}, {
		"mapping" : "Trans-Woman:Massage",
		"activity" : "Apply Massage Oil"
	}, {
		"mapping" : "Genderqueer:Massage",
		"activity" : "Apply Massage Oil"
	}, {
		"mapping" : "Man:Sex Safe",
		"activity" : "Cuddle (Naked or Clothed)"
	}, {
		"mapping" : "Woman:Sex Safe",
		"activity" : "Cuddle (Naked or Clothed)"
	}, {
		"mapping" : "Trans-Man:Sex Safe",
		"activity" : "Cuddle (Naked or Clothed)"
	}, {
		"mapping" : "Trans-Woman:Sex Safe",
		"activity" : "Cuddle (Naked or Clothed)"
	}, {
		"mapping" : "Genderqueer:Sex Safe",
		"activity" : "Cuddle (Naked or Clothed)"
	}, {
		"mapping" : "Man:Sex Safe",
		"activity" : "Play with Partner's Hair"
	}, {
		"mapping" : "Woman:Sex Safe",
		"activity" : "Play with Partner's Hair"
	}, {
		"mapping" : "Trans-Man:Sex Safe",
		"activity" : "Play with Partner's Hair"
	}, {
		"mapping" : "Trans-Woman:Sex Safe",
		"activity" : "Play with Partner's Hair"
	}, {
		"mapping" : "Genderqueer:Sex Safe",
		"activity" : "Play with Partner's Hair"
	}, {
		"mapping" : "Man:Sex Safe",
		"activity" : "Undress Your Partner"
	}, {
		"mapping" : "Woman:Sex Safe",
		"activity" : "Undress Your Partner"
	}, {
		"mapping" : "Trans-Man:Sex Safe",
		"activity" : "Undress Your Partner"
	}, {
		"mapping" : "Trans-Woman:Sex Safe",
		"activity" : "Undress Your Partner"
	}, {
		"mapping" : "Genderqueer:Sex Safe",
		"activity" : "Undress Your Partner"
	}, {
		"mapping" : "Man:Sex Safe",
		"activity" : "Dance (Naked or Clothed)"
	}, {
		"mapping" : "Woman:Sex Safe",
		"activity" : "Dance (Naked or Clothed)"
	}, {
		"mapping" : "Trans-Man:Sex Safe",
		"activity" : "Dance (Naked or Clothed)"
	}, {
		"mapping" : "Trans-Woman:Sex Safe",
		"activity" : "Dance (Naked or Clothed)"
	}, {
		"mapping" : "Genderqueer:Sex Safe",
		"activity" : "Dance (Naked or Clothed)"
	}, {
		"mapping" : "Man:Sex Safe",
		"activity" : "Say Something Sexy"
	}, {
		"mapping" : "Woman:Sex Safe",
		"activity" : "Say Something Sexy"
	}, {
		"mapping" : "Trans-Man:Sex Safe",
		"activity" : "Say Something Sexy"
	}, {
		"mapping" : "Trans-Woman:Sex Safe",
		"activity" : "Say Something Sexy"
	}, {
		"mapping" : "Genderqueer:NV",
		"activity" : "Say Something Sexy"
	}, {
		"mapping" : "Man:Sex Safe",
		"activity" : "Flirt with Your Partner"
	}, {
		"mapping" : "Woman:Sex Safe",
		"activity" : "Flirt with Your Partner"
	}, {
		"mapping" : "Trans-Man:Sex Safe",
		"activity" : "Flirt with Your Partner"
	}, {
		"mapping" : "Trans-Woman:Sex Safe",
		"activity" : "Flirt with Your Partner"
	}, {
		"mapping" : "Genderqueer:Sex Safe",
		"activity" : "Flirt with Your Partner"
	}]
};

var paytableData = {
	data : [{
		"orientation" : "Man",
		"activity" : "Giving Anal Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: HIV can be transmitted through this activity. Do not ignore this risk.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Woman",
		"activity" : "Giving Anal Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "Last time we checked, a female couldn't give anal sex. Try rimming, fingering or fisting.",
		"safety" : "N/A"
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Giving Anal Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "Last time we checked, a transgender female to male couldn't give anal sex. If you have not undergone full transition yet, try male or indifferent to get your result.",
		"safety" : "N/A"
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Giving Anal Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: HIV can be transmitted through this activity. Do not ignore this risk.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Giving Anal Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: HIV can be transmitted through this activity. Do not ignore this risk.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Man",
		"activity" : "Getting Oral Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: You can ask that they blow on or caress with their mouth over clothing. As long as no fluids enter the mouth, your partner is safe. "
	}, {
		"orientation" : "Woman",
		"activity" : "Getting Oral Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a dental dam. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: A condom won't be of any use here unless you make it into a barrier. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, your partner is safe. "
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Getting Oral Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a dental dam. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: A condom won't be of any use here unless you make it into a barrier. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, your partner is safe. "
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Getting Oral Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Ask your partner to use a dental dam. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: A condom won't be of any use here unless you make it into a barrier. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, your partner is safe. "
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Getting Oral Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Ask your partner to use a dental dam. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: A condom won't be of any use here unless you make it into a barrier. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, your partner is safe. "
	}, {
		"orientation" : "Man",
		"activity" : "Giving Oral Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Ask your partner to use a dental dam. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: A condom won't be of any use here unless you make it into a barrier. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, your partner is safe. "
	}, {
		"orientation" : "Woman",
		"activity" : "Going Down on a Vagina",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a dental dam. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: A condom won't be of any use here unless you make it into a barrier. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, your partner is safe. "
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Going Down on a Vagina",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a dental dam. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: A condom won't be of any use here unless you make it into a barrier. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, your partner is safe. "
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Going Down on a Vagina",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a dental dam. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: A condom won't be of any use here unless you make it into a barrier. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, your partner is safe. "
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Going Down on a Vagina",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a dental dam. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: A condom won't be of any use here unless you make it into a barrier. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, your partner is safe. "
	}, {
		"orientation" : "Man",
		"activity" : "Getting Anal Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity has the highest risk for transmitting HIV.\n\nOther STI/STD Risk: Other STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts  ",
		"safety" : "If None: Ask your partner to use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Woman",
		"activity" : "Getting Anal Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity has the highest risk for transmitting HIV.\n\nOther STI/STD Risk: Other STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts  ",
		"safety" : "If None: Ask your partner to use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Getting Anal Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity has the highest risk for transmitting HIV.\n\nOther STI/STD Risk: Other STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts  ",
		"safety" : "If None: Ask your partner to use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Getting Anal Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity has the highest risk for transmitting HIV.\n\nOther STI/STD Risk: Other STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts  ",
		"safety" : "If None: Ask your partner to use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Getting Anal Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity has the highest risk for transmitting HIV.\n\nOther STI/STD Risk: Other STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts  ",
		"safety" : "If None: Ask your partner to use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Man",
		"activity" : "Giving a Blow Job",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a dental dam. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: A condom won't be of any use here unless you make it into a barrier. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, you are safe. "
	}, {
		"orientation" : "Woman",
		"activity" : "Giving a Blow Job",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a dental dam. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: A condom won't be of any use here unless you make it into a barrier. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, you are safe. "
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Giving a Blow Job",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a dental dam. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: A condom won't be of any use here unless you make it into a barrier. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, you are safe. "
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Giving a Blow Job",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a dental dam. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: A condom won't be of any use here unless you make it into a barrier. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, you are safe. "
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Giving a Blow Job",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a dental dam. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: A condom won't be of any use here unless you make it into a barrier. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, you are safe. "
	}, {
		"orientation" : "Man",
		"activity" : "Fingering or Fisting",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.\n\nOther STI/STD Risk: Herpes, Genital Warts   ",
		"safety" : "If None: Use a barrier: a condom, dental dam or medical gloves. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use a condom.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Woman",
		"activity" : "Fingering or Fisting",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.\n\nOther STI/STD Risk: Herpes, Genital Warts   ",
		"safety" : "If None: Use a barrier: a condom, dental dam or medical gloves. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use a condom.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Fingering or Fisting",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.\n\nOther STI/STD Risk: Herpes, Genital Warts   ",
		"safety" : "If None: Use a barrier: a condom, dental dam or medical gloves. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use a condom.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Fingering or Fisting",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.\n\nOther STI/STD Risk: Herpes, Genital Warts   ",
		"safety" : "If None: Use a barrier: a condom, dental dam or medical gloves. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use a condom.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Fingering or Fisting",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.\n\nOther STI/STD Risk: Herpes, Genital Warts   ",
		"safety" : "If None: Use a barrier: a condom, dental dam or medical gloves. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use a condom.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Man",
		"activity" : "Sex (Vaginal)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity can transmit HIV.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Man",
		"activity" : "Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity can transmit HIV and is the most common way women get infected with HIV.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Ask your partner to use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Woman",
		"activity" : "Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity can transmit HIV and is the most common way women get infected with HIV.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Ask your partner to use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity can transmit HIV and is the most common way women get infected with HIV.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Ask your partner to use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity can transmit HIV and is the most common way women get infected with HIV.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Ask your partner to use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Sex (Vaginal)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity can transmit HIV.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity can transmit HIV.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Man",
		"activity" : "Insert a Sex Toy",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity can transmit HIV.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: Sex toys over clothing can be fun. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Woman",
		"activity" : "Insert a Sex Toy",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity can transmit HIV.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: Sex toys over clothing can be fun. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Insert a Sex Toy",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity can transmit HIV.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: Sex toys over clothing can be fun. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Insert a Sex Toy",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : " Other STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: Sex toys over clothing can be fun. Do not try to insert wearing clothing. Ouch!"
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Insert a Sex Toy",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: This activity can transmit HIV.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: Sex toys over clothing can be fun. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Man",
		"activity" : "Dry Humping",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.\n\nOther STI/STD Risk: None reported, although under certain conditions transmission could be possible. ",
		"safety" : "Play safe!"
	}, {
		"orientation" : "Woman",
		"activity" : "Dry Humping",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.\n\nOther STI/STD Risk: None reported, although under certain conditions transmission could be possible. ",
		"safety" : "Play safe!"
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Dry Humping",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.\n\nOther STI/STD Risk: None reported, although under certain conditions transmission could be possible. ",
		"safety" : "Play safe!"
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Dry Humping",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.\n\nOther STI/STD Risk: None reported, although under certain conditions transmission could be possible. ",
		"safety" : "Play safe!"
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Dry Humping",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.\n\nOther STI/STD Risk: None reported, although under certain conditions transmission could be possible. ",
		"safety" : "Play safe!"
	}, {
		"orientation" : "Man",
		"activity" : "Rubbing a Vagina",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.\n\nOther STI/STD Risk: None reported, although under certain conditions transmission could be possible. ",
		"safety" : "Play safe!"
	}, {
		"orientation" : "Woman",
		"activity" : "Rubbing a Vagina",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.\n\nOther STI/STD Risk: None reported, although under certain conditions transmission could be possible. ",
		"safety" : "Play safe! You can choose to use a barrier if you like."
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Rubbing a Vagina",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.\n\nOther STI/STD Risk: None reported, although under certain conditions transmission could be possible. ",
		"safety" : "Play safe! You can choose to use a barrier if you like."
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Rubbing a Vagina",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.\n\nOther STI/STD Risk: None reported, although under certain conditions transmission could be possible. ",
		"safety" : "Play safe! You can choose to use a barrier if you like."
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Rubbing a Vagina",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.\n\nOther STI/STD Risk: None reported, although under certain conditions transmission could be possible. ",
		"safety" : "Play safe! You can choose to use a barrier if you like."
	}, {
		"orientation" : "Man",
		"activity" : "Masturbation",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Woman",
		"activity" : "Masturbation",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Masturbation",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Masturbation",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Masturbation",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Man",
		"activity" : "Penis Rubbing",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Lower Risk Activity  Other STI/STD Risk: Herpes, Genital Warts    ",
		"safety" : "If None: Ask your partner to use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as fondling. "
	}, {
		"orientation" : "Woman",
		"activity" : "Penis Rubbing",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Lower Risk Activity  Other STI/STD Risk: Herpes, Genital Warts    ",
		"safety" : "If None: Ask your partner to use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as fondling. "
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Penis Rubbing",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Lower Risk Activity  Other STI/STD Risk: Herpes, Genital Warts    ",
		"safety" : "If None: Ask your partner to use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as fondling. "
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Penis Rubbing",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Lower Risk Activity  Other STI/STD Risk: Herpes, Genital Warts    ",
		"safety" : "If None: Ask your partner to use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as fondling. "
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Penis Rubbing",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Lower Risk Activity  Other STI/STD Risk: Herpes, Genital Warts    ",
		"safety" : "If None: Ask your partner to use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as fondling. "
	}, {
		"orientation" : "Man",
		"activity" : "Rimming (Licking) Anus",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.\n\nOther STI/STD Risk: Herpes, Genital Warts   ",
		"safety" : "If None: Use a dental dam. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: A condom won't be of any use here unless you make it into a barrier. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, you are safe. "
	}, {
		"orientation" : "Woman",
		"activity" : "Rimming (Licking) Anus",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.\n\nOther STI/STD Risk: Herpes, Genital Warts   ",
		"safety" : "If None: Use a dental dam. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: A condom won't be of any use here unless you make it into a barrier. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, you are safe. "
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Rimming (Licking) Anus",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.\n\nOther STI/STD Risk: Herpes, Genital Warts   ",
		"safety" : "If None: Use a dental dam. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: A condom won't be of any use here unless you make it into a barrier. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, you are safe. "
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Rimming (Licking) Anus",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.\n\nOther STI/STD Risk: Herpes, Genital Warts   ",
		"safety" : "If None: Use a dental dam. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: A condom won't be of any use here unless you make it into a barrier. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, you are safe. "
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Rimming (Licking) Anus",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Unlikely, but could.\n\nOther STI/STD Risk: Herpes, Genital Warts   ",
		"safety" : "If None: Use a dental dam. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: A condom won't be of any use here unless you make it into a barrier. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Dental Dam: Great, you have a dental dam! Make sure it is free from tears or holes and check the expiration date before use. Do not open the wrapper with your teeth. Use water-based lubricant. Play safe!\n\nIf Clothing: You can blow on or caress with your mouth over clothing. As long as no fluids enter the mouth, you are safe. "
	}, {
		"orientation" : "Man",
		"activity" : "Kissing",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Safe! Safe! Safe!  Other STI/STD Risk: Herpes   ",
		"safety" : "If None: Ask your partner - 'Do you ever get cold sores?'\n\nIf Condom: A condom won't be of any use here. Best to ask your partner  'Do you ever get cold sores?'\n\nIf Dental Dam: A dental dam won't be of any use here. Best to ask your partner 'Do you ever get cold sores?'\n\nIf Clothing: Kiss someone while pulling their shirt over their head. That's sexy. But when you really start kissing, best to ask your partner 'Do you ever get cold sores?' "
	}, {
		"orientation" : "Woman",
		"activity" : "Kissing",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Safe! Safe! Safe!  Other STI/STD Risk: Herpes   ",
		"safety" : "If None: Ask your partner - 'Do you ever get cold sores?'\n\nIf Condom: A condom won't be of any use here. Best to ask your partner 'Do you ever get cold sores?'\n\nIf Dental Dam: A dental dam won't be of any use here. Best to ask your partner 'Do you ever get cold sores?'\n\nIf Clothing: Kiss someone while pulling their shirt over their head. That's sexy. But when you really start kissing, best to ask your partner  'Do you ever get cold sores?'  "
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Kissing",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Safe! Safe! Safe!  Other STI/STD Risk: Herpes   ",
		"safety" : "If None: Ask your partner - 'Do you ever get cold sores?'\n\nIf Condom: A condom won't be of any use here. Best to ask your partner  'Do you ever get cold sores?'\n\nIf Dental Dam: A dental dam won't be of any use here. Best to ask your partner  'Do you ever get cold sores?'\n\nIf Clothing: Kiss someone while pulling their shirt over their head. That's sexy. But when you really start kissing, best to ask your partner  'Do you ever get cold sores?' "
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Kissing",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Safe! Safe! Safe!  Other STI/STD Risk: Herpes   ",
		"safety" : "If None: Ask your partner - 'Do you ever get cold sores?'\n\nIf Condom: A condom won't be of any use here. Best to ask your partner  'Do you ever get cold sores?'\n\nIf Dental Dam: A dental dam won't be of any use here. Best to ask your partner 'Do you ever get cold sores?'\n\nIf Clothing: Kiss someone while pulling their shirt over their head. That's sexy. But when you really start kissing, best to ask your partner 'Do you ever get cold sores?' "
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Kissing",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Safe! Safe! Safe!  Other STI/STD Risk: Herpes   ",
		"safety" : "If None: Ask your partner - 'Do you ever get cold sores?'\n\nIf Condom: A condom won't be of any use here. Best to ask your partner 'Do you ever get cold sores?'\n\nIf Dental Dam: A dental dam won't be of any use here. Best to ask your partner 'Do you ever get cold sores?'\n\nIf Clothing: Kiss someone while pulling their shirt over their head. That's sexy. But when you really start kissing, best to ask your partner 'Do you ever get cold sores?' "
	}, {
		"orientation" : "Man",
		"activity" : "Scissoring",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "Better known as Docking for men.  HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts  ",
		"safety" : "If None: Use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Woman",
		"activity" : "Scissoring",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Find a condom and turn it into a barrier. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Condom: Great, you have a condom! Turn it into a barrier. Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom and turn it into a barrier. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Clothing: This is more commonly known as dry humping. "
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Scissoring",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts    ",
		"safety" : "If None: Find a condom and turn it into a barrier. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Condom: Great, you have a condom! Turn it into a barrier. Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom and turn it into a barrier. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Clothing: This is more commonly known as dry humping. "
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Scissoring",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "Better known as Docking for men.  HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts  ",
		"safety" : "If None: Find a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Clothing: This is more commonly known as dry humping. "
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Scissoring",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "Better known as Docking for men.  HIV Transmission Risk: Has never been reported, although under certain conditions transmission could be possible.\n\nOther STI/STD Risk: Chlamydia, Gonorrhea, Syphilis, Herpes, Genital Warts  ",
		"safety" : "None: Find a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to make one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Clothing: This is more commonly known as dry humping. "
	}, {
		"orientation" : "Man",
		"activity" : "Undress Your Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Woman",
		"activity" : "Undress Your Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Undress Your Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Undress Your Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Undress Your Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Man",
		"activity" : "Cuddle (Naked or Clothed)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Woman",
		"activity" : "Cuddle (Naked or Clothed)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Cuddle (Naked or Clothed)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Cuddle (Naked or Clothed)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Cuddle (Naked or Clothed)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Man",
		"activity" : "Massage Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Woman",
		"activity" : "Massage Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Massage Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Massage Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Massage Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Man",
		"activity" : "Play with Partner's Hair",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Woman",
		"activity" : "Play with Partner's Hair",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Play with Partner's Hair",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Play with Partner's Hair",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Play with Partner's Hair",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Man",
		"activity" : "Apply Massage Oil",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Woman",
		"activity" : "Apply Massage Oil",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Apply Massage Oil",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Apply Massage Oil",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Apply Massage Oil",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Man",
		"activity" : "Dance (Naked or Clothed)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Woman",
		"activity" : "Dance (Naked or Clothed)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Dance (Naked or Clothed)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Dance (Naked or Clothed)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Dance (Naked or Clothed)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Man",
		"activity" : "Say Something Sexy",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Woman",
		"activity" : "Say Something Sexy",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Say Something Sexy",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Say Something Sexy",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Say Something Sexy",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Man",
		"activity" : "Play with a Sex Toy (No Insertion)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Woman",
		"activity" : "Play with a Sex Toy (No Insertion)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Play with a Sex Toy (No Insertion)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Play with a Sex Toy (No Insertion)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Play with a Sex Toy (No Insertion)",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Man",
		"activity" : "Flirt with Your Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Woman",
		"activity" : "Flirt with Your Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Flirt with Your Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Flirt with Your Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Flirt with Your Partner",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "HIV/STI/STD Transmission Risk: Safe! Safe! Safe! ",
		"safety" : "Go for it! Play safe!"
	}, {
		"orientation" : "Man",
		"activity" : "Decide to Have Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "If you decide to have sex, be sure you know your status and the status of your partner (HIV and STDs). Be prepared with a condom, dental dam or both. The best experiences come with both partners are completely honest with each other.",
		"safety" : "If None: Use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Woman",
		"activity" : "Decide to Have Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "If you decide to have sex, be sure you know your status and the status of your partner (HIV and STDs). Be prepared with a condom, dental dam or both. The best experiences come with both partners are completely honest with each other.",
		"safety" : "If None: Use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Trans-Man",
		"activity" : "Decide to Have Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "If you decide to have sex, be sure you know your status and the status of your partner (HIV and STDs). Be prepared with a condom, dental dam or both. The best experiences come with both partners are completely honest with each other.",
		"safety" : "If None: Use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Trans-Woman",
		"activity" : "Decide to Have Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "If you decide to have sex, be sure you know your status and the status of your partner (HIV and STDs). Be prepared with a condom, dental dam or both. The best experiences come with both partners are completely honest with each other.",
		"safety" : "If None: Use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}, {
		"orientation" : "Genderqueer",
		"activity" : "Decide to Have Sex",
		"protection" : "None, Condom, Dental Dam, Clothing",
		"risk" : "If you decide to have sex, be sure you know your status and the status of your partner (HIV and STDs). Be prepared with a condom, dental dam or both. The best experiences come with both partners are completely honest with each other.",
		"safety" : "If None: Use a condom. Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Condom: Great, you have a condom! Make sure it is free from tears or holes and check the expiration date before use. Do not open the condom wrapper with your teeth. Use water-based lubricant. Play safe! Click this link ☞ http://betonthisnv.org/Protect/How_to_Use_a_Condom/ to learn how to use one.\n\nIf Dental Dam: A dental dam won't be any use here. Use a condom.\n\nIf Clothing: This is more commonly known as dry humping. Do not try to insert wearing clothing. Ouch! "
	}]
};


var argsTitleContol = {
	leftTitle : "SEX",
	title : "SAFE"
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
	Ti.API.debug('ShakeIt.' + arguments.callee.name);
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
		reelScrobbleSound.play();
	}

}

function lockActivity() {
	Ti.API.debug('ShakeIt.' + arguments.callee.name);
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
		reelScrobbleSound.play();
	}

}

function lockProtection() {
	Ti.API.debug('ShakeIt.' + arguments.callee.name);
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
		reelScrobbleSound.play();
	}

}

function displayWin() {
	Ti.API.debug('ShakeIt.' + arguments.callee.name);

	touchForResultsSound.play();

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
	} else if (type === 'touchend') {
		Ti.API.info('Touch ended on Protection sprite.');
		if (e.tag == 'resultsButton') {
			resultsNewButton.alpha = 0;
			// resultsButton.alpha = 0;
			tryAgainButton.alpha = 0;
			touchToSpinButton.alpha = 1;
			touchToSpinButton.animate(0, 4, 500, -1);
			displayWin();
		} else if (e.tag == 'resultsNewButton') {
			resultsNewButton.alpha = 0;
			// resultsButton.alpha = 1;
			tryAgainButton.alpha = 0;
			touchToSpinButton.alpha = 1;
			touchToSpinButton.animate(0, 4, 500, -1);
			displayWin();
		} else if (e.tag == 'tryAgainButton') {
			resultsNewButton.alpha = 0;
			// resultsButton.alpha = 0;
			tryAgainButton.alpha = 0;
			touchToSpinButton.alpha = 0;
			spin();
		} else if (e.tag == 'touchToSpinButton') {
			resultsNewButton.alpha = 0;
			// resultsButton.alpha = 0;
			tryAgainButton.alpha = 0;
			touchToSpinButton.alpha = 0;
			touchToSpinButton.pauseAt(0);
			spin();
		}
	}

}

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
		// resultsButton.alpha = 0;
		tryAgainButton.alpha = 0;
		touchToSpinButton.pauseAt(0);
		spin();
	} else if (type === 'touchend') {
		Ti.API.info('Touch ended on first sprite.');
	}

}

/*

 function findFrameIdx(reel, reelYPos, newYPos) {
 Ti.API.debug("reelYPos = " + reelYPos);
 Ti.API.debug("reel.frameCount = " + reel.frameCount);
 Ti.API.debug("reel.frame = " + reel.frame);
 var frameIdx = reel.frame;
 // var frameIdxTween = frameIdx;
 if (reelYPos < (newYPos - 10)) {
 frameIdx -= 2;
 // frameIdxTween = frameIdx + 2;
 if (frameIdx < 0) {
 frameIdx = reel.frameCount - 2;
 // frameIdxTween = frameIdx + 2;
 }
 } else if (reelYPos > (newYPos + 10)) {
 frameIdx += 2;
 // frameIdxTween = frameIdx - 2;
 if (frameIdx >= reel.frameCount) {
 frameIdx = 0;
 // frameIdxTween = reel.frameCount - 2;
 }
 }
 // return [frameIdx, frameIdxTween];
 return frameIdx;
 }
 */

function findFrameIdx(reel, reelYPos, newYPos) {
	Ti.API.debug('ShakeIt.' + arguments.callee.name);
	Ti.API.debug("reelYPos = " + reelYPos);
	Ti.API.debug("newYPos = " + newYPos);
	Ti.API.debug("reel.frameCount = " + reel.frameCount);
	Ti.API.debug("reel.frame = " + reel.frame);
	var frameIdx = reel.frame;
	if (reelYPos < (newYPos - 60)) {
		frameIdx -= 2;
		if (frameIdx < 0) {
			frameIdx = reel.frameCount - 2;
		}
	} else if (reelYPos > (newYPos + 60)) {
		frameIdx += 2;
		if (frameIdx >= reel.frameCount) {
			frameIdx = 0;
		}
	}
	return frameIdx;
}

var scrubAnimationTime = 300;

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
				isReelScrobble = true;
				// isGenderLocked = true;
				// lockGender();
				Ti.API.debug("frameIdx = " + frameIdx);
				Ti.API.debug("reel1.frame = " + reel1.frame);
				reel1.animate([frameIdx], scrubAnimationTime, 0, 0);
				// reelScrobbleSound.play();
				displayWinButton();
			}
			reel1Y = e.y;

		} else if (e.tag == 'reel2') {
			Ti.API.debug("reel2Y = " + reel2Y);
			if (reel2Y != 0) {
				var frameIdx = findFrameIdx(reel2, reel2Y, e.y);
				reel2Random = frameIdx;
				isReelScrobble = true;
				// isActivityLocked = true;
				// lockActivity();
				Ti.API.debug("frameIdx = " + frameIdx);
				Ti.API.debug("reel2.frame = " + reel2.frame);
				reel2.animate([frameIdx], scrubAnimationTime, 0, 0);
				// reelScrobbleSound.play();
				displayWinButton();
			}
			reel2Y = e.y;

		} else if (e.tag == 'reel3') {
			Ti.API.debug("reel3Y = " + reel3Y);
			if (reel3Y != 0) {
				var frameIdx = findFrameIdx(reel3, reel3Y, e.y);
				reel3Random = frameIdx;
				isReelScrobble = true;
				// isProtectionLocked = true;
				// lockProtection();
				Ti.API.debug("frameIdx = " + frameIdx);
				Ti.API.debug("reel3.frame = " + reel3.frame);
				reel3.animate([frameIdx], scrubAnimationTime, 0, 0);
				// reelScrobbleSound.play();
				displayWinButton();
			}
			reel3Y = e.y;

		}
	} else if (type === 'touchend') {
		Ti.API.info('Touch ended on Reel sprite.');
		if (e.tag == 'reel1') {
			var frameIdx = reel1.frame;
			if ((e.y / 2) < 170) {
				frameIdx = reel1.frame - 2;
				if (frameIdx < 0) {
					frameIdx = reel1.frameCount - 2;
				}
			} else {
				frameIdx = reel1.frame + 2;
				if (frameIdx >= reel1.frameCount) {
					frameIdx = 0;
				}
			}
			reel1.animate([reel1.frame, frameIdx], scrubAnimationTime, 0, 0);
		}

	}

}

var oldPRessFontName = 'Old Press';
if (OS_ANDROID) {
	oldPRessFontName = 'Old-Press';
}

var originalSceneWidth = 640;

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
var reel1Random = 0, reel2Random = 0, reel3Random = 0;
var isReelScrobble = false;

var win = {
	risk : "",
	safety : "",
	orientation : "",
	activity : "",
	protection : "",
	winFound : true
};

// Check reels, show particle effect if winning spin, allow user to spin again transaparent
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

			var protectionStr = "If " + protection + ":";
			var safety = outcome.attributes.safety;
			var safetyDetailIdx = safety.indexOf(protectionStr);
			if (safetyDetailIdx != -1) {
				var nextSafety = safety.indexOf(".\n\nIf", safetyDetailIdx + protectionStr.length);
				if (nextSafety != -1) {
					safety = safety.substr(safetyDetailIdx + protectionStr.length, (nextSafety - safetyDetailIdx - protectionStr.length) + 1);
				} else {
					nextSafety = safety.indexOf("!\n\nIf", safetyDetailIdx + protectionStr.length);
					if (nextSafety != -1) {
						safety = safety.substr(safetyDetailIdx + protectionStr.length, (nextSafety - safetyDetailIdx - protectionStr.length) + 1);
					} else {
						nextSafety = safety.indexOf("'\n\nIf", safetyDetailIdx + protectionStr.length);
						if (nextSafety != -1) {
							safety = safety.substr(safetyDetailIdx + protectionStr.length, (nextSafety - safetyDetailIdx - protectionStr.length) + 1);
						} else {
							nextSafety = safety.indexOf("?\nIf", safetyDetailIdx + protectionStr.length);
							if (nextSafety != -1) {
								safety = safety.substr(safetyDetailIdx + protectionStr.length, (nextSafety - safetyDetailIdx - protectionStr.length) + 1);
							} else {
								safety = safety.substr(safetyDetailIdx + protectionStr.length);
							}
						}
					}
				}
			}

			Ti.API.debug('outcome.risk = ' + outcome.attributes.risk);
			Ti.API.debug('safety = ' + safety);
			win.risk = outcome.attributes.risk.trim();
			win.safety = safety.trim();
			win.activity = activityName.trim();
			win.orientation = orientation.trim();
			win.protection = protection.trim();
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
	checkWin();
	if (win.found) {
		if (!isGenderLocked && !isActivityLocked && !isProtectionLocked  && !isReelScrobble) {
			winningSpinSound.play();
			Ti.Media.vibrate();
		}
		else {
			isReelScrobble = false;
		}
		resultsNewButton.alpha = 1;
		// resultsButton.alpha = 0;
		tryAgainButton.alpha = 0;
		touchToSpinButton.alpha = 0;
	} else {
		if (!isGenderLocked && !isActivityLocked && !isProtectionLocked && !isReelScrobble) {
			tryAgainSound.play();
		}
		else {
			isReelScrobble = false;
		}
		// resultsButton.alpha = 0;
		resultsNewButton.alpha = 0;
		tryAgainButton.alpha = 1;
		touchToSpinButton.alpha = 0;
	}
}

// Stop the reels one by one, then check if user has won
function endRoll() {
	// Random values to stop at

	if (isGenderLocked && isActivityLocked && isProtectionLocked) {
		// reelSpinMusicSound.stop();
		reelSpinGearsSound.stop();
		displayWinButton();
	} else {
		var displayWinTimeout = 0;
		if (isGenderLocked == false) {
			reel1Random = reels.reel1.stops[Math.floor(Math.random() * (reel1.frameCount - 1))];
			// reelSpinMusicSound.stop();
			reelSpinGearsSound.stop();
			reel1StopSound.play();
			reel1.pauseAt(reel1Random);
		}

		if (isActivityLocked == false) {
			reel2Random = reels.reel2.stops[Math.floor(Math.random() * (reel2.frameCount - 1))];
			setTimeout(function() {
				// reelSpinMusicSound.stop();
				reelSpinGearsSound.stop();
				reel2StopSound.play();
				reel2.pauseAt(reel2Random);
			}, 500);
			displayWinTimeout += 500;
		}

		if (isProtectionLocked == false) {
			reel3Random = reels.reel3.stops[Math.floor(Math.random() * (reel3.frameCount - 1))];
			setTimeout(function() {
				// reelSpinMusicSound.stop();
				reelSpinGearsSound.stop();
				reel3StopSound.play();
				reel3.pauseAt(reel3Random);
			}, 1000);
			displayWinTimeout += 1000;
		}
		setTimeout(displayWinButton, displayWinTimeout);
	}

};

function spinReels() {

	reelSpinGearsSound.play();

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
	var ranVal = Math.floor((Math.random() * 2200) + 700);
	if (isGenderLocked && isActivityLocked && isProtectionLocked) {
		endRoll();
	} else {
		setTimeout(endRoll, ranVal);
	}
}

// Spin function
function spin() {
	// If user is allowed to spin, spin the reels
	if (canSpin == true) {
		canSpin = false;
		leverPullSound.play();
		armFrame.animate(0, 8, 50, 0);
		setTimeout(spinReels, 5 * 50);
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
});
////////////////////////////

function initGameScene() {
	Ti.API.debug("BEGIN - initGameScene");

	var suffix = "-hd";
	var imageSuffix = "@2x";

	var scaleFactor = 1;
	var imageScaleFactor = 1;
	var positionFactor = 1;
	var fontFactor = 1;
	var lockLabelFontSize = 24;

	Ti.API.info("Ti.Platform.displayCaps.dpi = " + Ti.Platform.displayCaps.dpi);
	Ti.API.info("game.size.width = " + game.size.width);

	if (OS_ANDROID) {
		scaleFactor = originalSceneWidth / game.size.width;
		imageScaleFactor = scaleFactor;
		fontFactor = scaleFactor;
		positionFactor = scaleFactor;
		imageSuffix = "";
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

	Ti.API.info("BEGIN - scaleFactor = " + scaleFactor);
	Ti.API.info("BEGIN - positionFactor = " + positionFactor);
	Ti.API.info("BEGIN - fontFactor = " + fontFactor);
	Ti.API.info("BEGIN - imageScaleFactor = " + imageScaleFactor);
	Ti.API.info("BEGIN - suffix = " + suffix);

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
		x : 18 / positionFactor,
		y : 50 / positionFactor,
		alpha : 0
	});
	touchable.push(genderLockIcon);
	genderLockIcon.addEventListener('touchend', onGenderLockTouch);

	genderUnLockIcon = platino.createSprite({
		image : unLockImage,
		width : 30 / imageScaleFactor,
		height : 30 / imageScaleFactor,
		x : 18 / positionFactor,
		y : 50 / positionFactor,
		alpha : 1
	});
	touchable.push(genderUnLockIcon);
	genderUnLockIcon.addEventListener('touchend', onGenderLockTouch);
	isGenderLocked = false;

	genderLockLabel = platino.createTextSprite({
		text : 'Gender Identity ',
		fontSize : lockLabelFontSize / fontFactor,
		x : 53 / positionFactor,
		y : 55 / positionFactor
	});
	// genderLockLabel.width += 60;
	// genderLockLabel.height += 15;
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
		text : 'Activity ',
		fontSize : lockLabelFontSize / fontFactor,
		x : 295 / positionFactor,
		y : 55 / positionFactor
	});
	// activityLockLabel.width += 80;
	// activityLockLabel.height += 15;
	touchable.push(activityLockLabel);
	activityLockLabel.addEventListener('touchend', onActivityLockTouch);

	protectionLockIcon = platino.createSprite({
		image : lockImage,
		width : 30 / imageScaleFactor,
		height : 30 / imageScaleFactor,
		x : 440 / positionFactor,
		y : 50 / positionFactor,
		alpha : 0
	});
	touchable.push(protectionLockIcon);
	protectionLockIcon.addEventListener('touchend', onProtectionIconTouch);

	protectionUnLockIcon = platino.createSprite({
		image : unLockImage,
		width : 30 / imageScaleFactor,
		height : 30 / imageScaleFactor,
		x : 440 / positionFactor,
		y : 50 / positionFactor,
		alpha : 1
	});
	touchable.push(protectionUnLockIcon);
	protectionUnLockIcon.addEventListener('touchend', onProtectionIconTouch);
	isProtectionLocked = false;

	protectionLockLabel = platino.createTextSprite({
		text : 'Protection',
		fontSize : lockLabelFontSize / fontFactor,
		x : 475 / positionFactor,
		y : 55 / positionFactor
	});
	// protectionLockLabel.width += 60;
	// protectionLockLabel.height += 15;
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
		x : 520 / positionFactor,
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
	// reel1.addEventListener('touchend', onReelTouch);

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
	// reel2.addEventListener('touchend', onReelTouch);

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
	// reel3.addEventListener('touchend', onReelTouch);

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
		x : 160 / positionFactor,
		y : 523 / positionFactor,
		scaleX : 1 / scaleFactor,
		scaleY : 1 / scaleFactor
	});
	touchToSpinButton.pauseAt(0);
	touchable.push(touchToSpinButton);
	touchToSpinButton.addEventListener('touchend', onResultsButtonTouch);

	/*
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
	 resultsButton.addEventListener('touchend', onResultsButtonTouch);*/

	resultsNewButton = platino.createSprite({
		image : "images/ResultsNewButton.png",
		tag : "resultsNewButton",
		x : 145 / positionFactor,
		y : 540 / positionFactor,
		width : 344 / imageScaleFactor,
		height : 76 / imageScaleFactor,
		alpha : 0
	});
	touchable.push(resultsNewButton);
	resultsNewButton.addEventListener('touchend', onResultsButtonTouch);

	tryAgainButton = platino.createSprite({
		image : "images/TryAgainButton.png",
		tag : "tryAgainButton",
		x : 145 / positionFactor,
		y : 540 / positionFactor,
		width : 344 / imageScaleFactor,
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
	// scene.add(resultsButton);
	scene.add(resultsNewButton);
	scene.add(tryAgainButton);
	scene.add(touchToSpinButton);

}

game.addEventListener("onload", function(e) {
	Ti.API.debug("BEGIN - onload");
	Ti.API.info('******************************** isDeviceSupported = ' + game.isDeviceSupported());

	Ti.API.info("game.screen = " + game.screen.width + " x " + game.screen.height);
	Ti.API.info("game.size = " + game.size.width + " x " + game.size.height);

	TOUCH_SCALE = game.screen.width / game.size.width;

	initGameScene();

	// Start the game
	game.start();

	touchToSpinButton.animate(0, 4, 500, -1);

});

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
	function configureAndroidMenu() {

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
				if (Alloy.Globals.Android.Api < 11 && activity.actionBar == null) {
					var menuItem2 = menu.add({
						titleCondensed : 'About',
						icon : '/images/appicon-Small-40.png',
						showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
					});
					menuItem2.addEventListener('click', openAboutView);
				}
			};

			// Action Bar
			if (Alloy.Globals.Android.Api >= 11 && activity.actionBar != null) {
				activity.actionBar.title = 'NV SexSafe';
				activity.actionBar.onHomeIconItemSelected = openAboutView;
			}
		}
	}

}

function spinOnShake(e) {
	Ti.API.debug('ShakeIt.' + arguments.callee.name + ': ' + JSON.stringify(e));
	if (!isAppPaused) {
		spin();
	}
}

function enableShake() {
	Ti.API.debug('ShakeIt.' + arguments.callee.name);
	Ti.Gesture.addEventListener('shake', spinOnShake);
}

function disableShake() {
	Ti.API.debug('ShakeIt.' + arguments.callee.name);
	Ti.Gesture.removeEventListener('shake', spinOnShake);
}

var isAppPaused = false;

function appResumed(e) {
	Ti.API.debug('ShakeIt.' + arguments.callee.name + ': ' + JSON.stringify(e));
	isAppPaused = false;
	enableShake();
}

function appResume(e) {
	Ti.API.debug('ShakeIt.' + arguments.callee.name + ': ' + JSON.stringify(e));
}

function appPause(e) {
	Ti.API.debug('ShakeIt.' + arguments.callee.name + ': ' + JSON.stringify(e));
	isAppPaused = true;
	disableShake();
}

function appPaused(e) {
	Ti.API.debug('ShakeIt.' + arguments.callee.name + ': ' + JSON.stringify(e));
}

if (OS_ANDROID) {

	function restartActivityAndroid(e) {
		Ti.API.debug('ShakeIt.' + arguments.callee.name + ': ' + JSON.stringify(e));
	}

	function stopActivityAndroid(e) {
		Ti.API.debug('ShakeIt.' + arguments.callee.name + ': ' + JSON.stringify(e));
	}

	function pauseActivityAndroid(e) {
		Ti.API.debug('ShakeIt.' + arguments.callee.name + ': ' + JSON.stringify(e));
		appPause();
		appPaused();
	}

	function resumeActivityAndroid(e) {
		Ti.API.debug('ShakeIt.' + arguments.callee.name + ': ' + JSON.stringify(e));
		appResume();
		appResumed();
	}

}

function open() {

	init();

	if (OS_ANDROID) {
		configureAndroidMenu();
		$.shakeItTab.tabGroup.activity.addEventListener('stop', stopActivityAndroid);
		$.shakeItTab.tabGroup.activity.addEventListener('restart', restartActivityAndroid);
		$.shakeItTab.tabGroup.activity.addEventListener('pause', pauseActivityAndroid);
		$.shakeItTab.tabGroup.activity.addEventListener('resume', resumeActivityAndroid);
	}
}

if (OS_IOS) {

	Ti.App.addEventListener('resumed', appResumed);
	Ti.App.addEventListener('resume', appResume);
	Ti.App.addEventListener('pause', appPause);
	Ti.App.addEventListener('paused', appPaused);
}

