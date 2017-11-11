/**
 * Creates the Mark My Words model.
 * 
 * @precondition none
 * @postcondition the game board is initialized
                  with bats, pits, and Yeti.
 */
function MarkMyWords(previousWords, currentLetters) {
    this.previousWords = previousWords;
    this.currentLetters = currentLetters;
};

MarkMyWords.prototype.getLetters = function() {
    return this.currentLetters;
};

MarkMyWords.prototype.setNewLetters = function() {
    this.currentLetters = this.getRandomLetters(3);
}

MarkMyWords.prototype.addWord = function(word) {
    word = word.toUpperCase();
    var wordChecksOut = this.checkWord(word);

    if (wordChecksOut) {
        this.previousWords.push(word);
    }
    else {
        this.previousWords.push("");
    }
};

MarkMyWords.prototype.checkWord = function(word) {
    var valid = true;
    for (var i = 0; i < this.currentLetters.length; i++) {
        if (word.indexOf(this.currentLetters[i]) == -1) {
            valid = false;
        }
    }

    return valid;
};

MarkMyWords.prototype.getMostRecentWordScore = function() {
    if (this.previousWords.length == 0) {
        return 0;
    }
    return this.getWordScore(this.previousWords[this.previousWords.length-1]);
};

MarkMyWords.prototype.getTotalScore = function() {
    var score = 0;
    for (var i = 0; i < this.previousWords.length; i++) {
        score += this.getWordScore(this.previousWords[i]);
    }
    return score;
};

MarkMyWords.prototype.getWordScore = function(word) {
    var score = 0;
    for (var i = 0; i < word.length; i++) {
        score += this.getLetterScore(word[i]);
    }
    return score;
};

MarkMyWords.prototype.getLetterScore = function(letter) {
    var lettersByFrequency = "ETAOINSHRDLCUMWFGYPBVKJXQZ";

    var score = 1 + lettersByFrequency.indexOf(letter) % 5;
    if (score == 6) {
        score = 5;
    }

    return score;
};

MarkMyWords.prototype.getRandomLetters = function(n) {
    return this.randomPermutation().splice(0, n);
};

MarkMyWords.prototype.randomPermutation = function() {
    var vowels = "AEIOU".split("");
    var constants = "BCDFGHLMNPRSTWY".split("");
    var randomList = [];

    var randomIndex = Math.floor(Math.random() * vowels.length);
    var letter = vowels.splice(randomIndex, 1);
    randomList.push(letter[0]);

    while (constants.length > 0) {
        var randomIndex = Math.floor(Math.random() * constants.length);
        var letter = constants.splice(randomIndex, 1);
        randomList.push(letter[0]);
    }

    return randomList;
};

module.exports = MarkMyWords;
