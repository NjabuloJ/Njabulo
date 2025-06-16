const { fana } = require("../njabulo/fana");
const fancy = require("../njabulo/style");

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

fana({ 
  nomCom: "fancy", 
  categorie: "Fun", 
  reaction: "☑️" 
}, async (chatId, zk, commandeOptions) => {
  const { arg, repondre, prefixe, ms } = commandeOptions;
  const id = arg[0]?.match(/\d+/)?.join('');
  const text = arg.slice(1).join(" ");

  try {
    if (id === undefined || text === undefined) {
      return await sendFormattedMessage(zk, chatId, `\nExample : ${prefixe}fancy 10 Njabulo Jb\n` + String.fromCharCode(8206).repeat(4001) + fancy.list('NJABULO JB', fancy), ms);
    }

    const selectedStyle = fancy[parseInt(id) - 1];
    if (selectedStyle) {
      return await sendFormattedMessage(zk, chatId, fancy.apply(selectedStyle, text), ms);
    } else {
      return await sendFormattedMessage(zk, chatId, '_Style not found :(_', ms);
    }
  } catch (error) {
    console.error(error);
    return await sendFormattedMessage(zk, chatId, '_An error occurred :(_', ms);
  }
});￼Enter
