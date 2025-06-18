const { fana } = require('../njabulo/fana');
const axios = require('axios');
const fs = require('fs-extra');
const { mediafireDl } = require("../njabulo/dl/Function");
const conf = require(__dirname + "/../set");

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
  nomCom: "gitclone",
  aliases: ["zip", "clone"],
  categorie: "Download"
}, async (chatId, zk, context) => {
  const { ms, repondre, arg } = context;
  const githubLink = arg.join(" ");

  if (!githubLink) {
    return sendFormattedMessage(zk, chatId, "Please provide a valid GitHub link.", ms);
  }

  if (!githubLink.includes("github.com")) {
    return sendFormattedMessage(zk, chatId, "Is that a GitHub repo link?", ms);
  }

  let [, owner, repo] = githubLink.match(/(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i) || [];
  
  if (!owner || !repo) {
    return sendFormattedMessage(zk, chatId, "Couldn't extract owner and repo from the provided link.", ms);
  }

  repo = repo.replace(/.git$/, '');
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/zipball`;

  try {
    const response = await axios.head(apiUrl);
    const fileName = response.headers["content-disposition"].match(/attachment; filename=(.*)/)[1];

    await zk.sendMessage(chatId, {
      document: { url: apiUrl },
      fileName: `${fileName}.zip`,
      mimetype: "application/zip",
     contextInfo: {
       footer: "*Njabulo Jb*, developed by Njabulo",
        gifPlayback: true,
        externalAdReply: {
          title: "Njabulo Jb",
          body: "Message YouTube search",
          mediaType: 1,
          thumbnailUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
         sourceUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
         renderLargerThumbnail: true,
         showAdAttribution: true,
        }
     }
    }, { quoted: ms });
  } catch (error) {
    console.error(error);
    sendFormattedMessage(zk, chatId, "Error fetching GitHub repository.", ms);
  }
});
