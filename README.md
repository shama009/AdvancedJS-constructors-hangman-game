# js-constructors-hangman-game

1. This is a hangman command-line game using constructor functions.
2. The theme of the game is "Movies released in 2017".
3. The game receive user input using the inquirer npm packages.

###Following are the constructor functions created.###
1. Word: Used to create an object representing the current word the user is attempting to guess.
2. Letter: Used for each letter in the current word. Each letter object should either display an underlying character, or a blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter. This contains letter specific logic and data.
3. The game keeps track of the user's remaining guesses and prompt the user if they would like to end the game if none remain.