
const { fana } = require('../njabulo/fana');
const axios = require('axios');
const fs = require('fs-extra');
const { mediafireDl } = require("../njabulo/dl/Function");
const conf = require(__dirname + "/../set");


fana({
  nomCom: 'apk',
  aliases: ['app', 'playstore'],
  reaction: '📂',
  categorie: 'Download'
}, async (groupId, client, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  // Check if app name is provided
  const appName = arg.join(" ");
  if (!appName) {
  zk.sendMessage(dest, {
    text: '😡Yo stop slacking! Give me a query, like .apk WhatsApp message',
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
    });
    return;
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

    const thumb = appDetails.BK9.thumbnail || conf.URL; // Fallback to conf.URL if thumbnail is not provided

    // Send the APK file to the group with thumbnail
    await client.sendMessage(groupId, {
      document: { url: appDetails.BK9.dllink },
      fileName: `${appDetails.BK9.name}.apk`,
      mimetype: "application/vnd.android.package-archive",
      caption: `DOWNLOAD AND ENJOY BY VW GOLF`,
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "vw golf",
         serverMessageId: 143,
        }
      }
    }, { quoted: ms });

  } catch (error) {
    // Catch any errors and notify the user
    console.error("Error during APK download process:", error);
    repondre("APK download failed. Please try again later.");
  }
});
