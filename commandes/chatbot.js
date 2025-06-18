const { fana } = require("../njabulo/fana");
const ai = require('unlimited-ai');
const axios = require('axios');
const fs = require('fs');
const conf = require(__dirname + "/../set");

fana.on('message', async (msg) => {
  try {
    // Check if the message is a group message or private message
    const isGroup = msg.key.remoteJid.includes('@g.us');

    // Define the command prefix
    const prefix = '!';

    // Check if the message starts with the prefix
    if (msg.message.conversation.startsWith(prefix)) {
      // Remove the prefix from the message
      const query = msg.message.conversation.slice(prefix.length).trim();

      // Get the AI response
      const response = await ai(query);

      // Send the response
      await fana.sendMessage(msg.key.remoteJid, response);
    } else if (!isGroup) {
      // If it's a private message without a prefix, respond directly
      const response = await ai(msg.message.conversation);
      await fana.sendMessage(msg.key.remoteJid, response);
    }
  } catch (error) {
    console.error(error);
  }
});
