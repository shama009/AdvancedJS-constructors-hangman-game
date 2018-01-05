var inquirer = require("inquirer");
var Word = require("./word.js");

var guessesLeft = 10;
var correctGuess = false;
var wordGuessed = false;
var matchedLetters = [];
var guessedLetters = [];
var index = 0;
var movieToGuess = "";

// Letter constructor  used for each letter in the current word. 
// Each letter object should either display an underlying character, 
// or a blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter.
var Letter = function () {
    this.validateUserGuess = function (userGuess) {
        this.userGuess = userGuess;
        // validate user user input and populate matchedLetters array
        for (var i = 0; i < movieToGuess.length; i++) {
            if ((movieToGuess[i].toLowerCase() === this.userGuess) && (matchedLetters.indexOf(this.userGuess.toUpperCase()) === -1)) {
                correctGuess = true;
                matchedLetters.push(this.userGuess.toUpperCase());
            }
        }
        if (correctGuess) {
            correctGuess = false;
            this.displayGuesses();
            console.log("\nCORRECT!!!");

        } else {
            // guessesLeft--;
            this.displayGuesses();
            console.log("\nINCORRECT!!!");
            console.log("Guesses left: " + guessesLeft);
        }
    }

    // displays completed/incomplete word based on user guesses. 
    // It basically populated placeholders("_") with correct userGuesses
    this.displayGuesses = function () {
        var displayWord = "";
        for (var i = 0; i < movieToGuess.length; i++) {
            // If the current letter has been guessed, display that letter.
            if (matchedLetters.indexOf(movieToGuess[i].toUpperCase()) !== -1) {
                displayWord += movieToGuess[i];
            }
            else if (movieToGuess[i] === " ") {
                displayWord += "  ";
            }
            // If it hasn't been guessed, display a "_" instead.
            else {
                displayWord += " _ ";
            }
        }
        if (!(displayWord.includes("_"))) {
            wordGuessed = true;
        }
        console.log("\n" + displayWord);

    }
    // keep track of user guesses and calculate guesses left
    this.updateUserGuesses = function(userGuess) {
    // If the letter is not in the guessedLetters array, and the letter is not in the lettersOfTheWord array..
    if ((guessedLetters.indexOf(userGuess) === -1) && (movieToGuess.indexOf(userGuess) === -1)) {
        
              // Add the letter to the guessedLetters array.
              guessedLetters.push(userGuess);
        
              // Decrease guesses by one.
              guessesLeft--;
              guessedLetters.join(", ");
            }
    }
}

// Reset or restart game based on user preference
Letter.prototype.reset = function () {
    if (guessesLeft <= 0) {
        console.log("Game Over!!");
        inquirer.prompt([
            {
                message: "Play again? (y/n) ",
                name: "playAgain"
            }]).then(function (answer) {
                if ((answer.playAgain == "Y") || (answer.playAgain == "y")) {
                    guessesLeft = 10;
                    wordGuessed = false;
                    index++;
                    matchedLetters = [];
                    newGame(index);

                } else {
                    return console.log("GoodBye!!");
                }
            }).catch(function (err) {
                // log the error if the promise is rejected
                console.log(err);
            });

    }
    else if (wordGuessed) {
        console.log("Congratulations! You Won!!\n" + "Correct Answer: " + movieToGuess);
        inquirer.prompt([
            {
                message: "Play again? (y/n) ",
                name: "playAgain"
            }]).then(function (answer) {
                if ((answer.playAgain == "Y") || (answer.playAgain == "y")) {
                    guessesLeft = 10;
                    wordGuessed = false;
                    index++;
                    matchedLetters = [];
                    newGame(index);

                } else {
                    return console.log("GoodBye!!");
                }
            }).catch(function (err) {
                // log the error if the promise is rejected
                console.log(err);
            });
    }
}


// get user input using inquirer and use Letter constructor for game logic
var GuessLetter = function () {
    if ((guessesLeft > 0) && (!wordGuessed)) {
        inquirer.prompt([
            {
                message: "? Guess a letter! ",
                name: "userGuess"
            }]).then(function (answer) {
                letter.updateUserGuesses(answer.userGuess);
                letter.validateUserGuess(answer.userGuess);
                letter.reset();
                GuessLetter();

            }).catch(function (err) {
                // log the error if the promise is rejected
                console.log(err);
            });
    }

}

// create an instance of Letter constructor to use its properties and methods
var letter = new Letter();
function newGame(index) {
    // create an instance for Word constructor in word.js
    var word = new Word(index);
    //get a movie name from array of movies
    movieToGuess = word.movie;
    console.log("Theme: Movies Released in 2017");
    letter.displayGuesses();
    GuessLetter();
}

// start the game
newGame(index);


