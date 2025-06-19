const { fana } = require("../njabulo/fana");

fana({
  nomCom: "",
  categorie: "AutoReply"
}, async (dest, zk, commandeOptions) => {
  const { repondre } = commandeOptions;

  const autoReplyMessage = `Hallo! Njabulo JB is online, but I'll reply to you soon!`;

  repondre(autoReplyMessage);
});
