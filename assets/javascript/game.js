var bandsList = {
    "Metallica":
    {
     "image":"assets/images/metallica.jpg",
     "audio":"assets/audio/05 Disposable Heroes.mp3",
     "color":"#3f0d0c"
    },
    "Ozzy Osbourne":
    {
     "image":"assets/images/ozzy.jpg",
     "audio":"assets/audio/06 - Mr. Crowley.mp3",
     "color":"#555347"
    },
    "Judas Priest":
    {
     "image":"assets/images/judaspriest.jpg",
     "audio":"assets/audio/07 - Screaming For Vengeance.mp3",
     "color":"#f1c43e"
    },
    "Iron Maiden":
    {
     "image":"assets/images/ironmaiden.jpg",
     "audio":"assets/audio/07 Killers.m4a",
     "color":"#211a22"
    },
    "Megadeth":
    {
     "image":"assets/images/megadeth.jpg",
     "audio":"assets/audio/01 Holy Wars...The Punishment Due.m4a",
     "color":"#232347"
    },
    "Pantera":
    {
     "image":"assets/images/pantera.jpg",
     "audio":"assets/audio/01 Cowboys from Hell.m4a",
     "color":"#654336"
    },
    "Slayer":
    {
     "image":"assets/images/slayer.jpg",
     "audio":"assets/audio/01 Angel of Death.m4a",
     "color":"#2a1a0b"
    },
    "Rainbow":
    {
     "image":"assets/images/rainbow.jpg",
     "audio":"assets/audio/03 Starstruck.m4a",
     "color":"#321510"
    },
    "Motorhead":
    {
     "image":"assets/images/motorhead.jpg",
     "audio":"assets/audio/11 Motorhead.m4a",
     "color":"black"
    },
    "Queensryche":
    {
     "image":"assets/images/queensryche.jpg",
     "audio":"assets/audio/09 The Needle Lies.m4a",
     "color":"#7b7b7d"
    },
    "Black Sabbath":
    {
     "image":"assets/images/blacksabbath.jpg",
     "audio":"assets/audio/08 Into the Void.mp3",
     "color":"black"
    },
    "Saxon":
    {
     "image":"assets/images/saxon.jpg",
     "audio":"assets/audio/09 Machine Gun.m4a",
     "color":"#17151a"
    }
};

var nWins = 0;

var badGuesses = [];

var goodGuesses = [];

var alphabet = 'abcdefghijklmnopqrstuvwxyz';

var currWord = '';

var guessSpace = document.getElementById('guess-spaces');

var numberWins = document.getElementById('nwins');

var numberGuesses = document.getElementById('nguesses');

var lettersGuessed = document.getElementById('letters-guessed');

var winningImg = document.getElementById('winning-img');

var audioElement = document.createElement("audio");

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
        nWins++;
        winningImg.setAttribute("src",bandsList[currWord]["image"]);
        winningImg.setAttribute("height","320");
        winningImg.setAttribute("width","320");
        winningImg.setAttribute("height","300");
        document.body.style.backgroundColor = bandsList[currWord]["color"];
        audioElement.setAttribute("src", bandsList[currWord]["audio"]);
        audioElement.play();
        newBand();
    }
}

function updateUsedLetters() {
    var usedString = '';
    for (var i = 0; i < badGuesses.length; i++) {
        if (i == 0) {
            usedString += badGuesses[0];
        } else {
            usedString += ', ' + badGuesses[i];
        }
    }
    lettersGuessed.textContent = usedString;
}

function newBand() {
    var namesList = Object.keys(bandsList);
    var prevWord = currWord;
    while(prevWord == currWord) {
        currWord = namesList[Math.floor(Math.random() * namesList.length)];
    }
    goodGuesses = [];
    badGuesses = [];
    numberWins.textContent = nWins;
    numberGuesses.textContent = 13;
    updateStatusString();
    updateUsedLetters();
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
        if (badGuesses.length == 13) {
            newBand();
        }
        updateUsedLetters();
        numberGuesses.textContent = 13 - badGuesses.length;
    }
}

newBand();

document.onkeyup = function(event) {
    var i = event.key;
    if(isAlpha(i) && isNewGuess(i)) {
        validGuess(i);
    }
}