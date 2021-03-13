// 2020 May 1 - 2020 May 7
// 2020 May 8 - Adding more long words, timer mode for 3-letter strings, additional lesson template
/* Occasional unresolved bug where undefined is displayed. Happens when
user partially completes a lesson, then switches lessons. */

// GENERAL FUNCTIONS

// keep track of lesson group between FUNCTIONS
let setKeyGroup = (function(set = false, group = '') {
	let keyGroup = '';
	return function (set = false, group = '') {
		if (set === true) {
			keyGroup = group;
			return keyGroup;
		} else if (set == false) {
			return keyGroup;
		}
	}
})();

// event listener for key clicks
let buttonListener = (function () {
	let keys = document.getElementsByClassName("key");
	let keyClicked = '';

	for (var i = 0; i < keys.length; i++) {
		keys[i].addEventListener('click', function() {
			keyClicked = this.innerHTML;

			let pinkies = ['S', 'T', 'D', 'Z'];
			let rings = ['T', 'K', 'L', 'G'];
			let middles = ['P', 'W', 'B'];
			let pointers = ['H', 'R', 'F'];
			let thumbs = ['A', 'O', 'E', 'U'];
			let keyGroup = '';

			if (keyClicked === 'T') {
				// check if ring T or pinky T
				if (this.parentNode.className.includes('left-keys')) {
					keyGroup = 'rings';
				} else {
					keyGroup = 'pinkies';
				}
			} else if (keyClicked === '*') {
				// check if top * or bottom *
				if (this.className.includes('bottom')) {
					keyGroup = 'bottom asterisk';
				} else {
					keyGroup = 'top asterisk';
				}
			} else if (pinkies.includes(keyClicked)) {
				keyGroup = 'pinkies';
			} else if (rings.includes(keyClicked)) {
				keyGroup = 'rings';
			} else if (middles.includes(keyClicked)) {
				keyGroup = 'middles';
			} else if (pointers.includes(keyClicked)) {
				keyGroup = 'pointers'
			} else if (thumbs.includes(keyClicked)) {
				keyGroup = 'thumbs';
			}

			// reset text number, highlight position
			nextIndex(false, true);
			console.log("listener before newText");

			setKeyGroup(true, keyGroup);
			document.getElementById("display-text").innerHTML = resetText(true, true, true);
			// resetText(true, true, true)
		});
	}
})();

// get the index of the next letter to be typed
let nextIndex = (function (nextValue, restart = false) {
	let currentLetterIndex = 0;
	return function (nextValue, restart = false) {
		if (restart === false) {
			if (nextValue === false) {
				return currentLetterIndex;
			} else {
				currentLetterIndex += 1;
				return currentLetterIndex;
			}
		} else if (restart === true) {
			currentLetterIndex = 0;
		}
	}
})();

// which text to display
let newTextNumber = (function (reset = false) {
	let currentTextIndex = -1;
	return function (reset = false) {
		console.log("newTextNumber, reset " + currentTextIndex + " " + reset);
		if (reset === true) {
			currentTextIndex = 0;
			return currentTextIndex;
		}
		currentTextIndex += 1;
		return currentTextIndex;
	}
})();

// to compare key pressed to original text, without added html elements
let resetText = (function(newText = false, nextText = true, fullReset = false) {
	let originalText = document.getElementById("display-text").innerHTML;
	return function (newText = false, nextText = true, fullReset = false) {
		if (newText === false) {
			// get current text without changing it
			return originalText;
		} else if (newText === true) {
			if (nextText === true) {
				originalText = getNewText(newTextNumber(fullReset), setKeyGroup(false));
			} else if (nextText === false) {
				originalText = getNewText(0, setKeyGroup(false));
			}
			document.getElementById("display-text").innerHTML = originalText;
			return originalText;
		}
	}
})();

// highlight text that has been correctly typed
function cursor (index) {
	let element = document.getElementById("display-text");
	let innerHTML = resetText();
	innerHTML = '<span class="text-highlight">' + innerHTML.substring(0, index) + '</span>' + innerHTML.substring(index, index + innerHTML.length);
	element.innerHTML = innerHTML;
}

// check if value in text is a letter
let isAlpha = function (ch) {
	return /^[a-zA-Z]$/i.test(ch);
}

// compare key pressed to current position in text
function compareKey (curKey, curLet) {
	if (curKey === curLet) {
		return true;
	} else {
		return false;
	}
}

// RESPOND TO KEY PRESS
document.addEventListener('keydown', function (event) {
	if (event.defaultPrevented) {
		return;
	}

	// GET LETTER OF KEY PRESSED
	let key = event.key || event.keyCode;
	let keyPressed = true; // process keys in steno keyboard, ignore other keys
	switch (key) {
		// left top keys
		case ('q' || 81):
			currentKey = document.getElementById("Q");
			break;
		case ('w' || 87):
			currentKey = document.getElementById("W");
			break;
		case ('e' || 69):
			currentKey = document.getElementById("E");
			break;
		case ('r' || 82):
			currentKey = document.getElementById("R");
			break;
		// left bottom keys
		case ('a' || 65):
			currentKey = document.getElementById("A");
			break;
		case ('s' || 83):
			currentKey = document.getElementById("S");
			break;
		case ('d' || 68):
			currentKey = document.getElementById("D");
			break;
		case ('f' || 70):
			currentKey = document.getElementById("F");
			break;
		// vowel keys
		case ('c' || 67):
			currentKey = document.getElementById("C");
			break;
		case ('v' || 86):
			currentKey = document.getElementById("V");
			break;
		case ('n' || 78):
			currentKey = document.getElementById("N");
			break;
		case ('m' || 77):
			currentKey = document.getElementById("M");
			break;
		// right top keys
		case ('u' || 85):
			currentKey = document.getElementById("U");
			break;
		case ('i' || 74):
			currentKey = document.getElementById("I");
			break;
		case ('o' || 79):
			currentKey = document.getElementById("O");
			break;
		case ('p' || 80):
			currentKey = document.getElementById("P");
			break;
		case ('[' || 219):
			currentKey = document.getElementById("Bracket");
			break;
		// right bottom keys
		case ('j' || 74):
			currentKey = document.getElementById("J");
			break;
		case ('k' || 75):
			currentKey = document.getElementById("K");
			break;
		case ('l' || 76):
			currentKey = document.getElementById("L");
			break;
		case (';' || 59):
			currentKey = document.getElementById("Colon");
			break;
		case ('\'' || 222):
			currentKey = document.getElementById("Quotation");
			break;
		// * keys
		case ('t' || 84):
			currentKey = document.getElementById("TY");
			break;
		case ('y' || 89):
			currentKey = document.getElementById("TY");
			break;
		case ('g' || 71):
			currentKey = document.getElementById("GH");
			break;
		case ('h' || 72):
			currentKey = document.getElementById("GH");
			break;
		default:
			keyPressed = false;
			break;
	}

	// HIGHLIGHT PRESSED KEY
	currentKey.classList.add("highlight");
	setTimeout(function() {
		currentKey.classList.remove("highlight");
		// multiple keys pressed rapidly
		var elems = document.getElementsByClassName("highlight");
		for (var i = 0; i < elems.length; i++) {
			elems[i].classList.remove("highlight");
		}
	}, 180);

	// COMPARE KEY TO TEXT IF USER PRESSED A STENO KEYBOARD KEY
	let text = resetText();
	if (keyPressed === true & (nextIndex(false) < text.length)) {
		let currentIndex = nextIndex(false);
		let currentLetter = text[currentIndex];

		// move to next letter if current is not a letter
		while (!isAlpha(currentLetter) & (currentIndex < text.length)) {
			if ((currentIndex) < text.length) {
				currentIndex = nextIndex(true);
				currentLetter = text[currentIndex];
			} else {
				console.log("end of text")
			}
		}
		let next = compareKey(currentKey.innerHTML.toLowerCase(), currentLetter.toLowerCase());

		// MOVE TO NEXT LETTER IF USER TYPED CORRECT KEY
		if (next === true) {
			currentIndex = nextIndex(true) - 1;
			currentLetter = text[currentIndex];
			cursor(currentIndex+1);
		}
	}
	if (nextIndex(false) >= text.length) {
		text = resetText(true);
		console.log("AT THE END");
		document.getElementById("display-text").innerHTML = text;
		nextIndex(false, true);
	}
});

function getNewText(textNumber, textType = setKeyGroup(false)) {
	console.log("keygroup: " + textType);
	let words =
	["telephotographs", "superphosphates", "substratosphere", "selfpropagators",
	"phraseographers", "photodegradable", "forethoughtless", "draughtproofers",
	"thalassophobes", "supersaturated", "stadholderates", "southeastwards",
	"shadowgraphers", "keratographers", "blepharoptoses", "trapezohedras",
	"thoroughfares", "subspathulate", "spheksophobes", "sphaeroblasts",
	"skateboarders", "rhabdospheres", "pseudobezoars", "perlustrators",
	"keratophagous", "heterotrophal", "hadrosauruses", "brusselsprout",
	"astrapophobes", "warehouseful", "upholsterous", "trophoblasts", "sabertoothed",
	"repostulates", "postgraduate", "phleborrhage", "outsparkled", "pegboards",
	"worktables", "afterglows", "subrogated",
	"sporulated", "outblazes", "bulwarked", "basketful", "beadworks", "furbelows",
	"upgrowths", "outwalked", "leapfrogs", "subfolder", "throwable", "breakout",
	"godfather", "leftwards", "upholder", "boltheads", "waltzers", "workbags",
	"bulkage", "powerful", "ropewalk", "workable", "wrathful", "brokage",
	"ghastful", "bearhug", "besought", "feldspar", "pourable", "wasteful",
	"earplug", "plaguer", "drought", "doublet", "flotage", "froglet", "laughter",
	"shadower", "software", "sublated", "sulfated", "troubled", "absolute",
	"baluster", "droplet", "leopard", "obdurate", "obtrudes", "petalous",
	"postural", "shoulder", "troubles", "authored", "saboteur", "rosulate",
	"gazebo", "blazer", "subzero", "zealous", "predusk", "wharfed", "brought",
	"desktop", "flatbed", "belugas", "gopher", "hazels", "flush", "fuze", "hawk",
	"folk", "dusk", "kelp", "bake", "word", "flaw", "fowl", "gulf", "kept", "park",
	"peak", "skew", "flea", "glow", "wake", "blog", "bows", "half"];

	if (textType === "top asterisk") {
		// if timer is running, count words
		if (setTimerStatus(false) === true) {
			console.log("timer is running");
			// words typed = words displayed minus one
			let wordsTyped = updateWordCount(true, true) - 1;
			console.log("word count: " + wordsTyped);
		}
		return randomThree();
	}
	if (textType === "bottom asterisk") {
		// if timer is running, count words
		if (setTimerStatus(false) === true) {
			console.log("hard timer is running");
			// words typed = words displayed minus one
			let wordsTyped = updateWordCount(true, true) - 1;
			console.log("word count: " + wordsTyped);
		}
		return words[getRandomInt(0, words.length - 1)];
	}

	let template1 =
	"aa aa aa aa aa oo oo oo oo oo " +
	"aa oo aa oo aa oo oo aa aa oo " +
	"ao ao ao oa oa oa ao ao oa oa";

	let template2 =
	"ao ae au ou oe oa ea ao uo ua " +
	"aoeu auoe uaeo uoae eoau oea " +
	"aeou aeou ouea ouae eoua uao";

	let template3 =
	"oeou eaao ouuu eeau ouao eaa " +
	"auaee ouuaa uuooo oaooe eeu " +
	"aue eeooo eaae aouoaua eaeou";

	let displayTemplate = 'stph skwr';
	let displayTemplate2 = '-f -p -l -t -d';
	let displayTemplate3 = '-r -b -g -s -z';
	let displayTemplate1 = 'aa oo ee uu';

	let thumbs = {};
	let pointers = {'a':'r','o':'h','e':'-r','u':'-f'};
	let middles = {'a':'w','o':'p','e':'-b','u':'-p'};
	let rings = {'a':'k','o':'t','e':'-g','u':'-l'};
	let pinkies = {'a':'s','o':'t','e':'-z','u':'-d'};
	let templateMod = {'a':'e', 'o':'u'};

	switch (textType) {
		case ('thumbs'):
			displayTemplate = template1;
			displayTemplate2 = template2;
			displayTemplate3 = template3;
			displayTemplate1 = template1.replace(/[a-z]/g, m => templateMod[m]);
			break;
		case ('pointers'):
			displayTemplate = template1.replace(/[a-z]/g, m => pointers[m]);
			displayTemplate2 = template2.replace(/[a-z]/g, m => pointers[m]);
			displayTemplate3 = template3.replace(/[a-z]/g, m => pointers[m]);
			templateMod = {'a':'-r', 'o':'-f'};
			displayTemplate1 = template1.replace(/[a-z]/g, m => templateMod[m]);
			break;
		case ('middles'):
			displayTemplate = template1.replace(/[a-z]/g, m => middles[m]);
			displayTemplate2 = template2.replace(/[a-z]/g, m => middles[m]);
			displayTemplate3 = template3.replace(/[a-z]/g, m => middles[m]);
			templateMod = {'a':'-b', 'o':'-p'};
			displayTemplate1 = template1.replace(/[a-z]/g, m => templateMod[m]);
			break;
		case ('rings'):
			displayTemplate = template1.replace(/[a-z]/g, m => rings[m]);
			displayTemplate2 = template2.replace(/[a-z]/g, m => rings[m]);
			displayTemplate3 = template3.replace(/[a-z]/g, m => rings[m]);
			templateMod = {'a':'-g', 'o':'-l'};
			displayTemplate1 = template1.replace(/[a-z]/g, m => templateMod[m]);
			break;
		case ('pinkies'):
			displayTemplate = template1.replace(/[a-z]/g, m => pinkies[m]);
			displayTemplate2 = template2.replace(/[a-z]/g, m => pinkies[m]);
			displayTemplate3 = template3.replace(/[a-z]/g, m => pinkies[m]);
			templateMod = {'a':'-z', 'o':'-d'};
			displayTemplate1 = template1.replace(/[a-z]/g, m => templateMod[m]);
			break;
		default:
			break;
	}

	let typingTexts = [
		displayTemplate,
		displayTemplate1,
		displayTemplate2,
		displayTemplate3
	];

	if (textNumber < typingTexts.length) {
		return typingTexts[textNumber];
	} else {
		return "stphfpltd skwrrbgsz aoeu";
	}

}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomThree() {
	let lefts = ['s', 't', 'p', 'h', 'k', 'w', 'r'];
	let vowels = ['a', 'o', 'e', 'u'];
	let rights = ['f', 'p', 'l', 't', 'd', 'r', 'b', 'g', 's', 'z'];
	let word = lefts[getRandomInt(0, lefts.length - 1)] +
		vowels[getRandomInt(0, vowels.length - 1)] +
		rights[getRandomInt(0, rights.length - 1)];
		return word;
}

// event listener for Timer
let timerListener = (function () {
	let timer = document.getElementById("timer");
	timer.addEventListener('click', function() {
		console.log("timer clicked");
		runTimer("timer");
	})
	let hardTimer = document.getElementById("hard-timer");
	hardTimer.addEventListener('click', function() {
		console.log("hard timer clicked");
		runTimer("hard-timer");
	});
})();

let updateWordCount = (function (update = false, timerStarted = false) {
	let wordCount = 0;
	return function(update = false, timerStarted = false) {
		if (update === true) {
			if (timerStarted === true) {
				wordCount += 1;
			} else if (timerStarted === false) {
				wordCount = 0;
			}
		}
		return wordCount;
	}
})();

let setTimerStatus = (function (set = false, start = false) {
	let timerStarted = false;
	return function(set = false, start = false) {
		if (set === true) {
			timerStarted = start;
			console.log("timerStarted: " + timerStarted);
		}
		return timerStarted;
	}
})();

function runTimer (whichTimer) {

	// start timer
	let timer = document.getElementById(whichTimer);
	setTimerStatus(true, true);

	// reset text number, highlight position
	nextIndex(false, true);
	if (whichTimer === "timer") {
		setKeyGroup(true, "top asterisk");
	} else if (whichTimer === "hard-timer") {
		setKeyGroup(true, "bottom asterisk");
	}

	document.getElementById("display-text").innerHTML = resetText(true, true, true);

	// update timer every second
	let tInterval = null;
	let startTime = Date.now();
	let timeDifference = 0;
	let timeLeft = 60;
	if (tInterval) {
		clearInterval(tInterval);
	}
	tInterval = setInterval(function () {
		timeDifference = Math.floor((Date.now() - startTime) / 1000);
		timeLeft = 60 - timeDifference;
		timer.innerHTML = timeLeft;

		// stop timer
		if (timeLeft <= 0) {
			clearInterval(tInterval);
			timer.innerHTML = "0";
			let finalCount = updateWordCount(false);
			console.log("FINAL word count: " + finalCount);
			setTimerStatus(true, false);
			updateWordCount(true, false);
			let adjustedCount = Math.round((finalCount * 3) / 5); // 5 letters per word avg
			timer.innerHTML = finalCount + " WPM";
			setTimeout(function () {
				timer.innerHTML = adjustedCount + " wpm adj";
			}, 2000)
		}
	}, 1000);
}
