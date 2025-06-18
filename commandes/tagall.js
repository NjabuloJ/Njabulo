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

fana({ nomCom: "tagall", categorie: 'Group', reaction: "🚨" }, async (chatId, zk, commandeOptions) => {

  const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions

  if (!verifGroupe) { 
    sendFormattedMessage(zk, chatId, "this command is reserved for groups", ms);
    return; 
  }

  if (!arg || arg === ' ') {
    mess = 'No Message'
  } else {
    mess = arg.join(' ')
  } 

  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  var tag = ""; 
  tag +=(zk, chatId,`\n*Group* : *${nomGroupe}*\n *Message* : *${mess}*\n` ;ms);
  let emoji = ['> dear💗']
  let random = Math.floor(Math.random() * (emoji.length - 1))

  for (const membre of membresGroupe) {
    tag += `${emoji[random]} @${membre.id.split("@")[0]}\n`
  }

  if (verifAdmin || superUser) {
    zk.sendMessage(chatId, { text: tag, mentions: membresGroupe.map((i) => i.id) }, { quoted: ms })
  } else { 
    sendFormattedMessage(zk, chatId, 'command reserved for admins', ms);
  }
});
