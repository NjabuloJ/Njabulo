const { fana } = require("../njabulo/fana");
const conf = require(__dirname + "/../set");

let numberToGuess = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

fana({
  nomCom: "guess",
  aliases: ["g"],
  desc: "guess the number",
  categorie: "Game"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  if (arg[0] === "start") {
    numberToGuess = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    repondre(`Guess the number game started! I'm thinking of a number between 1 and 100.`);
  } else if (arg[0]) {
    const guess = parseInt(arg[0]);
    attempts++;

    if (isNaN(guess)) {
      repondre(`Invalid input. Please enter a number.`);
    } else if (guess < numberToGuess) {
      repondre(`Too low! Try again.`);
    } else if (guess > numberToGuess) {
      repondre(`Too high! Try again.`);
    } else {
      repondre(`Congratulations! You guessed the number in ${attempts} attempts. 🎉`);
      numberToGuess = Math.floor(Math.random() * 100) + 1;
      attempts = 0;
    }
  } else {
    repondre(`Guess the number game. Type .guess <number> to play. Type .guess start to start a new game.`);
  }
});