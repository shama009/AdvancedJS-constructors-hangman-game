var inquirer = require("inquirer");
var Word = require("./word.js");

var guessesLeft = 10;
var correctGuess = false;
var wordGuessed = false;
var matchedLetters = [];
var Letter = function () {

    this.validateUserGuess = function (userGuess, movieName) {
        this.userGuess = userGuess;
        this.movieName = movieName;
        for (var i = 0; i < this.movieName.length; i++) {
            //console.log(matchedLetters);
            console.log(matchedLetters.indexOf(this.userGuess));
            if ((this.movieName[i].toLowerCase() === this.userGuess) && (matchedLetters.indexOf(this.userGuess) === -1)) {
                correctGuess = true;
                matchedLetters.push(this.userGuess.toUpperCase());
                
            } 
        }
        if (correctGuess) {
            correctGuess = false;
            console.log("Letter Guessed: " + this.userGuess);
            this.displayGuesses();
            console.log("\nCORRECT!!!");
            // if(!(displayGuesses.includes("_"))){
            //     wordGuessed = true;
            // }
        } else {
            guessesLeft--;
            this.displayGuesses();
            console.log("\nINCORRECT!!!");
            console.log("\nGuesses left: " + guessesLeft);

        }

    }

    this.displayGuesses = function () {
        var displayWord = "";
        for (var i = 0; i < this.movieName.length; i++) {
            // If the current letter has been guessed, display that letter.
            if (this.matchedLetters.indexOf(this.movieName[i]) !== -1) {
                // console.log(this.matchedLetters);
                displayWord += this.movieName[i];
            }
            else if (this.movieName[i] === " ") {
                displayWord +="  ";
                 }
            // If it hasn't been guessed, display a "_" instead.
            else {
                displayWord += " _ ";
            }
        }
        console.log(displayWord);

    }
}

Letter.prototype.reset = function () {
    if (guessesLeft <= 0) {
        return console.log("Game Over!!");
    }
}


// get user input using inquirer
var GuessLetter = function () {
    if ((guessesLeft > 0) || (!wordGuessed)) {
        inquirer.prompt([
            {
                message: "? Guess a letter! ",
                name: "userGuess"
            }]).then(function (answer) {
                var letter = new Letter();
                letter.validateUserGuess(answer.userGuess, movieToGuess);
                letter.reset();
                GuessLetter();

            });
    }

}

//get a movie name from array of movies

var word = new Word(2);
word.startGame();
var movieToGuess = word.movie;

GuessLetter();
