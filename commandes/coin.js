const { fana } = require("../njabulo/fana");
const conf = require(__dirname + "/../set");

fana({
  nomCom: "coin",
  aliases: ["flip"],
  desc: "flip a coin",
  categorie: "Game"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  const flip = Math.random() < 0.5 ? "Heads" : "Tails";

  if (!arg[0]) {
    repondre(`The coin lands on... ${flip} 🪙`);
  } else if (arg[0].toLowerCase() === "heads" || arg[0].toLowerCase() === "tails") {
    const bet = arg[0].toLowerCase();
    if (bet === flip.toLowerCase()) {
      repondre(`The coin lands on... ${flip}! You win! 🎉`);
    } else {
      repondre(`The coin lands on... ${flip}. Better luck next time! 😢`);
    }
  } else {
    repondre(`Invalid bet. Please try .coin heads or .coin tails`);
  }
});