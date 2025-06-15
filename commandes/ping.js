const util = require('util');
const fs = require('fs-extra');
const axios = require('axios');
const { fana } = require(__dirname + "/../njabulo/fana");
const os = require("os");
const moment = require("moment-timezone");
const set = require(__dirname + "/../set");

const AUDIO_URL = "https://files.catbox.moe/3o8hia.mp3"; // New audio URL
const THUMBNAIL_URL = "https://files.catbox.moe/03i374.jpg"; // New image URL

moment.tz.setDefault(`${set.TZ}`);

const getTimeAndDate = () => {
    return {

        time: moment().format('HH:mm:ss'),
        date: moment().format('DD/MM/YYYY')
    };
};

// Ping Command
fana({ nomCom: "pig", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms } = commandeOptions;
    const { time, date } = getTimeAndDate();
    const ping = Math.floor(Math.random() * 100) + 1; // Generate a random ping between 1ms - 100ms

    try {
        await zk.sendMessage(dest, { 
            text: `ɴנαʙυʟσ ᴊв ѕρєєᴅ: ${ping}ms jh: ${time}`,
            contextInfo: {
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
              newsletterJid: '120363345407274799@newsletter',
                  newsletterName: "╭••➤®Njabulo Jb",
                  serverMessageId: 143,
                   },
                   forwardingScore: 999, // Score to indicate it has been forwarded
                   externalAdReply: {
                    title: "Njabulo Jb",
                    body: "ɴᴊᴀʙᴜʟᴏ ᴊʙ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ",
                    thumbnailUrl: THUMBNAIL_URL,
                    sourceUrl: 'https://github.com/NjabuloJ/Njabulo-Jb', // Add source URL if necessary
                    mediaType: 1,
                    renderSmallThumbnail: true // Small thumbnail rendering
                }
            }
        }, { quoted: ms });

    } catch (e) {
        console.log("❌ Ping Command Error: " + e);
        repondre("❌ Error: " + e);
    }
});
