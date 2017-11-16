/* Hangman Game using object */

var hangmanGameObj = {
	titleList: ["Super Mario Bros",
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
								"Tekken",
								"Pokemon",
								"Call of Duty",
								"Fallout",
								"Donkey Kong",
								"Tony Hawks Pro Skater",
								"Sonic The Hedgehog",
								"Galaga"],
	isGuessInProgress: false,
	currentTitle: '',
	titleGuessProgress: [],
	guessStack: [],
	numberOfGuessesRemaining: 0,
	totalCorrect: 0,
	totalToWin: 0,
	totalWins: 0,
	titleToGuessDiv: null,
	userGuessListDiv: null,
	guessesRemainingDiv: null,
	winLoseDiv: null,
	winsDiv: null,
	insertCoinAudio: null,
	loseGameAudio: null,
	winGameAudio: null,
	correctAudio: null,
	initializeElements: function() {
							this.titleToGuessDiv = document.getElementById('title-to-guess');
							this.userGuessListDiv = document.getElementById('user-guesses');
							this.guessesRemainingDiv = document.getElementById("remaining-guesses");
							this.winLoseDiv = document.getElementById("win-lose");
							this.winsDiv = document.getElementById("wins");
							this.insertCoinAudio = document.getElementById("insert-coin");
							this.loseGameAudio = document.getElementById("lose-game");
							this.winGameAudio = document.getElementById("win-game");
							this.correctAudio = document.getElementById("correct")

							return;
						},
	keyValidation:  function(userGuess) {
						if(userGuess === 'Meta' || userGuess === '-' || userGuess == ' ') {
							return false;
						}

						return true;
					},
	playGame: function(userGuess) {
					// If the user has already guessed this letter, skip processing
					if(this.letterAlreadyGuessed(userGuess)) {
						return;
					}

					this.checkUserGuess(userGuess);

					this.displayTitleGuessProgress();

					this.updateUserGuesses(userGuess, false);

					this.updateNumberOfGuessesRemaining(false, 0);

					if(this.isWinner()) {
						// Debug only
						//console.log('isWinner is true');

						// Play win game audio
						this.winGameAudio.play();

						// Display winner
						this.showWinOrLose(true);

						//Update wins counter
						this.totalWins++;

						//Update wins display
						this.updateElementTextContent(this.winsDiv, this.totalWins, false);

						this.isGuessInProgress = false;
					} else if(!this.moreGuessesAllowed()) {
						// Play lose game audio
						this.loseGameAudio.play();

						// Display lose
						this.showWinOrLose(false);
						
						this.isGuessInProgress = false;
					} else {
						this.isGuessInProgress = true;
					}

					return;
				},
	resetGame: function() {
					// Play insert coin audio
					this.insertCoinAudio.play();

					// Hide the win/lose div element
					this.showHideElement(this.winLoseDiv, false);

					// Clear user guesses display
					this.updateElementTextContent(this.userGuessListDiv, '', false);

					// Update wins display back to 0
					this.updateElementTextContent(this.winsDiv, this.totalWins, false);

					// Update guesses remaining display
					this.updateElementTextContent(this.guessesRemainingDiv, this.numberOfGuessesRemaining, false);

					this.setupNewTitle();

					// Reset number of guesses remaining
					this.updateNumberOfGuessesRemaining(true, 15);

					// Called to clear the guess stack
					this.updateUserGuesses('', true);

					// At this point the progress should be set to all underscores
					this.displayTitleGuessProgress();

					this.isGuessInProgress = true;

					return;
				},
	setupNewTitle: function() {
						// Reset total correct counter
						this.totalCorrect = 0;

						// Choose a title for user to guess
						this.currentTitle = this.titleList[Math.floor(Math.random() * this.titleList.length)];

						// For Debug Only
						//console.log(currentTitle);
						//console.log(currentTitle);
						//console.log("> " + currentTitle.length);

						// Since this is a new title setup the display div
						this.updateElementTextContent(this.titleToGuessDiv, '', false);

						// Clear the title guess progress array
						this.titleGuessProgress = [];

						// Setup the guess progress array
						// If the word contains spaces, increment the correct guess counter
						for(var i=0; i<this.currentTitle.length; i++) {
							if(this.currentTitle.charAt(i) === ' ') {
								// DEBUG only
								//console.log('Space found in title!');

								// Push a dash as separator
								this.titleGuessProgress.push('-');

								this.totalCorrect++;
							} else {
								this.titleGuessProgress.push('_');	 
							}
						}

						// Set the total to win value
						this.totalToWin = this.currentTitle.length;

						return;
					},
	displayTitleGuessProgress: function() {
									//console.log(titleGuessProgress);

									// Since titles can contain spaces, we want the spaces treated as new lines in the display
									for(var i=0; i<this.titleGuessProgress.length; i++) {

										if(i === 0) {
											this.updateElementTextContent(this.titleToGuessDiv, this.titleGuessProgress[i] + '    ', false);
										} else {
											this.updateElementTextContent(this.titleToGuessDiv, this.titleGuessProgress[i] + '    ', true);
										}
									}

									return;
								},
	updateUserGuesses: function(userGuess, clearStack) {
							if(clearStack) {
								this.guessStack = [];
							} else {
								// Update the display div
								this.updateElementTextContent(this.userGuessListDiv, ' ' + userGuess.toUpperCase(), true);

								// Push it to the stack
								this.guessStack.push(userGuess);
							}
							
							return;
						},
	checkUserGuess: function(userGuess) {
						// Check if userGuess is contained within the current title
						var indexOfGuess = this.currentTitle.toLowerCase().indexOf(userGuess);

						// Debug ONLY
						//console.log("indexOfGuess", indexOfGuess);

						while(indexOfGuess >= 0) {
							this.correctAudio.play();

							this.totalCorrect++;

							this.titleGuessProgress[indexOfGuess] = userGuess;

							indexOfGuess = this.currentTitle.toLowerCase().indexOf(userGuess, indexOfGuess + 1);

							// Debug ONLY
							//console.log("indexOfGuess", indexOfGuess);
						}

						return;
					},
	updateNumberOfGuessesRemaining: function(resetGuesses, toThisValue) {
										if(resetGuesses) {
											this.numberOfGuessesRemaining = toThisValue;
										}
										else {
											this.numberOfGuessesRemaining--;
										}

										// Update display
										this.updateElementTextContent(this.guessesRemainingDiv, this.numberOfGuessesRemaining, false);

										return;
									},
	isWinner: function() {
				//console.log("totalCorrect", totalCorrect, "totalToWin", totalToWin);
				if(this.totalCorrect === this.totalToWin) {
					return true;
				}

				return false;
			  },
	moreGuessesAllowed: function() {
							if(this.numberOfGuessesRemaining >= 1) {
								return true;
							} 

							return false;
						},
	updateElementTextContent: function(element, text, append) {
									if(append) {
										element.textContent += text;
									} else {
										element.textContent = text;
									}

									return;
								},
	letterAlreadyGuessed: function(userGuess) {
								var indexInStack = this.guessStack.indexOf(userGuess);

								if(indexInStack >= 0) {
									return true;
								}

								return false;
							},
	showWinOrLose: function(isWinner) {
						//var winLoseDiv = document.getElementById('win-lose');

						if(isWinner) {
							this.winLoseDiv.style.backgroundImage = "url('./assets/images/win.png')";
						} else {
							this.winLoseDiv.style.backgroundImage = "url('./assets/images/pwned.png')";
						}

						this.showHideElement(this.winLoseDiv, true);

						return;
					},
	showHideElement: function(element, show) {
							if(show) {
								element.style.display = 'block';
							} else {
								element.style.display = 'none';
							}

							return;
						},
};

// Entry point
function startGame() {
	hangmanGameObj.initializeElements();

	// Event listener
	document.onkeyup = function(event) {
		var userGuess = event.key;

		if(hangmanGameObj.keyValidation(userGuess)) {
			if(hangmanGameObj.isGuessInProgress) {
				hangmanGameObj.playGame(userGuess);
			}
			else {
				hangmanGameObj.resetGame();
			}
		}
	};

	return;
}
