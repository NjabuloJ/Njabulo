const { fana } = require("../njabulo/fana");
const fs = require("fs");
const { exec } = require("child_process");

const filename = `${Math.random().toString(36)}`;

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
    nomCom: 'deep',
    categorie: 'Audio-Edit',
  },
  async (chatId, zk, commandeOptions) => {
    const { ms, repondre, msgRepondu } = commandeOptions;

    if (msgRepondu) {
      if (msgRepondu.audioMessage) {
        const media = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
        let set = "-af atempo=4/4,asetrate=44500*2/3";
        let ran = `${filename}.mp3`;

        try {
          exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
            fs.unlinkSync(media);
            if (err) return sendFormattedMessage(zk, chatId, "error during the procedure " + err, ms);

            let buff = fs.readFileSync(ran);

            zk.sendMessage(chatId, {
              audio: buff,
              mimetype: "audio/mpeg",
              contextInfo: {
                externalAdReply: {
                  title: "Deep Effect Applied",
                  body: "Powered by Njabulo Jb",
                  thumbnailUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
                  sourceUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
                  mediaType: 1,
                  showAdAttribution: true
                }
              }
            }, { quoted: ms });

            fs.unlinkSync(ran);
          });
        } catch (e) {
          sendFormattedMessage(zk, chatId, "error", ms);
        }
      } else {
        sendFormattedMessage(zk, chatId, 'the command only works with audio messages', ms);
      }
    } else {
      sendFormattedMessage(zk, chatId, 'Please mention an audio', ms);
    }
  }
);
