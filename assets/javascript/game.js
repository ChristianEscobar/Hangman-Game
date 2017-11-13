/*
If word has not been chosen
	choose a word
else
	get user input
	check if user input previously used
*/

var wordList = ["Super Mario Bros",
								"The Legend of Zelda",
								"Portal",
								"Half-Life",
								"Super Metroid",
								"Halo",
								"Tetris",
								"Super Mario World",
								"Sid Meiers Pirates",
								"Chrono Trigger",
								"Minecraft",
								"Grand Theft Auto",
								"Baldurs Gate",
								"Deus Ex",
								"Street Fighter",
								"Super Mario Galaxy",
								"Star Wars TIE Fighter",
								"Metal Gear Solid",
								"Castlevania",
								"Final Fantasy",
								"Red Dead Redemption",
								"Rock Band",
								"World of Warcraft",
								"BioShock",
								"Silent Hill",
								"Journey",
								"Resident Evil",
								"Diablo"];

var isGuessInProgress = false;
var currentWord;
var wordGuessProgress = [];
var numberOfGuessesRemaining = 15;
var totalCorrect = 0;
var totalToWin = 0;

var wordToGuessDiv;
var userGuessListDiv;
var guessesRemainingDiv;
var winOrLoseDiv;

function playGame() {
	wordToGuessDiv = document.getElementById('word-to-guess');
	userGuessListDiv = document.getElementById('user-guesses');
	guessesRemainingDiv = document.getElementById("remaining-guesses");
	winOrLoseDiv = document.getElementById("win-or-lose");

	document.onkeyup = function(event) {
		var userGuess = event.key;

		if(userGuess !== 'Meta') {
			if(isGuessInProgress) {
				checkUserGuess(userGuess);

				displayWordGuessProgress();

				updateUserGuesses(userGuess);

				//updateNumberOfGuessesRemaining(false);

				if(isWinner()) {
					// Debug only
					console.log('isWinner is true');

					updateElementTextContent(winOrLoseDiv, 'YOU WIN!!!', false);

					isGuessInProgress = false;
				} else if(!moreGuessesAllowed()) {
						updateElementTextContent(winOrLoseDiv, 'YOU LOSE!', false);
						
						isGuessInProgress = false;
				} else {
					isGuessInProgress = true;
				}
			}
			else {
				//updateElementTextContent(winOrLoseDiv, '', false);

				clearUserGuesses();

				setupNewWord();

				displayWordGuessProgress();

				isGuessInProgress = true;
			}
		}
	};

	return;
}

function setupNewWord() {
	// Choose a word for user to guess
	currentWord = wordList[Math.floor(Math.random() * wordList.length)];

	console.log(currentWord);

	// For Debug Only
	//console.log(currentWord);
	//console.log("> " + currentWord.length);

	// Since this is a new word, setup the display div
	updateElementTextContent(wordToGuessDiv, '', false);

	// Clear the word guess progress array
	wordGuessProgress = [];

	for(var i=0; i<currentWord.length; i++) {
		wordGuessProgress.push("_");
	}

	// Set the total to win value
	totalToWin = currentWord.length;

	return;
}

function displayWordGuessProgress() {
	for(var i=0; i<wordGuessProgress.length; i++) {
		if(i === 0) {
			updateElementTextContent(wordToGuessDiv, wordGuessProgress[i] + '    ', false);
		} else {
			updateElementTextContent(wordToGuessDiv, wordGuessProgress[i] + '    ', true);
		}
	}

	return;
}

function updateUserGuesses(userGuess) {
	updateElementTextContent(userGuessListDiv, ' ' + userGuess, true);

	return;
}

function clearUserGuesses() {
	updateElementTextContent(userGuessListDiv, '', false);

	return;
}

function checkUserGuess(userGuess) {
	// Check if userGuess is contained within the current word
	var indexOfGuess = currentWord.toLowerCase().indexOf(userGuess);

	// Debug ONLY
	//console.log("indexOfGuess", indexOfGuess);

	while(indexOfGuess >= 0) {
		totalCorrect++;

		wordGuessProgress[indexOfGuess] = userGuess;

		indexOfGuess = currentWord.toLowerCase().indexOf(userGuess, indexOfGuess + 1);

		// Debug ONLY
		//console.log("indexOfGuess", indexOfGuess);
	}

	return;
}

function updateNumberOfGuessesRemaining(resetGuesses) {
	if(resetGuesses) {
		numberOfGuessesRemaining = 15;
	}
	else {
		numberOfGuessesRemaining--;
	}

	updateElementTextContent(guessesRemainingDiv, numberOfGuessesRemaining, false);

	return;
}

function isWinner() {
	if(totalCorrect === totalToWin) {
		return true;
	}

	return false;
}

function moreGuessesAllowed() {
	if(numberOfGuessesRemaining >= 1) {
		return true;
	} 

	return false;
}

function updateElementTextContent(element, text, append) {
	if(append) {
		element.textContent += text;
	} else {
		element.textContent = text;
	}

	return;
}
