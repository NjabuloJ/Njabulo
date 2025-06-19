const { fana } = require("../njabulo/fana");
const conf = require(__dirname + "/../set");

fana({
  nomCom: "slot",
  aliases: ["pp", "who", "spin"],
  desc: "to play slot machine",
  categorie: "Game"
}, async (dest, zk, commandeOptions) => {
  const { ms, arg, repondre, auteurMessage, nomAuteurMessage, msgRepondu, auteurMsgRepondu } = commandeOptions;

  const slotMachine = async () => {
    const symbols = ['🍋', '⭐', '🍇', '🍒'];
    const reels = [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)]
    ];

    const result = reels.join(" | ");
    repondre(`🎰 *¡Resultados de la Tragamonedas!* 🎉\n\n[ ${result} ]`);

    if (reels[0] === reels[1] && reels[1] === reels[2]) {
      if (reels[0] === '🍒') {
        repondre(`🥳 *¡FELICIDADES!* ¡Has ganado €150 Euros!`);
      } else {
        repondre(`🥳 *¡FELICIDADES!* ¡Has ganado €50 Euros!`);
      }
    }
  };
  slotMachine();
});
