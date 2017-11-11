var MarkMyWordsGame = require('./controller/MarkMyWordsGame');

var game = new MarkMyWordsGame();
var messages = game.getIntroduction();

console.log(game.round);
console.log(game.model.previousWords);
console.log(game.model.currentLetters);
console.log(messages[0]);

var gameX = new MarkMyWordsGame(game);

var messages = gameX.addWord("abcdefghijklmnopqrstuvwxyz");

console.log(messages[0]);
