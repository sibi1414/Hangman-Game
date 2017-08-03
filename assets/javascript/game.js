// VARIABLES
// =================================================================================
var wins = 0;
var placeholderArray = [];
var prevPlaceholderArray = [];
var wordPlaceholder = [];
var lettersGuessed = [];
var word = [];
var wordPlaceholderString = "";
var userInput = "";
var correctGuessCount = 0;
var guessesLeft = 10;


var GOTWords = {
	word1: ["T", "A", "R", "G", "A", "R", "Y", "E", "N"],
	word2: ["W", "I", "N", "T", "E", "R", "F", "E", "L", "L"],
	word3: ["H", "O", "D", "O", "R"],
	word4: ["L", "A", "N", "N", "I", "S", "T", "E", "R"],
	word5: ["T", "Y", "R", "I", "O", "N"],
	word6: ["J", "O", "N", "S", "N", "O", "W"],
	word7: ["S", "A", "N", "S", "A"]
};


var wordArray = [GOTWords.word1, GOTWords.word2, GOTWords.word3, GOTWords.word4, GOTWords.word5, GOTWords.word6, GOTWords.word7];


createWord(wordArray);

// MAIN PROCESS
// =================================================================================
document.onkeyup = function(event) {
	console.log('This is the key entered', event.key);
	var keyPress;

	if (typeof event != 'undefined') {
		keyPress = event.keyCode;

		
		userInput = String.fromCharCode(keyPress).toUpperCase();
		console.log(userInput + " should match the key entered");

	
		trackLetterGuesses(userInput);

		
		pauseAudio();

		
		buildWord(userInput);
	}

	
	else if (e) {
		keyPress = e.which;
	}
	return false;
};

// FUNCTIONS
// =================================================================================


function createWord(wordArray) {
	word = wordArray[Math.floor(Math.random()*wordArray.length)];
	console.log(word);

	
	createWordPlaceholder(word);
	return word;
};


function createWordPlaceholder(word) {	
	var wordPlaceholder = [];


	for (i = 0; i < word.length; i++) {
		wordPlaceholder.push("_");
	}

	
	wordPlaceholderString = wordPlaceholder.join(" ");


	document.getElementById('word-placeholder').textContent = wordPlaceholderString;
	return wordPlaceholder;
};


function trackLetterGuesses(userInput) {

	
	for (i = 0; i < lettersGuessed.length; i++) {
		if (userInput == lettersGuessed[i]) {
			return;
		}
	}

	lettersGuessed.push(userInput);
	console.log("LettersGuessed array item: " + lettersGuessed[0]);
	
	
	var lettersGuessedString = lettersGuessed.join(", ");
	document.getElementById('letters-guessed').innerHTML = lettersGuessedString;

	
	guessesLeft--;

	
	document.getElementById('guess-count').innerHTML = guessesLeft;
	console.log('Guesses left' + guessesLeft);


	if (guessesLeft == 0) {
		restartGame();
	}

	return lettersGuessedString;
};


function buildWord(userInput) {

	
	if (prevPlaceholderArray.length == 0) {
		placeholderArray = createWordPlaceholder(word);

	
	} else {
		placeholderArray = prevPlaceholderArray;
	}

	
	for (var i = 0; i < word.length; i++) {
	  console.log('Word is ' + word);
	  if (userInput == word[i]) {
	  	console.log(userInput + " is in word at " + i);
	  	//
	  	placeholderArray[i] = userInput;
	  }
	}

	prevPlaceholderArray = placeholderArray;


	placeholder = placeholderArray.join(" ");
	document.getElementById('word-placeholder').innerHTML = placeholder;

	console.log("Placeholder Array length is " + placeholderArray.length);
	console.log("Placeholder split is " + placeholder.split(","));
	console.log("Word join is " + word.join(" "));
	
	
	if (placeholder.split(',') == word.join(" ")) {
		console.log("Woot");
		wins++;
		playAudio();
		document.getElementById('win-count').innerHTML = wins;
		restartGame();
	}
};

function playAudio() { 
	
	var vid = document.getElementById("music"); 
    vid.play(); 
}

function pauseAudio() { 

	var vid = document.getElementById("music"); 
    vid.pause(); 
}


function restartGame(wordPlaceholder) {
	

	createWord(wordArray);

	
    userInput = "";
	prevPlaceholderArray = [];
	placeholderArray = [];

	
	guessesLeft = 13;

	
	correctGuessCount = 0;
	document.getElementById('guess-count').innerHTML = guessesLeft;

	
	lettersGuessed = [];
	document.getElementById('letters-guessed').innerHTML = lettersGuessed;
};
