const axios = require("axios");
const { fana } = require("../njabulo/fana");
const traduire = require("../njabulo/traduction")
const { Sticker, StickerTypes } = require('wa-sticker-formatter');

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
  nomCom: "google",
  categorie: "Search"
}, async (chatId, zk, commandeOptions) => {
  const { arg, repondre, ms } = commandeOptions;
  
  if (!arg[0] || arg === "") {
    sendFormattedMessage(zk, chatId, "Hey, I need a search query to work with! Try something like: .google What is a bot?", ms);
    return;
  }

  const google = require('google-it');
  try {
    const results = await google({ query: arg.join(" ") });
    let msg = `𝗚𝗼𝗼𝗴𝗹𝗲 𝗦𝗲𝗮𝗿𝗰𝗵 𝗳𝗼𝗿: ${arg.join(" ")}\n\n`;

    for (let result of results) {
      msg += `➣ 𝗧𝗶𝘁𝗹𝗲: ${result.title}\n`;
      msg += `➣ 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${result(response).sendFormattedMessage(zk, chatId, `Something broke while searching on Google.`, ms);
});