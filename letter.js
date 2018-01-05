var inquirer = require("inquirer");
var Word = require("./word.js");

var guessesLeft = 10;
var correctGuess = false;
var wordGuessed = false;
var matchedLetters = [];
var Letter = function () {

    this.validateUserGuess = function (userGuess) {
        this.userGuess = userGuess;

        for (var i = 0; i < movieToGuess.length; i++) {
            //console.log(matchedLetters);
            if ((movieToGuess[i].toLowerCase() === this.userGuess) && (matchedLetters.indexOf(this.userGuess.toUpperCase()) === -1)) {
                correctGuess = true;
                matchedLetters.push(this.userGuess.toUpperCase());

            }
        }
        if (correctGuess) {
            correctGuess = false;
            console.log("Letter Guessed: " + this.userGuess);
            this.displayGuesses();
            console.log("\nCORRECT!!!");

        } else {
            guessesLeft--;
            this.displayGuesses();
            console.log("\nINCORRECT!!!");
            console.log("\nGuesses left: " + guessesLeft);

        }

    }

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
        console.log(displayWord);

    }
}

Letter.prototype.reset = function () {
    if (guessesLeft <= 0) {
         console.log("Game Over!!");
         inquirer.prompt([
            {
                message: "Play again? (y/n) ",
                name: "playAgain"
            }]).then(function (answer) {
                if((answer.playAgain == "Y") || (answer.playAgain == "y")){
                    guessesLeft = 10;
                    wordGuessed = false;
                    index++;
                    matchedLetters = [];
                    newGame(index);
                    
                } else{
                    return console.log("GoodBye!!");
                }
            }).catch(function (err) {
                // log the errer if the promise is rejected
                console.log(err);
            });
         
    }
    else if(wordGuessed){
        console.log("Congratulations! You Won!!\n" + "Correct Answer: " + movieToGuess);
        inquirer.prompt([
            {
                message: "Play again? (y/n) ",
                name: "playAgain"
            }]).then(function (answer) {
                if((answer.playAgain == "Y") || (answer.playAgain == "y")){
                    guessesLeft = 10;
                    wordGuessed = false;
                    index++;
                    matchedLetters = [];
                    newGame(index);
                    
                } else{
                    return console.log("GoodBye!!");
                }
            }).catch(function (err) {
                // log the errer if the promise is rejected
                console.log(err);
            });
    }
}


// get user input using inquirer
var GuessLetter = function () {
    if ((guessesLeft > 0) && (!wordGuessed)) {
        inquirer.prompt([
            {
                message: "? Guess a letter! ",
                name: "userGuess"
            }]).then(function (answer) {
                letter.validateUserGuess(answer.userGuess);
                letter.reset();
                GuessLetter();

            }).catch(function (err) {
                // log the error if the promise is rejected
                console.log(err);
            });
    }

}

//get a movie name from array of movies
var index = 0;
var movieToGuess = "";
var letter = new Letter();
function newGame(index){
    
    var word = new Word(index);
    //word.startGame();
    movieToGuess = word.movie;
    letter.displayGuesses();
    GuessLetter();
}

newGame(index);


