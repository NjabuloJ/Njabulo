const axios = require("axios");
const { fana } = require("../njabulo/fana");
const traduire = require("../njabulo/traduction");
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
  nomCom: "anime",
  categorie: "Fun",
  reaction: "📺"
},
async (chatId, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const jsonURL = "https://api.jikan.moe/v4/random/anime";

  try {
    const response = await axios.get(jsonURL);
    const data = response.data.data;

    const title = data.title;
    const synopsis = data.synopsis;
    const imageUrl = data.images.jpg.image_url;
    const episodes = data.episodes;
    const status = data.status;

    const message = `📺 𝗧𝗶𝘁𝗹𝗲: ${title}\n🎬 𝗘𝗽𝗶𝘀𝗼𝗱𝗲𝘀: ${episodes}\n📡 𝗦𝘁𝗮𝘁𝘂𝘀: ${status}\n📝 𝗦𝘆𝗻𝗼𝗽𝘀𝗶𝘀: ${synopsis}\n🔗 𝗨𝗥𝗟: ${data.url}`;
    
    await zk.sendMessage(chatId, { image: { url: imageUrl }, caption: message }, { quoted: ms });
  } catch (error) {
    console.error('Error fetching anime data:', error);
    sendFormattedMessage(zk, chatId, 'Oops, something went wrong while fetching the anime data. Try again later!', ms);
  }
});
