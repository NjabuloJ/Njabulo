const util = require('util');
const fs = require('fs-extra');
const { fana } = require(__dirname + "/../njabulo/fana");
const { format } = require(__dirname + "/../njabulo/mesfonctions");
const os = require("os");
const conf = require(__dirname + "/../set");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

fana({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../njabulo//fana");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault ("Africa/nairobi");

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
╭─❖
┋□ ɴᴀᴍᴇ : ɴᴊᴀʙᴜʟᴏ ᴊʙ
┋□ ᴅᴀᴛᴇ: ${date}
┋□ ᴛɪᴍᴇ: ${temps}
┋□ ᴘʀᴇғɪx: *[ ${prefixe} ]*
┋□ type *[ollmenu]* see cmd
╰─❖
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, {
      text: infoMsg,
      contextInfo: {
       footer: "*Njabulo Jb*, developed by Njabulo",
        gifPlayback: true,
        externalAdReply: {
          title: "Njabulo Jb",
          body: "Message menu",
          mediaType: 1,
          thumbnailUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
         sourceUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
         renderLargerThumbnail: true,
         showAdAttribution: true,
        }
      }
    }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, {
      text: infoMsg,
      contextInfo: {
        footer: "*Njabulo_Jb*, developed by Njabulo",
        externalAdReply: {
          title: "Njabulo Jb",
          body: "Message menu",
          mediaType: 1,
          thumbnailUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
         sourceUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
        renderLargerThumbnail: true,
         showAdAttribution: true,
        }
      }
    }, { quoted: ms });
      }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    zk.sendMessage(dest, {
      text: infoMsg,
     footer: "*Njabulo Jb*, developed by Njabulo",
     gifPlayback: true,
      contextInfo: {
        externalAdReply: {
          title: "Njabulo Jb",
          body: "Message menu",
          mediaType: 1,
          thumbnailUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
         sourceUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
        renderLargerThumbnail: true,
         showAdAttribution: true,
        }
      }
    }, { quoted: ms });  
     }
    
       // List of audio URLs
    const audioUrls = [
        "https://files.catbox.moe/s12zlw.mp3" // New song added
    ];

    // Select menu loading
          let infoMsgs =  `
  *Loading oll commands* 
*╭─❖*
*┋🕵️ ɴᴀᴍᴇ : ɴᴊᴀʙᴜʟᴏ ᴊʙ*
*╰─❖*

> sir Njabulo Jb`;

    try {
        await zk.sendMessage(dest, {
       text: infoMsgs,
        contextInfo: {
        externalAdReply: {
          title: "Njabulo Jb",
          body: "Message ollmenu !",
          thumbnailUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
          sourceUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
          mediaType: 1,
          showAdAttribution: true
              }
            }
        }, { quoted: ms });
    } catch (e) {
        console.log("🥵🥵 Error sending menu: " + e);
        repondre("🥵🥵 Error sending menu: " + e);
    }
});
