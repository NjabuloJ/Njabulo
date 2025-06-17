// imagine.js
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
    nomCom: 'imagine',
    categorie: 'AI',
    reaction: '🖌️',
  },
  async (chatId, zk, commandeOptions) => {
    const { ms, repondre, arg, nomAuteurMessage } = commandeOptions;

    try {
      console.log('DEBUG - imagine triggered:', { arg, nomAuteurMessage });

      if (!arg[0]) {
        return sendFormattedMessage(zk, chatId, `HEY ${nomAuteurMessage}, DON’T BE A SLACKER! Give me a prompt, like .imagine Cute Cat! 😡`, ms);
      }

      const prompt = arg.join(' ').trim();
      await sendFormattedMessage(zk, chatId, `Yo ${nomAuteurMessage}, conjuring your "${prompt}" masterpiece! Hold tight! 🔍`, ms);

      const apiUrl = `https://api.giftedtech.web.id/api/ai/imgsys?apikey=gifted&prompt=${encodeURIComponent(prompt)}`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (!data.success || !data.result || data.result.length === 0) {
        return sendFormattedMessage(zk, chatId, `NO IMAGES, ${nomAuteurMessage}! Your "${prompt}" idea FLOPPED! Try something better! 😣`, ms);
      }

      // Pick a random image URL from result
      const imageUrl = data.result[Math.floor(Math.random() * data.result.length)];

      await zk.sendMessage(
        chatId,
        {
          image: { url: imageUrl },
          caption: `BOOM, ${nomAuteurMessage}! Your "${prompt}" image is PURE GOLD! 🔥\nPowered by xh_clinton`,
        },
        { quoted: ms }
      );

    } catch (e) {
      console.error('Imagine error:', e);
      await sendFormattedMessage(zk, chatId, `TOTAL FAILURE, ${nomAuteurMessage}! Something tanked: ${e.message} 😡 Get it together!`, ms);
    }
  }
);