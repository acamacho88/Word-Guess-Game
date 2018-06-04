var bandsList = [
    "Metallica",
    "Ozzy Osbourne",
    "Judas Priest",
    "Iron Maiden",
    "Megadeth",
    "Pantera",
    "Slayer",
    "Rainbow",
    "Motorhead"
];

var nWins = 0;

var badGuesses = [];

var goodGuesses = [];

var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

var currWord = '';

var guessSpace = document.getElementById('guess-spaces');

var statusText = '';

function isAlpha(letter) {
    for (var i = 0; i < alphabet.length; i++) {
        if (letter.toLowerCase() == alphabet[i]) {
            return true;
        }
    }
    return false;
}

function newBand() {
    currWord = bandsList[Math.floor(Math.random() * bandsList.length)];
    statusText = '';
    for (var i = 0; i < currWord.length - 1; i++) {
        if (currWord[i] == ' ') {
            statusText += '  ';
        } else {
            statusText += '_ ';
        }
    }
    statusText += '_';
    guessSpace.textContent = statusText;
}

function isNewGuess(letter) {
    for (var i = 0; i < badGuesses.length; i++) {
        if (letter == badGuesses[i]) {
            return false;
        }
    }
    for (var i = 0; i < goodGuesses.length; i++) {
        if (letter == goodGuesses[i]) {
            return false;
        }
    }
    return true;
}

function validGuess(letter) {
    var goodWord = false;
    for (var i = 0; i < currWord.length; i++) {
        if (letter == currWord[i].toLowerCase()) {
            goodWord = true;
            statusText[i*2] = currWord[i];
        }
    }
    if (goodWord) {
        guessSpace.textContent = statusText;
        goodGuesses.push(letter)
    } else {
        badGuesses.push(letter);
    }
}

newBand();

document.onkeyup = function(event) {
    var i = event.key;
    if(isAlpha(i) && isNewGuess(i)) {
        validGuess(i);
    }
        // evaluate if key is good/bad letter
        // if good letter, display in status
        // if bad letter, add to guesses, subtract one from guess count
          // if bad letter and guess count is 0, switch to a new word, reset guess count, empty guess array
}