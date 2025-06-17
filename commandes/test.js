const { fana } = require('../njabulo/fana');
const { addOrUpdateDataInAlive, getDataFromAlive } = require('../bdd/alive');
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

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
    nomCom: 'test',
    categorie: 'General',
    reaction: "⚡"
  },
  async (chatId, zk, { ms, arg, repondre, superUser }) => {
    const data = await getDataFromAlive();
    const time = moment().tz('Etc/GMT').format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');
    const mode = (s.MODE.toLowerCase() === "yes") ? "public" : "private";

    if (!arg || !arg[0]) {
      let aliveMsg;

      if (data) {
        const { message, lien } = data;
        aliveMsg = `𝐓𝐎𝐗𝐈𝐂-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ *🔥 𝔗𝔬𝔵𝔦𝔠 𝔐𝔇 𝐢𝐬 𝐀𝐋𝐈𝐕𝐄, Yo!* 🔥\n│❒ *👑 𝐎𝐰𝐧𝐞𝐫*: ${s.OWNER_NAME}\n│❒ *🌐 𝐌𝐨𝐝𝐞*: ${mode}\n│❒ *📅 𝐃𝐚𝐭𝐞*: ${date}\n│❒ *⏰ 𝐓𝐢𝐦𝐞 (GMT)*: ${time}\n│❒ *💬 𝐌𝐞𝐬𝐬𝐚𝐠𝐞*: ${message}\n│❒ *🤖 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐱𝐡_𝐜𝐥𝐢𝐧𝐭𝐨𝐧*\n◈━━━━━━━━━━━━━━━━◈`;

        try {
          if (lien) {
            if (lien.match(/\.(mp4|gif)$/i)) {
              await zk.sendMessage(chatId, {
                video: { url: lien },
                caption: aliveMsg
              }, { quoted: ms });
            } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
              await zk.sendMessage(chatId, {
                image: { url: lien },
                caption: aliveMsg
              }, { quoted: ms });
            } else {
              sendFormattedMessage(zk, chatId, aliveMsg, ms);
            }
          } else {
            sendFormattedMessage(zk, chatId, aliveMsg, ms);
          }
        } catch (e) {
          console.error("Error:", e);
          sendFormattedMessage(zk, chatId, `𝐓𝐎𝐗𝐈𝐂-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ OOPS! 𝔗𝔬𝔵𝔦𝔠 𝔐𝔇 failed to show off: ${e.message} 😡 Try again! 😣\n◈━━━━━━━━━━━━━━━━◈`, ms);
        }
      } else {
        aliveMsg = `𝐓𝐎𝐗𝐈𝐂-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ *🔥 𝔗𝔬𝔵𝔦𝔠 𝔐𝔇 𝐢𝐬 𝐀𝐋𝐈𝐕𝐄, Yo!* 🔥\n│❒ *👑 𝐎𝐰𝐧𝐞𝐫*: ${s.OWNER_NAME}\n│❒ *🌐 𝐌𝐨𝐝𝐞*: ${mode}\n│❒ *📅 𝐃𝐚𝐭𝐞*: ${date}\n│❒ *⏰ 𝐓𝐢𝐦𝐞 (GMT)*: ${time}\n│❒ *💬 𝐌𝐞𝐬𝐬𝐚𝐠𝐞*: Yo, I'm 𝔗𝔬𝔵𝔦𝔠 𝔐𝔇, ready to rock! Set a custom vibe with *alive [message];[link]*! 😎\n│❒ *🤖 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐱𝐡_𝐜𝐥𝐢𝐧𝐭𝐨𝐧*\n◈━━━━━━━━━━━━━━━━◈`;
        sendFormattedMessage(zk, chatId, aliveMsg, ms);
      }
    } else {
      if (!superUser) {
        sendFormattedMessage(zk, chatId, `𝐓𝐎𝐗𝐈𝐂-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ 🛑 Yo, only 𝐱𝐡_𝐜𝐥𝐢𝐧𝐭𝐨𝐧 can mess with 𝔗𝔬𝔵𝔦𝔠 𝔐𝔇’s vibe! 😡\n◈━━━━━━━━━━━━━━━━◈`, ms);
        return;
      }

      const [texte, tlien] = arg.join(' ').split(';');
      await addOrUpdateDataInAlive(texte, tlien);
      sendFormattedMessage(zk, chatId, `𝐓𝐎𝐗𝐈𝐂-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ ✅ 𝔗𝔬𝔵𝔦𝔠 𝔐𝔇’s alive message updated! You’re killing it! 🔥\n◈━━━━━━━━━━━━━━━━◈`, ms);
    }
  }
);