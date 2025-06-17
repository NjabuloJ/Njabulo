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
    nomCom: 'yts',
    categorie: 'Search',
    reaction: '🎬',
  },
  async (chatId, zk, commandeOptions) => {
    const { ms, repondre, arg, nomAuteurMessage } = commandeOptions;

    try {
      console.log('DEBUG - yts triggered:', { arg, nomAuteurMessage });

      if (!arg[0]) {
        return sendFormattedMessage(zk, chatId, `YO ${nomAuteurMessage}, STOP WASTING MY TIME! Give me a search query, like .yts Spectre! 😡`, ms);
      }

      const query = arg.join(' ').trim();
      await sendFormattedMessage(zk, chatId, `Hang on, ${nomAuteurMessage}! Scouting YouTube for "${query}" like a boss! 🔍`, ms);

      const apiUrl = `https://api.giftedtech.web.id/api/search/yts?apikey=gifted&query=${encodeURIComponent(query)}`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (!data.success || !data.results || data.results.length === 0) {
        return sendFormattedMessage(zk, chatId, `NO VIDEOS, ${nomAuteurMessage}! Your "${query}" search SUCKS! Try something else! 😣`, ms);
      }

      // Pick a random video from results
      const video = data.results[Math.floor(Math.random() * data.results.length)];

      await zk.sendMessage(
        chatId,
        {
          text: `NAILED IT, ${nomAuteurMessage}! Found a banger for "${query}"! 🔥\nTitle: ${video.title}\nURL: ${video.url}\nDuration: ${video.duration.timestamp}\nViews: ${video.views.toLocaleString()}\nAuthor: ${video.author.name}\nPowered by xh_clinton`,
        },
        { quoted: ms }
      );

    } catch (e) {
      console.error('YouTube search error:', e);
      await sendFormattedMessage(zk, chatId, `EPIC FAIL, ${nomAuteurMessage}! Something crashed: ${e.message} 😡 Fix it or cry! 😣`, ms);
    }
  }
);