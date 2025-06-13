const { fana } = require('../njabulo/fana');
const gis = require('g-i-s');
const axios = require('axios');
const conf = require(__dirname + '/../set');

fana({ nomCom: "img", aliases: ["image", "images"], categorie: "Images", reaction: "☘️" }, async (dest, zk, commandeOptions) => {
  const { ms, arg } = commandeOptions;

  if (!arg[0]) {
   zk.sendMessage(dest, {
      text: 'Hallo🥲\n😡Yo stop slacking! Give me a query, like .img cat',
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

  const searchTerm = arg.join(" ");

  gis(searchTerm, async (error, results) => {
    if (error) {
      zk.sendMessage(dest, {
        text: "Hallo🙆\n😡Total disaster Something broke Fix it or scram!",
        contextInfo: {
          externalAdReply: {
            title: "Njabulo Jb",
            body: "Message via ad!",
            thumbnailUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
            sourceUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
            mediaType: 1,
            showAdAttribution: true
          }
        }
      });
      return;
    }

    if (!results || results.length === 0) {
      zk.sendMessage(dest, {
        text: "Hallo🤷\n🤣No images found.",
        contextInfo: {
          externalAdReply: {
            title: "Njabulo Jb",
            body: "Message via ad!",
            thumbnailUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
            sourceUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
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
        caption: `Hallo🧏\n😔 Hold up Grabbing your  image like a pro! 🔍`,
        contextInfo: {
          externalAdReply: {
            title: "Njabulo Jb",
            body: "Message via ad!",
            thumbnailUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
            sourceUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
            mediaType: 1,
            showAdAttribution: true
          }
        }
      }, { quoted: ms });
    }
  });
});
