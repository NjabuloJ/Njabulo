const { exec } = require("child_process");
const { fana } = require("../njabulo/fana");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const { ajouterOuMettreAJourJid, mettreAJourAction, verifierEtatJid } = require('../bdd/antilien');
const { atbajouterOuMettreAJourJid, atbverifierEtatJid } = require('../bdd/antibot');
const { search, download } = require('aptoide-scraper');
const fs = require('fs-extra');
const conf = require("../set");
const axios = require("axios");
const { getBinaryNodeChild, getBinaryNodeChildren } = require("@whiskeysockets/baileys");

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
  'nomCom': "vcf",
  'aliases': ["savecontact", "savecontacts"],
  'categorie': "Group",
  'reaction': '♻️'
}, async (chatId, zk, context) => {
  const { repondre, verifGroupe, verifAdmin, ms } = context;

  if (!verifAdmin) {
    sendFormattedMessage(zk, chatId, "You are not an admin here!", ms);
    return;
  }

  if (!verifGroupe) {
    sendFormattedMessage(zk, chatId, "This command works in groups only", ms);
    return;
  }

  try {
    let groupMetadata = await zk.groupMetadata(chatId);
    const participants = await groupMetadata.participants;
    let vcfContent = '';
    for (let participant of participants) {
      let number = participant.id.split('@')[0];
      let name = participant.name || participant.notify || "[LUCKY] +" + number;
      vcfContent += "BEGIN:VCARD\nVERSION:3.0\nFN:" + name + "\nTEL;type=CELL;type=VOICE;waid=" + number + ':+' + number + "\nEND:VCARD\n";
    }

    await sendFormattedMessage(zk, chatId, "A moment, *❮ happiness ❯* is compiling " + participants.length + " contacts into a vcf...", ms);
    await fs.writeFileSync("./contacts.vcf", vcfContent.trim());
    await zk.sendMessage(chatId, {
      'document': fs.readFileSync("./contacts.vcf"),
      'mimetype': "text/vcard",
      'fileName': groupMetadata.subject + '.Vcf',
      'caption': "VCF for " + groupMetadata.subject + "\nTotal Contacts: " + participants.length + "\n ```Njabulo Jb```"
    }, {
      'quoted': ms
    });
    fs.unlinkSync('./contacts.vcf');
  } catch (error) {
    console.error("Error while creating or sending VCF:", error.message || error);
    sendFormattedMessage(zk, chatId, "An error occurred while creating or sending the VCF. Please try again.", ms);
  }
});
