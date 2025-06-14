const { fana } = require('../njabulo/fana');
const axios = require('axios');
const fs = require('fs-extra');
const { mediafireDl } = require("../njabulo/dl/Function");
const conf = require(__dirname + "/../set");

fana({
  nomCom: 'ap',
  aliases: ['app', 'playstore'],
  reaction: '☘️',
  categorie: 'Download'
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  const appName = arg.join(" ");
  if (!appName) {
     zk.sendMessage(dest, {
      text: "Please provide an app name.",
      contextInfo: {
        externalAdReply: {
          title: "Njabulo Jb",
          body: "WhatsApp status !",
          thumbnailUrl: conf.URL,
          sourceUrl: conf.GURL,
          mediaType: 1,
          showAdAttribution: true
        }
      }
    });
    return;
  }

  try {
    const searchResponse = await axios.get(`https://bk9.fun/search/apk?q=${appName}`);                                 
    const searchData = searchResponse.data;

    if (!searchData.BK9 || searchData.BK9.length === 0) {
      zk.sendMessage(dest, {
        text: "No app found with that name, please try again.",
        contextInfo: {
          externalAdReply: {
            title: "Njabulo Jb",
            body: "WhatsApp status !",
            thumbnailUrl: conf.URL,
            sourceUrl: conf.GURL,
            mediaType: 1,
            showAdAttribution: true
          }
        }
      });
      return;
    }
    const appDetailsResponse = await axios.get(`https://bk9.fun/search/apk?q=${appName}`);
    const searchData = searchResponse.data;

    if (!searchData.BK9 || searchData.BK9.length === 0) {
       zk.sendMessage(dest, {
        text: "No app found with that name, please try again.",
        contextInfo: {
          externalAdReply: {
            title: "Njabulo Jb",
            body: "WhatsApp status !",
            thumbnailUrl: conf.URL,
            sourceUrl: conf.GURL,
            mediaType: 1,
            showAdAttribution: true
          }
        }
      });
      return;
    }

    const appDetailsResponse = await axios.get(`https://bk9.fun/download/apk?id=${searchData.BK9[0].id}`);
    const appDetails = appDetailsResponse.data;

    if (!appDetails.BK9 || !appDetails.BK9.dllink) {
      zk.sendMessage(dest, {
        text: "Unable to find the download link for this app.",
        contextInfo: {
          externalAdReply: {
            title: "Njabulo Jb",
            body: "WhatsApp status !",
            thumbnailUrl: conf.URL,
            sourceUrl: conf.GURL,
            mediaType: 1,
            showAdAttribution: true
          }
        }
      });
      return;
    }

    const thumb = appDetails.BK9.thumbnail || conf.URL;

    await zk.sendMessage(dest, {
      document: { url: appDetails.BK9.dllink },
      fileName: `${appDetails.BK9.name}.apk`,
      mimetype: "application/vnd.android.package-archive",
      caption: `Downloaded by ${conf.OWNER_NAME}`,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363345407274799@newsletter',
          newsletterName: "NJABULO JB",
          serverMessageId: 143,
        },
        forwardingScore: 999,
        externalAdReply: {
          title: "ɳᴊᴀʙᴜʟᴏ ᴊʙ σғғɪᴄᴇ",
          body: appDetails.BK9.name,
          thumbnailUrl: 'https:                               
          sourceUrl: '//files.catbox.moe/cs7xfr.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029VarYP5iAInPtfQ8fRb2T',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: ms });
  } catch (error) {
    console.error("Error during APK download process:", error);
    zk.sendMessage(dest, {
      text: "APK download failed. Please try again later.",
      contextInfo: {
        externalAdReply: {
          title: "Njabulo Jb",
          body: "WhatsApp status !",
          thumbnailUrl: conf.URL,
          sourceUrl: conf.GURL,
          mediaType: 1,
          showAdAttribution: true
        }
      }
    });
  }
});
