const { fana } = require("../njabulo/fana");
const conf = require(__dirname + "/../set");

fana({
  nomCom: "slt",
  aliases: ["spin"],
  desc: "to play slot machine",
  categorie: "Game"
}, async (dest, zk, commandeOptions) => {
  const { repondre, auteurMessage } = commandeOptions;

  const reels = [
    Math.floor(Math.random() * 100) + 1,
    Math.floor(Math.random() * 100) + 1,
    Math.floor(Math.random() * 100) + 1
  ];

  const result = `[ ${reels[0]} | ${reels[1]} | ${reels[2]} ]`;

  repondre(`🎰 Slot Machine Result: \n\n${result}`);

  if (reels[0] === reels[1] && reels[1] === reels[2]) {
    repondre(`🥳 Congratulations! You won! 🎁`);
    repondre(`> 💸 You have won $1! It has been reserved on your SIM card number ${auteurMessage}.`);
    repondre(`> 📈 Your new balance is $1.`);
  } else {
    repondre(`😢 Better luck next time! 👎`);
  }

  repondre(`> ✅ Has depositado *€0 Euros* en tu banco.\n> 🏦 Banco: €5134 Euros\n> 📤 Monedero: €49 Euros`);
});
