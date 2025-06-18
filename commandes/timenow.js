const { fana } = require("../njabulo/fana");
const conf = require(__dirname + "/../set");
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

fana({
  nomCom: "timezone",
  aliases: ["timee", "datee"],
  desc: "Check the current local time and date for a specified timezone.",
  categorie: "new",
  reaction: '🕰️',
}, async (chatId, zk, context) => {
  const { repondre, arg, ms } = context;
  const timezone = arg[0];

  if (!timezone) {
    return sendFormattedMessage(zk, chatId, "❌ Please provide a timezone code. Example: .timezone bw", ms);
  }

  try {
    const now = new Date();
    const options = { 
      hour: "2-digit", 
      minute: "2-digit", 
      second: "2-digit", 
      hour12: true, 
      timeZone: timezone 
    };

    const timeOptions = { 
      ...options, 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    };

    const localTime = now.toLocaleTimeString("en-US", options);
    const localDate = now.toLocaleDateString("en-US", timeOptions);

    sendFormattedMessage(zk, chatId, `🕰️ *Current Local Time:* ${localTime}\n📅 *Current Date:* ${localDate}`, ms);
  } catch (e) {
    console.error("Error in .timezone command:", e);
    sendFormattedMessage(zk, chatId, "❌ An error occurred. Please try again later.", ms);
  }
});￼Enter
