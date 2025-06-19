const { fana } = require("../njabulo/fana");
const conf = require(__dirname + "/../set");

fana({
  nomCom: "roulette",
  aliases: ["roul"],
  desc: "play Roulette",
  categorie: "Game"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre(`Please specify your bet: .roulette <number> or .roulette <red/black>`);
    return;
  }

  const bet = arg[0].toLowerCase();
  const winningNumber = Math.floor(Math.random() * 37); // 0-36
  const winningColor = winningNumber === 0 ? "green" : (winningNumber % 2 === 0 ? "black" : "red");

  repondre(`The wheel is spinning... 🎯`);

  if (bet === "red" || bet === "black") {
    if (bet === winningColor) {
      repondre(`The ball lands on ${winningNumber} ${winningColor}! You win! 🎉`);
    } else {
      repondre(`The ball lands on ${winningNumber} ${winningColor}. Better luck next time! 😢`);
    }
  } else if (!isNaN(bet)) {
    const betNumber = parseInt(bet);
    if (betNumber === winningNumber) {
      repondre(`The ball lands on ${winningNumber}! You win big! 🎊`);
    } else {
      repondre(`The ball lands on ${winningNumber}. Better luck next time! 😢`);
    }
  } else {
    repondre(`Invalid bet. Please try again!`);
  }
});