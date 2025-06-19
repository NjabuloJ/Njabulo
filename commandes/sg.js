const { fana } = require("../njabulo/fana");
const conf = require(__dirname + "/../set");

let balance = 100;
const symbols = ['🍋', '🍇', '🍒', '💎', '🔥'];

fana({
  nomCom: "slot",
  aliases: ["spin"],
  desc: "Play a game of slots",
  categorie: "Game"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  const bet = parseInt(arg[0]);
  if (!bet || bet <= 0) return repondre('Invalid bet');

  if (bet > balance) return repondre('You don\'t have enough balance');

  const reels = [
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)]
  ];

  const result = reels.join(' | ');
  repondre(`You spun: ${result}`);

  if (reels[0] === reels[1] && reels[1] === reels[2]) {
    const winnings = bet * 10;
    balance += winnings;
    repondre(`Congratulations, you won ${winnings}! Your new balance is ${balance}`);
  } else {
    balance -= bet;
    repondre(`Sorry, you lost ${bet}. Your new balance is ${balance}`);
  }
});
