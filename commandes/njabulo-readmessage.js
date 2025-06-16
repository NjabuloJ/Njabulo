const { fana } = require("../njabulo/fana");
const s = require("../set");
const fs = require('fs');
const Heroku = require('heroku-client');

// Function to get a description of an environment variable
function getDescriptionFromEnv(varName) {
  try {
    const filePath = "./app.json";
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const config = JSON.parse(fileContent);
    return config.env[varName]?.description || "The environment variable description was not found.";
  } catch (error) {
    console.error("Error reading app.json:", error);
    return "Error reading app.json";
  }


fana({
  nomCom: 'readmessage',
  categorie: "Control"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return zk.sendMessage(chatId, {
      text: "```you error 🚫 only owner```",
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

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return zk.sendMessage(chatId, {
      text: 'Instructions:\n\nType "readmessage yes" to enable or "readmessage no" to disable.',
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

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.AUTO_READ_MESSAGES = 'yes';  // Enable Autoread
      responseMessage = 'Auto-read has been enabled successfully.';
      break;

    case "no":
      s.AUTO_READ_MESSAGES = 'no';  // Disable read message
      responseMessage = 'Auto-read has been disabled successfully.';
      break;

    default:
      return zk.sendMessage(chatId, {
        text: "Please don't invent an option. Type 'readmessage yes' or 'readmessage no'.",
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

  // Send the response message to the user
  try {
    zk.sendMessage(chatId, {
      text: responseMessage,
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
  } catch (error) {
    console.error("Error processing your request:", error);
    zk.sendMessage(chatId, {
      text: 'Error processing your request.',
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
});