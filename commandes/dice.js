const { fana } = require("../njabulo/fana");
const conf = require(__dirname + "/../set");

fana({
  nomCom: "dice",
  aliases: ["roll"],
  desc: "roll a dice",
  categorie: "Game"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  const roll = Math.floor(Math.random() * 6) + 1;

  if (!arg[0]) {
    repondre(`You rolled a ${roll} 🎲`);
  } else if (arg[0].toLowerCase() === "guess") {
    if (!arg[1]) {
      repondre(`Please specify your guess: .dice guess <number>`);
      return;
    }
    const guess = parseInt(arg[1]);
    if (isNaN(guess) || guess < 1 || guess > 6) {
      repondre(`Invalid guess. Please try again!`);
      return;
    }
    if (guess === roll) {
      repondre(`You rolled a ${roll}! Your guess was correct! 🎉`);
    } else {
      repondre(`You rolled a ${roll}. Your guess was ${guess}. Better luck next time! 😢`);
    }
  } else if (arg[0].toLowerCase() === "over" || arg[0].toLowerCase() === "under") {
    const betType = arg[0].toLowerCase();
    const threshold = 3.5;
    if (betType === "over" && roll > threshold) {
      repondre(`You rolled a ${roll}! You win! 🎉`);
    } else if (betType === "under" && roll <= threshold) {
      repondre(`You rolled a ${roll}! You win! 🎉`);
    } else {
      repondre(`You rolled a ${roll}. Better luck next time! 😢`);
    }
  } else {
    repondre(`Invalid command. Please try again!`);
  }
});