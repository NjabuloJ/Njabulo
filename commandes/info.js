const { fana } = require('../njabulo/fana');

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
    nomCom: 'info',
    categorie: 'General',
    reaction: '🗿'
  },
  async (chatId, zk, commandeOptions) => {
    const { ms, repondre, prefix, nomAuteurMessage } = commandeOptions;

    try {
      const groupLink = 'https://chat.whatsapp.com/GoXKLVJgTAAC3556FXkfFI';
      const channelLink = 'https://whatsapp.com/channel/0029VagJlnG6xCSU2tS1Vz19';

      const infoMsg = `
𝐓𝐎𝐗𝐈𝐂-𝐌𝐃

◈━━━━━━━━━━━━━━━━◈
│❒ Yo ${nomAuteurMessage}, here’s the dope on 𝔗𝔬𝔵𝔦𝔠 𝔐𝔇! 🔥
│❒ *📩 𝐆𝐫𝐨𝐮𝐩*: ${groupLink}
│❒ *📢 𝐂𝐡𝐚𝐧𝐧𝐞𝐥*: ${channelLink}
│❒ Wanna vibe with the owner? Use *${prefix}owner*! 😎
│❒ Powered by xh_clinton
◈━━━━━━━━━━━━━━━━◈
      `;

      await sendFormattedMessage(zk, chatId, infoMsg, ms);

    } catch (error) {
      console.error("Error in info command:", error.stack);
      sendFormattedMessage(zk, chatId, `𝐓𝐎𝐗𝐈𝐂-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ TOTAL BUST, ${nomAuteurMessage}! 𝔗𝔬𝔵𝔦𝔠 𝔐𝔇 tripped while dropping the info: ${error.message} 😡 Try again or flop! 😣\n◈━━━━━━━━━━━━━━━━◈`, ms);
    }
  }
);