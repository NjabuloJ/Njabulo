const { fana } = require("../njabulo/fana")
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const {ajouterOuMettreAJourJid,mettreAJourAction,verifierEtatJid} = require("../bdd/antilien")
const {atbajouterOuMettreAJourJid,atbverifierEtatJid} = require("../bdd/antibot")
const { search, download } = require("aptoide-scraper");
const fs = require("fs-extra");
const conf = require("../set");
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

fana({ nomCom: "group", categorie: 'Group' }, async (chatId, zk, commandeOptions) => {

  const { repondre, verifGroupe, verifAdmin, superUser, arg, ms } = commandeOptions;

  if (!verifGroupe) { 
    sendFormattedMessage(zk, chatId, "order reserved for group only", ms);
    return; 
  }

  if (superUser || verifAdmin) {

    if (!arg[0]) { 
      sendFormattedMessage(zk, chatId, 'Instructions:\n\nType group open or close', ms);
      return; 
    }

    const option = arg.join(' ')
    switch (option) {
      case "open":
        await zk.groupSettingUpdate(chatId, 'not_announcement')
        sendFormattedMessage(zk, chatId, 'group open', ms);
        break;
      case "close":
        await zk.groupSettingUpdate(chatId, 'announcement');
        sendFormattedMessage(zk, chatId, 'Group close successfully', ms);
        break;
      default: 
        sendFormattedMessage(zk, chatId, "Please don't invent an option", ms);
    }

  } else {
    sendFormattedMessage(zk, chatId, "order reserved for the administrator", ms);
    return;
  }
});
