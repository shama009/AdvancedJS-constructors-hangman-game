var inquirer = require("inquirer");
var displayGuesses = "";
var guessesLeft = 10;
var correctGuess = false;

var Letter = function (userGuess, movieName) {
    this.userGuess = userGuess;
    this.movieName = movieName;
    
    var validateUserGuess = function () {
        for (var i = 0; i < this.movieName.length; i++) {
            if (this.movieName[i] === this.userGuess) {
                displayGuesses = displayGuesses + this.movieName[i] + " ";
                correctGuess = true;
            } else if (this.movieName[i] === " ") {
                displayGuesses = displayGuesses + "  ";
            }
            else {
                displayGuesses = displayGuesses + "_ ";
            }
        }
        if(correctGuess){
            console.log("Letter Guessed: "+this.userGuess);
            console.log(this.displayGuesses);
            console.log("CORRECT!!!");
            correctGuess = false;
        }else{
            guessesLeft--;
            console.log(this.displayGuesses);
            console.log("INCORRECT!!!");
            console.log("Guesses left: "+guessesLeft);
        }
        
    }
}

Letter.prototype.reset = function(){
    if(guessesLeft<=0){
        return console.log("Game Over!!");
    }
}