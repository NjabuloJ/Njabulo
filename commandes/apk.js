const { fana } = require('../njabulo/fana');
const axios = require('axios');
const fs = require('fs-extra');
const { mediafireDl } = require("../framework/dl/Function");
const conf = require(__dirname + "/../set");

fana({
  nomCom: 'apk',
  aliases: ['app', 'playstore'],
  reaction: '☘️',
  categorie: 'Download'
}, async (dest, zk, commandeOptions) => {
  const { arg, ms } = commandeOptions;

  const repondre = async (text) => {
     zk.sendMessage(dest, {
      text: text,
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
  };

  // Check if app name is provided
  const appName = arg.join(" ");
  if (!appName) {
    return repondre("Please provide an app name.");
  }

  try {
    // Fetch app search results from the BK9 API
    const searchResponse = await axios.get(`https://bk9.fun/search/apk?q=${appName}`);
    const searchData = searchResponse.data;

    // Check if any results were found
    if (!searchData.BK9 || searchData.BK9.length === 0) {
      return repondre("No app found with that name, please try again.");
    }

    // Fetch the APK details for the first result
    const appDetailsResponse = await axios.get(`https://bk9.fun/download/apk?id=${searchData.BK9[0].id}`);
    const appDetails = appDetailsResponse.data;

    // Check if download link is available
    if (!appDetails.BK9 || !appDetails.BK9.dllink) {
      return repondre("Unable to find the download link for this app.");
    }

    await repondre(`Downloading ${appDetails.BK9.name}...`);

    // Send the APK file to the group with thumbnail
     zk.sendMessage(dest, {
      document: { url: appDetails.BK9.dllink },
      fileName: `${appDetails.BK9.name}.apk`,
      mimetype: "application/vnd.android.package-archive",
      caption: `Downloaded by ${conf.OWNER_NAME}`,
      contextInfo: {
        externalAdReply: {
          title: "ɳᴊᴀʙᴜʟᴏ ᴊʙ σғғɪᴄᴇ",
          body: "fast via",
          thumbnailUrl: 'https://files.catbox.moe/cs7xfr.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029VarYP5iAInPtfQ8fRb2T',
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true
        }
      }
    }, { quoted: ms });

  } catch (error) {
    // Catch any errors and notify the user
    console.error("Error during APK download process:", error);
    repondre("APK download failed. Please try again later.");
  }
});
