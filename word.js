var movies = require("./movies.js");

var Word = function (index) {
    this.index = index;
    console.log(index);
    if (this.index >= movies.length) {
        this.index = 0;
    }
    this.movie = movies[this.index].trim();
}

module.exports = Word;