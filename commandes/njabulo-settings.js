const { fana } = require("../njabulo/fana");
const s = require("../set");
const fs = require('fs');
const Heroku = require('heroku-client');

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
}

//message settings
fana({
  nomCom: 'settings',
  categorie: "Control"
}, async (chatId, zk, context) => {
  const { ms, superUser, auteurMessage } = context;

  if (!superUser) {
    sendFormattedMessage(zk, chatId, "This command is for my owner only!", ms);
    return;
  }

  const settingsOptions = [
    { nom: "ADM", choix: ['yes', "no"] },
    { nom: "ANTICALL", choix: ['yes', 'no'] },
    { nom: "AUTO_REACT", choix: ['yes', "no"] },
    { nom: "AUTO_VIEW_STATUS", choix: ['yes', "no"] },
    { nom: 'AUTO_SAVE_STATUS', choix: ['yes', "no"] },
    { nom: "PM_PERMIT", choix: ['yes', "no"] },
    { nom: 'MODE', choix: ["public", "private"] },
    { nom: "STARTING_MESSAGE", choix: ['on', "off"] },
    { nom: "AUTO_READ_MESSAGES", choix: ['on', "off"] },
    { nom: 'PRESENCE', choix: ["online", "typing", 'recording'] },
    { nom: "CHAT_BOT", choix: ['on', 'off'] }
  ];

  let settingsMenu = "╭──────༺♡༻──────╮\n  Njabulo JB Settings\n╰──────༺♡༻──────╯\n\n";
  settingsOptions.forEach((option, index) => {
    settingsMenu += `${index + 1}- *${option.nom}*\n`;
  });
  settingsMenu += "\n*Please choose a variable by its number*";

  const initialMessage = await sendFormattedMessage(zk, chatId, settingsMenu, ms);

  // Await user choice for a setting
  const collector = zk.messageCollector(chatId, {
    filter: msg => msg.key.participant === auteurMessage && msg.message.extendedTextMessage,
    time: 60000
  });

  collector.on('collect', async (msg) => {
    const userChoice = parseInt(msg.message.extendedTextMessage.text);
    if (isNaN(userChoice) || userChoice < 1 || userChoice > settingsOptions.length) return;

    const selectedOption = settingsOptions[userChoice - 1];
    let settingsDetail = `╭──────༺♡༻──────╮\n  Njabulo JB settings\n╰──────༺♡༻──────╯\n\n`;
    settingsDetail += `*Variable Name* : ${selectedOption.nom}\n`;
    settingsDetail += `*Description* : ${getDescriptionFromEnv(selectedOption.nom)}\n\n`;
    settingsDetail += "┌────── ⋆⋅☆⋅⋆ ──────┐\n\n";
    selectedOption.choix.forEach((choice, index) => {
      settingsDetail += `* *${index + 1}* => ${choice}\n`;
    });
    settingsDetail += "\n└────── ⋆⋅☆⋅⋆ ──────┘\n\n*Now reply to this message with the number that matches your choice.*";

    const choiceMessage = await sendFormattedMessage(zk, chatId, settingsDetail, ms);

    // Await user choice for the option
    const collector2 = zk.messageCollector(chatId, {
      filter: msg => msg.key.participant === auteurMessage && msg.message.extendedTextMessage,
      time: 60000
    });

    collector2.on('collect', async (msg2) => {
      const userOptionChoice = parseInt(msg2.message.extendedTextMessage.text);
      if (isNaN(userOptionChoice) || userOptionChoice < 1 || userOptionChoice > selectedOption.choix.length) return;

      const heroku = new Heroku({ token: s.HEROKU_API_KEY });
      await heroku.patch(`/apps/${s.HEROKU_APP_NAME}/config-vars`, {
        body: {
          [selectedOption.nom]: selectedOption.choix[userOptionChoice - 1]
        }
      });

      sendFormattedMessage(zk, chatId, "That Heroku variable is changing, The bot is restarting....", ms);
    });
  });
});

// Function to change Heroku environment variables
function changevars(commandName, varName) {
  fana({
    nomCom: commandName,
    categorie: 'Control'
  }, async (chatId, zk, context) => {
    const { arg, superUser, ms } = context;

    if (!superUser) {
      sendFormattedMessage(zk, chatId, "This command is for my owner only!", ms);
      return;
    }

    if (!s.HEROKU_APP_NAME || !s.HEROKU_API_KEY) {
      sendFormattedMessage(zk, chatId, "Fill in the HEROKU_APP_NAME and HEROKU_API_KEY environment variables", ms);
      return;
    }

    if (!arg[0]) {
      sendFormattedMessage(zk, chatId, getDescriptionFromEnv(varName), ms);
      return;
    }

    const heroku = new Heroku({ token: s.HEROKU_API_KEY });
    await heroku.patch(`/apps/${s.HEROKU_APP_NAME}/config-vars`, {
      body: {
        [varName]: arg.join(" ")
      }
    });

    sendFormattedMessage(zk, chatId, "That Heroku variable is changing, The bot is restarting....", ms);
  });
}