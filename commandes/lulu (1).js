const { fana } = require('../njabulo/fana');
const gis = require('g-i-s');
const axios = require('axios');
const conf = require(__dirname + '/../set');

fana({ nomCom: "lulu", aliases: ["image", "images"], categorie: "Images", reaction: "☘️" }, async (dest, zk, commandeOptions) => {
  const { ms, arg } = commandeOptions;

  if (!arg[0]) {
   zk.sendMessage(dest, {
      text: 'Which image?',
      contextInfo: {
        externalAdReply: {
          title: "Njabulo Jb",
          body: "WhatsApp status !",
          thumbnailUrl: "https://github.com/NjabuloJ/Njabulo-Jb",
          sourceUrl: "https://github.com/NjabuloJ/Njabulo-Jb",
          mediaType: 1,
          showAdAttribution: true
        }
      }
    });
    return;
  }

  const searchTerm = arg.join(" ");

  gis(searchTerm, async (error, results) => {
    if (error) {
      zk.sendMessage(dest, {
        text: "Oops, an error occurred.",
        contextInfo: {
          externalAdReply: {
            title: "Njabulo Jb",
            body: "WhatsApp status !",
            thumbnailUrl: conf.URL,
            sourceUrl: conf.GURL,
            mediaType: 1,
            showAdAttribution: true
          }
        }
      });
      return;
    }

    if (!results || results.length === 0) {
      zk.sendMessage(dest, {
        text: "No images found.",
        contextInfo: {
          externalAdReply: {
            title: "Njabulo Jb",
            body: "WhatsApp status !",
            thumbnailUrl: conf.URL,
            sourceUrl: conf.GURL,
            mediaType: 1,
            showAdAttribution: true
          }
        }
      });
      return;
    }

    for (let i = 0; i < Math.min(results.length, 5); i++) {
      zk.sendMessage(dest, {
        image: { url: results[i].url },
        caption: `*Downloaded by ${conf.BOT}*`,
        contextInfo: {
          externalAdReply: {
            title: "🦋ɴᴊᴀʙᴜʟᴏ ᴊʙ🦋",
            body: "message on",
            mediaType: 1,
            renderSmallThumbnail: true
          }
        }
      }, { quoted: ms });
    }
  });
});
