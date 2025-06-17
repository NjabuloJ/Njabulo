// img.js
const util = require('util');
const { fana } = require(__dirname + '/../njabulo/fana');
const axios = require('axios');

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

fana(
  {
    nomCom: 'im',
    categorie: 'Search',
    reaction: '📸',
  },
  async (chatId, zk, commandeOptions) => {
    const { ms, repondre, arg, nomAuteurMessage } = commandeOptions;

    try {
      console.log('DEBUG - img triggered:', { arg, nomAuteurMessage });

      if (!arg[0]) {
        return sendFormattedMessage(zk, chatId, `YO ${nomAuteurMessage}, STOP SLACKING! Give me a query, like .img cat! 😡`, ms);
      }

      const query = arg.join(' ').trim();
      const apiUrl = `https://api.giftedtech.web.id/api/search/googleimage?apikey=gifted&query=${encodeURIComponent(query)}`;

      await sendFormattedMessage(zk, chatId, `Hold up, ${nomAuteurMessage}! Grabbing your ${query} image like a pro! 🔍`, ms);

      const response = await axios.get(apiUrl);
      const data = response.data;

      if (!data.success || !data.results || data.results.length === 0) {
        return sendFormattedMessage(zk, chatId, `NO IMAGES, ${nomAuteurMessage}! Your ${query} query is TRASH! Try again! 😣`, ms);
      }

      // Pick a random image URL from results
      const imageUrl = data.results[Math.floor(Math.random() * data.results.length)];

      await zk.sendMessage(
        chatId,
        {
          image: { url: imageUrl },
          caption: `BAM, ${nomAuteurMessage}! Your ${query} image is STRAIGHT FIRE! 🔥\nPowered by xh_clinton`,
        },
        { quoted: ms }
      );

    } catch (e) {
      console.error('Image search error:', e);
      await sendFormattedMessage(zk, chatId, `TOTAL DISASTER, ${nomAuteurMessage}! Something broke: ${e.message} 😡 Fix it or scram!`, ms);
    }
  }
);