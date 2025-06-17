
const { fana } = require("../njabulo/fana");
const axios = require('axios');
const ytSearch = require('yt-search');
const conf = require(__dirname + '/../set');
const fs = require('fs-extra');
const { downloadAndSaveMediaMessage } = require('@whiskeysockets/baileys');

async function sendFormattedMessage(zk, chatId, text, ms) {
  await zk.sendMessage(chatId, {
    text,
       contextInfo: {
       footer: "*Njabulo Jb*, developed by Njabulo",
        gifPlayback: true,
        externalAdReply: {
          title: "Njabulo Jb",
          body: "Message YouTube search",
          mediaType: 1,
          thumbnailUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
         sourceUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
         renderLargerThumbnail: true,
         showAdAttribution: true,
      }
    }
  }, { quoted: ms });
}

fana({
  nomCom: "pay",
  aliases: ["song", "playdoc", "audio", "mp3"],
  categorie: "download",
  reaction: "🎧"
}, async (chatId, zk, commandOptions) => {
  const { arg, ms, repondre } = commandOptions;

  if (!arg[0]) {
    sendFormattedMessage(zk, chatId, '😡Yo stop slacking! Give me a query, like .play Justin Bieber', ms);
    return;
  }

  const query = arg.join(" ");

  try {
    const searchResults = await ytSearch(query);
    sendFormattedMessage(zk, chatId, "loading audio", ms);

    if (!searchResults || !searchResults.videos.length) {
      sendFormattedMessage(zk, chatId, '😡No song found for the specified query.', ms);
      return;
    }

    const firstVideo = searchResults.videos[0];
    const videoUrl = firstVideo.url;

    const getDownloadData = async (url) => {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error('Error fetching data from API:', error);
        return { success: false };
      }
    };

    const apis = [
      `https://api-rin-tohsaka.vercel.app/download/ytmp4?url=${encodeURIComponent(videoUrl)}`,
      `https://apis.davidcyriltech.my.id/download/ytmp3?url=${encodeURIComponent(videoUrl)}`,
      `https://www.dark-yasiya-api.site/download/ytmp3?url=${encodeURIComponent(videoUrl)}`,
      `https://api.giftedtech.web.id/api/download/dlmp3?url=${encodeURIComponent(videoUrl)}&apikey=gifted-md`,
      `https://api.dreaded.site/api/ytdl/audio?url=${encodeURIComponent(videoUrl)}`
    ];

    let downloadData;
    for (const api of apis) {
      downloadData = await getDownloadData(api);
      if (downloadData && downloadData.success) break;
    }

    if (!downloadData || !downloadData.success) {
      sendFormattedMessage(zk, chatId, 'Failed to retrieve download URL from all sources. Please try again later.', ms);
      return;
    }

    const downloadUrl = downloadData.result.download_url;
    const videoDetails = downloadData.result;

    const messagePayload = {
      caption: `\n*NJABULO JB AUDIOS*\n

> Njabulo Jb`,
      audio: { url: downloadUrl },
      mimetype: 'audio/mp4',
      contextInfo: {
        footer: "*Njabulo Jb*, developed by Njabulo",
        gifPlayback: true,
        externalAdReply: {
          title: "Njabulo Jb",
          body: videoDetails.title,
          mediaType: 1,
          thumbnailUrl: firstVideo.thumbnail,
          sourceUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
          renderLargerThumbnail: true,
          showAdAttribution: true,
        },
      },
    };

    await zk.sendMessage(chatId, messagePayload, { quoted: ms });

  } catch (error) {
    console.error('Error during download process:', error);
    sendFormattedMessage(zk, chatId, `Download failed due to an error: ${error.message || error}`, ms);
  }
});
