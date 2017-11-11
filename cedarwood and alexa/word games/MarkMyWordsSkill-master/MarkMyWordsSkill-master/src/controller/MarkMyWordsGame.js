var MarkMyWords =  require("../model/MarkMyWordsModel");

/**
 * Builds the HuntTheYetiGame object, either from 
 * scratch or based on a previous game JSON object.
 *
 * @precondition none
 * @postcondition the object is built
 */
var MarkMyWordsGame = function (previousGame) {
    if (previousGame === undefined) {
        this.round = 1;
        this.model = new MarkMyWords([], []);
    }
    else {
        this.round = previousGame.round + 1;
        this.model = new MarkMyWords(previousGame.model.previousWords, previousGame.model.currentLetters);
    }
};

MarkMyWordsGame.prototype.getIntroduction = function() {
    message = this.getRoundMessage();
    return [message, message];
}

MarkMyWordsGame.prototype.isGameOver = function() {
    if (this.round >= 6) {
        return true;
    }
    return false;
}

MarkMyWordsGame.prototype.addWord = function(word) {

    var message = word +". ";

    if (this.isGameOver() == false) {
        this.model.addWord(word);
    }

    var wordScore = this.model.getMostRecentWordScore();
    var totalScore = this.model.getTotalScore();

    if (wordScore == 0) {
        message += "I'm sorry. That word did not use all of the letters. The score is 0. ";
    }
    else {
        message += "Great! You added "+wordScore+" points to your total. ";
    }
    message += "Your current score is "+totalScore+".";

    if (this.isGameOver()) {
        message += " Thanks for playing. If you would like to start a new game, say 'begin game'. To stop, say 'stop'.";
    }
    else {
        message += this.getRoundMessage();
    }

    return [message, message];
}

MarkMyWordsGame.prototype.getRoundMessage = function() {
    this.model.setNewLetters();
    return " Round "+this.round+". Say a word using the following letters: "+this.model.getLetters()+".";
}

module.exports = MarkMyWordsGame;
