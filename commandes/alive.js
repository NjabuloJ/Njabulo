const { fana } = require('../njabulo/fana');
const { addOrUpdateDataInAlive, getDataFromAlive } = require('../bdd/alive')
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
    nomCom: 'alive',
    categorie: 'General'
  }, async (chatId, zk, commandeOptions) => {

    const { ms, arg, repondre, superUser } = commandeOptions;

    const data = await getDataFromAlive();

    if (!arg || !arg[0] || arg.join('') === '') {

      if (data) {

        const { message, lien } = data;


        var mode = "public";
        if ((s.MODE).toLocaleLowerCase() != "yes") {
          mode = "private";
        }

        moment.tz.setDefault('Etc/GMT');

        const temps = moment().format('HH:mm:ss');
        const date = moment().format('DD/MM/YYYY');

        const alivemsg = `
*Owner* : ${s.OWNER_NAME}
*Mode* : ${mode}
*Date* : ${date}
*Hours(GMT)* : ${temps}

 ${message}
 
 
 *CRISS VEVO*`

        if (lien.match(/\.(mp4|gif)$/i)) {
          try {
            zk.sendMessage(chatId, { video: { url: lien }, caption: alivemsg }, { quoted: ms });
          }
          catch (e) {
            console.log("⚡⚡ Menu erreur " + e);
            sendFormattedMessage(zk, chatId, "⚡⚡ Menu erreur " + e, ms);
          }
        }
        else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
          try {
            zk.sendMessage(chatId, { image: { url: lien }, caption: alivemsg }, { quoted: ms });
          }
          catch (e) {
            console.log("⚡⚡ Menu erreur " + e);
            sendFormattedMessage(zk, chatId, "⚡⚡ Menu erreur " + e, ms);
          }
        }
        else {
          sendFormattedMessage(zk, chatId, alivemsg, ms);
        }

      } else {
        if (!superUser) { sendFormattedMessage(zk, chatId, "NJABULO JB IS ALiVE ALL THE TIME👨‍💻", ms); return };

        sendFormattedMessage(zk, chatId, "NJABULO JB IS ALiVE ALL THE TIME👨‍💻", ms);
      }
    } else {

      if (!superUser) { sendFormattedMessage(zk, chatId, "Only the owner can  modify the alive", ms); return };

      const texte = arg.join(' ').split(';')[0];
      const tlien = arg.join(' ').split(';')[1];


      await addOrUpdateDataInAlive(texte, tlien)

      sendFormattedMessage(zk, chatId, ' Holla🫵, *Njabulo Jb* is alive just like you. ', ms);

    }
  });
