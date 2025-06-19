const { fana } = require("../njabulo/fana");
const conf = require(__dirname + "/../set");

fana({
  nomCom: "slots",
  aliases: ["spin"],
  desc: "to play slot machine",
  categorie: "Game"
}, async (dest, zk, commandeOptions) => {
  const { repondre } = commandeOptions;

  const symbols = ['🍋', '⭐', '🍇', '🍒'];
  const reels = [
    [symbols[Math.floor(Math.random() * symbols.length)], symbols[Math.floor(Math.random() * symbols.length)], symbols[Math.floor(Math.random() * symbols.length)]],
    [symbols[Math.floor(Math.random() * symbols.length)], symbols[Math.floor(Math.random() * symbols.length)], symbols[Math.floor(Math.random() * symbols.length)]],
    [symbols[Math.floor(Math.random() * symbols.length)], symbols[Math.floor(Math.random() * symbols.length)], symbols[Math.floor(Math.random() * symbols.length)]]
  ];

  const result = `[ ${reels[0][0]} | ${reels[0][1]} | ${reels[0][2]} ]\n[ ${reels[1][0]} | ${reels[1][1]} | ${reels[1][2]} ]\n[ ${reels[2][0]} | ${reels[2][1]} | ${reels[2][2]} ]`;

  repondre(`🎰 Slot Machine Result: \n\n${result}`);

  repondre(`😢 Better luck next time! 👎`);
});
