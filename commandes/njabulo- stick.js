const axios = require("axios");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const { fana } = require("../njabulo/fana");

async function sendFormattedMessage(zk, chatId, text, ms) {
  await zk.sendMessage(chatId, {
    text,
    contextInfo: {
      externalAdReply: {
        title: "Njabulo Jb",
        body: "Message via ad !",
        thumbnailUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
        sourceUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
        mediaType: 1,
        showAdAttribution: true
      }
    }
  }, { quoted: ms });
}

fana({
  nomCom: "stickersearch",
  categorie: 'Search',
  reaction: "🍁"
},
async (chatId, zk, commandeOptions) => {
  const { repondre, ms, arg, nomAuteurMessage } = commandeOptions;

  if (!arg[0]) {
    sendFormattedMessage(zk, chatId, "where is the request ? !", ms);
    return;
  }

  const gifSearchTerm = arg.join(" ");
  const tenorApiKey = "AIzaSyCyouca1_KKy4W_MG1xsPzuku5oa8W358c"; // Remplacez par votre clé d'API Tenor

  try {
    for (let i = 0; i < 5; i++) {
      const gif = await axios.get(
        `https://tenor.googleapis.com/v2/search?q=${gifSearchTerm}&key=${tenorApiKey}&client_key=my_project&limit=8&media_filter=gif`
      );

      const gifUrl = gif.data.results[i].media_formats.gif.url;

      const packname = nomAuteurMessage; 

      const stickerMess = new Sticker(gifUrl, {
        pack: packname,
        author: 'Njabulo-Jb',
        type: StickerTypes.FULL,
        categories: ["🤩", "🎉"],
        id: "12345",
        quality: 60,
        background: "transparent",
      });
      const stickerBuffer2 = await stickerMess.toBuffer();
      zk.sendMessage(chatId, { sticker: stickerBuffer2 }, { quoted: ms });
    }
  } catch (error) {
    console.error("Erreur lors de la recherche de stickers :", error);
    sendFormattedMessage(zk, chatId, "Erreur lors de la recherche de stickers.", ms);
  }
});
