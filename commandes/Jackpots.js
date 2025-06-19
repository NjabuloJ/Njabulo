const { fana } = require("../njabulo/fana");
const conf = require(__dirname + "/../set");

let jackpotAmount = 1000;
let jackpotTickets = {};

fana({
  nomCom: "jackpot",
  aliases: ["jp"],
  desc: "play the jackpot game",
  categorie: "Game"
}, async (dest, zk, commandeOptions) => {
  const { repondre, auteurMessage, arg } = commandeOptions;

  if (arg[0] === "buy") {
    if (!jackpotTickets[auteurMessage]) {
      jackpotTickets[auteurMessage] = 0;
    }
    jackpotTickets[auteurMessage]++;
    repondre(`You bought 1 ticket for the jackpot! Your total tickets: ${jackpotTickets[auteurMessage]}`);
  } else if (arg[0] === "check") {
    repondre(`Current jackpot amount: $${jackpotAmount}`);
    repondre(`Your tickets: ${jackpotTickets[auteurMessage] || 0}`);
  } else if (arg[0] === "draw") {
    const winner = Object.keys(jackpotTickets)[Math.floor(Math.random() * Object.keys(jackpotTickets).length)];
    repondre(`The jackpot winner is... ${winner}! Congratulations! They won $${jackpotAmount}!`);
    jackpotAmount += 1000;
    jackpotTickets = {};
  } else {
    repondre(`Jackpot game. Type .jackpot buy to buy a ticket, .jackpot check to check the jackpot amount and your tickets, or .jackpot draw to draw a winner.`);
  }
});