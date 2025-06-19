const { fana } = require("../njabulo/fana");
const conf = require(__dirname + "/../set");

let playerBalances = {};

fana({
  nomCom: "bet",
  aliases: ["b"],
  desc: "place a bet",
  categorie: "Game"
}, async (dest, zk, commandeOptions) => {
  const { repondre, auteurMessage, arg } = commandeOptions;

  if (arg[0] === "balance") {
    if (!playerBalances[auteurMessage]) {
      playerBalances[auteurMessage] = 100;
    }
    repondre(`Your balance is $${playerBalances[auteurMessage]}.`);
  } else if (arg[0] === "place") {
    const amount = parseInt(arg[1]);
    const outcome = arg[2].toLowerCase();
    if (!playerBalances[auteurMessage]) {
      playerBalances[auteurMessage] = 100;
    }
    if (amount > playerBalances[auteurMessage]) {
      repondre(`You don't have enough balance to place that bet.`);
    } else {
      // Simulate a random outcome (win or lose)
      const result = Math.random() < 0.5 ? "win" : "lose";
      if (result === "win" && outcome === "win") {
        playerBalances[auteurMessage] += amount;
        repondre(`You won! Your new balance is $${playerBalances[auteurMessage]}.`);
      } else if (result === "lose" && outcome === "win") {
        playerBalances[auteurMessage] -= amount;
        repondre(`You lost. Your new balance is $${playerBalances[auteurMessage]}.`);
      } else if (result === "win" && outcome === "lose") {
        playerBalances[auteurMessage] -= amount;
        repondre(`You lost. Your new balance is $${playerBalances[auteurMessage]}.`);
      } else {
        playerBalances[auteurMessage] += amount;
        repondre(`You won! Your new balance is $${playerBalances[auteurMessage]}.`);
      }
    }
  } else {
    repondre(`Betting commands: .bet balance to view your balance, .bet place <amount> <win/lose> to place a bet.`);
  }
});