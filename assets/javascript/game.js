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

var alphabet = 'abcdefghijklmnopqrstuvwxyz';

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

function updateStatusString() {
    var statusString = '';
    var letterCheck = false;
    var anyUnderscores = false;
    for (var i = 0; i < currWord.length; i++) {
        for (var j = 0; j < goodGuesses.length; j++) {
            if (currWord[i].toLowerCase() == goodGuesses[j]) {
                statusString += currWord[i];
                letterCheck = true;
            }
        }
        if (!letterCheck) {
            if (currWord[i] !== ' ') {
                statusString += '_';
                anyUnderscores = true;
            } else {
                statusString += ' ';
            }
        }
        letterCheck = false;
        if (i < currWord.length - 1) {
            statusString += ' ';
        }
    }
    if (anyUnderscores) {
        guessSpace.textContent = statusString;
    } else {
        newBand();
        nWins++;
    }
}

function newBand() {
    currWord = bandsList[Math.floor(Math.random() * bandsList.length)];

    /*statusText = '';
    for (var i = 0; i < currWord.length - 1; i++) {
        if (currWord[i] == ' ') {
            statusText += '  ';
        } else {
            statusText += '_ ';
        }
    }
    statusText += '_';
    guessSpace.textContent = statusText;*/
    goodGuesses = [];
    badGuesses = [];
    updateStatusString();
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
        }
    }
    if (goodWord) {
        goodGuesses.push(letter);
        updateStatusString();
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