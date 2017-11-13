var titleList = ["Super Mario Bros",
								"The Legend of Zelda",
								"Portal",
								"Half Life",
								"Super Metroid",
								"Halo",
								"Tetris",
								"Super Mario World",
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
								"Diablo",
								"Pac Man",
								"Mrs Pac Man",
								"Contra",
								"Dig Dug",
								"Mortal Kombat",
								"Tekken"];

// For debug only
//var titleList = ["Sid Meiers Pirates"];

var isGuessInProgress = false;
var currentTitle;
var titleGuessProgress = [];
var guessStack = [];
var numberOfGuessesRemaining;
var totalCorrect = 0;
var totalToWin = 0;
var totalWins = 0;

var titleToGuessDiv;
var userGuessListDiv;
var guessesRemainingDiv;
var winOrLoseDiv;
var winsDiv;

/* Entry point */
function playGame() {
	titleToGuessDiv = document.getElementById('title-to-guess');
	userGuessListDiv = document.getElementById('user-guesses');
	guessesRemainingDiv = document.getElementById("remaining-guesses");
	winOrLoseDiv = document.getElementById("win-or-lose");
	winsDiv = document.getElementById("wins");

	document.onkeyup = function(event) {
		var userGuess = event.key;

		if(userGuess !== 'Meta') {
			if(isGuessInProgress) {
				// If the user has already guessed this letter, skip processing
				if(!letterAlreadyGuessed(userGuess)) {
					checkUserGuess(userGuess);

					displayTitleGuessProgress();

					updateUserGuesses(userGuess, false);

					updateNumberOfGuessesRemaining(false, 0);

					if(isWinner()) {
						// Debug only
						//console.log('isWinner is true');

						updateElementTextContent(winOrLoseDiv, 'YOU WIN!!!', false);

						//Update wins counter
						totalWins++;

						//Update wins display
						updateElementTextContent(winsDiv, totalWins, false);

						isGuessInProgress = false;
					} else if(!moreGuessesAllowed()) {
							updateElementTextContent(winOrLoseDiv, 'YOU LOSE!', false);
							
							isGuessInProgress = false;
					} else {
						isGuessInProgress = true;
					}
				}
			}
			else {
				resetGame();
			}
		}
	};

	return;
}

function resetGame() {
	updateElementTextContent(winOrLoseDiv, '', false);

	// Clear user guesses display
	updateElementTextContent(userGuessListDiv, '', false);

	// Update wins display back to 0
	updateElementTextContent(winsDiv, totalWins, false);

	// Update guesses remaining display
	updateElementTextContent(guessesRemainingDiv, numberOfGuessesRemaining, false);

	setupNewTitle();

	// Reset number of guesses remaining
	updateNumberOfGuessesRemaining(true, 15);

	// Called to clear the guess stack
	updateUserGuesses('', true);

	// At this point the progress should be set to all underscores
	displayTitleGuessProgress();

	isGuessInProgress = true;

	return;
}

// Sets up a new title for user to guess by randomly choosing from the title list array
function setupNewTitle() {
	// Reset total correct counter
	totalCorrect = 0;

	// Choose a title for user to guess
	currentTitle = titleList[Math.floor(Math.random() * titleList.length)];

	// For Debug Only
	//console.log(currentTitle);
	//console.log(currentTitle);
	//console.log("> " + currentTitle.length);

	// Since this is a new title setup the display div
	updateElementTextContent(titleToGuessDiv, '', false);

	// Clear the title guess progress array
	titleGuessProgress = [];

	// Setup the guess progress array
	// If the word contains spaces, increment the correct guess counter
	for(var i=0; i<currentTitle.length; i++) {
		if(currentTitle.charAt(i) === ' ') {
			// DEBUG only
			//console.log('Space found in title!');

			// Push a dash as separator
			titleGuessProgress.push('-');

			totalCorrect++;
		} else {
			titleGuessProgress.push('_');	 
		}
	}

	// Set the total to win value
	totalToWin = currentTitle.length;

	return;
}

// Updates the guess progress display
function displayTitleGuessProgress() {

	//console.log(titleGuessProgress);

	// Since titles can contain spaces, we want the spaces treated as new lines in the display
	for(var i=0; i<titleGuessProgress.length; i++) {

		if(i === 0) {
			updateElementTextContent(titleToGuessDiv, titleGuessProgress[i] + '    ', false);
		} else {
			updateElementTextContent(titleToGuessDiv, titleGuessProgress[i] + '    ', true);
		}
	}

	return;
}

// Updates the user guesses stack
// If clearStack is true, userGuess will be ignored
function updateUserGuesses(userGuess, clearStack) {
	if(clearStack) {
		guessStack = [];
	} else {
		// Update the display div
		updateElementTextContent(userGuessListDiv, ' ' + userGuess.toUpperCase(), true);

		// Push it to the stack
		guessStack.push(userGuess);
	}
	
	return;
}

// Checks if the user input is contained in the title currently being guessed
function checkUserGuess(userGuess) {
	// Ignore "-" and "_"
	if(userGuess === '-' || userGuess === '_') {
		return;
	}

	// Check if userGuess is contained within the current title
	var indexOfGuess = currentTitle.toLowerCase().indexOf(userGuess);

	// Debug ONLY
	//console.log("indexOfGuess", indexOfGuess);

	while(indexOfGuess >= 0) {
		totalCorrect++;

		titleGuessProgress[indexOfGuess] = userGuess;

		indexOfGuess = currentTitle.toLowerCase().indexOf(userGuess, indexOfGuess + 1);

		// Debug ONLY
		//console.log("indexOfGuess", indexOfGuess);
	}

	return;
}

// Updates the number of guesses counter by subtracting one, if resetGuesses is true, it will set the value to the specified value
function updateNumberOfGuessesRemaining(resetGuesses, toThisValue) {
	if(resetGuesses) {
		numberOfGuessesRemaining = toThisValue;
	}
	else {
		numberOfGuessesRemaining--;
	}

	// Update display
	updateElementTextContent(guessesRemainingDiv, numberOfGuessesRemaining, false);

	return;
}

// Checks if the user is a winner
function isWinner() {
	//console.log("totalCorrect", totalCorrect, "totalToWin", totalToWin);
	if(totalCorrect === totalToWin) {
		return true;
	}

	return false;
}

// Checks if the user can continue guessing
function moreGuessesAllowed() {
	if(numberOfGuessesRemaining >= 1) {
		return true;
	} 

	return false;
}

// Updates the text for the specified HTML element.  If append is true, text provided will be appended to any existing content.
function updateElementTextContent(element, text, append) {
	if(append) {
		element.textContent += text;
	} else {
		element.textContent = text;
	}

	return;
}

// Check if the user input is already part of the guess stack
function letterAlreadyGuessed(userGuess) {
	var indexInStack = guessStack.indexOf(userGuess);

	if(indexInStack >= 0) {
		return true;
	}

	return false;
}
