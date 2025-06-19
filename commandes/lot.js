const { fana } = require("../njabulo/fana");
const conf = require(__dirname + "/../set");

let lotteryTickets = {};

fana({
  nomCom: "lottery",
  aliases: ["lotto"],
  desc: "play the lottery",
  categorie: "Game"
}, async (dest, zk, commandeOptions) => {
  const { repondre, auteurMessage, arg } = commandeOptions;

  if (arg[0] === "buy") {
    const numbers = arg.slice(1).map(Number);
    if (numbers.length !== 6) {
      repondre(`Please enter 6 numbers between 1 and 49.`);
      return;
    }
    if (!lotteryTickets[auteurMessage]) {
      lotteryTickets[auteurMessage] = [];
    }
    lotteryTickets[auteurMessage].push(numbers);
    repondre(`You bought a lottery ticket with numbers: ${numbers.join(", ")}`);
  } else if (arg[0] === "draw") {
    const winningNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 49) + 1);
    repondre(`The winning numbers are: ${winningNumbers.join(", ")}`);
    for (let player in lotteryTickets) {
      for (let ticket of lotteryTickets[player]) {
        const matches = ticket.filter(number => winningNumbers.includes(number)).length;
        if (matches === 6) {
          repondre(`Player ${player} won the jackpot!`);
        } else if (matches > 0) {
          repondre(`Player ${player} matched ${matches} numbers.`);
        }
      }
    }
    lotteryTickets = {};
  } else {
    repondre(`Lottery commands: .lottery buy <numbers> to buy a ticket, .lottery draw to draw the winning numbers.`);
  }
});