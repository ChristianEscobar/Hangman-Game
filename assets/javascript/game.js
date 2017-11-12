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

var guessInProgress = false;
var chosenWord;
var wordGuessProgress = [];
var wordToGuessDiv;
var userGuessesDiv;

function playGame() {
	wordToGuessDiv = document.getElementById('word-to-guess');
	userGuessesDiv = document.getElementById('user-guesses');

	document.onkeyup = function(event) {
		var userGuess = event.key;

		if(userGuess !== 'Meta') {
			if(guessInProgress) {

			}
			else {
				clearUserGuesses();

				setupNewWord();

				displayWordGuessProgress();

				updateUserGuesses(userGuess);

				//guessInProgress = true;
			}
		}
	};

	return;
}

function setupNewWord() {
	// Choose a word for user to guess
	chosenWord = wordList[Math.floor(Math.random() * wordList.length)];

	console.log(chosenWord);

	// For Debug Only
	//console.log(chosenWord);
	console.log("> " + chosenWord.length);

	// Since this is a new word, setup the display div
	wordToGuessDiv.textContent = '';

	for(var i=0; i<chosenWord.length; i++) {
		wordGuessProgress.push("_");
	}

	return;
}

function displayWordGuessProgress() {
	for(var i=0; i<wordGuessProgress.length; i++) {
		if(i === 0) {
			wordToGuessDiv.textContent = wordGuessProgress[i] + '    '
		} else {
			wordToGuessDiv.textContent += wordGuessProgress[i] + '    '
		}
	}

	return;
}

function updateUserGuesses(userGuess) {
	userGuessesDiv.textContent += ' ' + userGuess;

	return;
}

function clearUserGuesses() {
	userGuessesDiv.textContent = '';
}

function checkUserGuess(userGuess) {
	// Check if userGuess is contained within the current word
	for(var i=0; i<chosenWord.length; i++) {

	}

	return;
}
