const { fana } = require("../njabulo/fana");
const axios = require("axios");

fana({
  nomCom: "lyrics",
  reaction: '🎵', // Changed reaction to match music theme
  categorie: "Search",
  aliases: ["lyric", "mistari"] // Added aliases
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const songName = arg.join(" ").trim();

  if (!songName) {
     zk.sendMessage(dest, {
      text: '😡Yo stop slacking! Give me a query, like .lyrics alone',
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
    });
    return;
  }
  // API endpoints (same as original)
  const apis = [
    `https://api.dreaded.site/api/lyrics?title=${encodeURIComponent(songName)}`,
    `https://some-random-api.com/others/lyrics?title=${encodeURIComponent(songName)}`,
    `https://api.davidcyriltech.my.id/lyrics?title=${encodeURIComponent(songName)}`
  ];

  let lyricsData;
  for (const api of apis) {
    try {
      const response = await axios.get(api);
      if (response.data?.result?.lyrics) {
        lyricsData = response.data;
        break;
      }
    } catch (error) {
      console.error(`API ${api} failed:`, error.message);
    }
  }

  if (!lyricsData?.result) {
    return repondre("❌ Couldn't find lyrics for *" + songName + "*");
  }

  const { title, artist, thumb, lyrics } = lyricsData.result;
  try {
    await zk.sendMessage(dest, {
      caption: `🎶 *${title}* - ${artist}\n\n${lyrics}\n\n*Powered by Njabulo Jb*`,
      contextInfo: {
         isForwarded: true,
          forwardedNewsletterMessageInfo: {
          newsletterJid: '120363345407274799@newsletter',
          newsletterName: "_many_",
          serverMessageId: 143,
          },
          forwardingScore: 999, // Score to indicate it has been forwarded
          externalAdReply: {
          title: "Lyrics Finder",
          body: "Get any song lyrics instantly",
          thumbnail: "jb",
          mediaType: 1,
          mediaUrl: "",
          sourceUrl: ""
        }
      }
    }, { quoted: ms });

  } catch (error) {
    console.error("Error sending lyrics:", error);
    // Fallback to text-only
    repondre(`🎶 *${title}* - ${artist}\n\n${lyrics.substring(0, 2000)}...\n\n*[Truncated - image failed to load]*`);
  }
});
  
