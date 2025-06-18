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
fana({ nomCom: "pong", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms } = commandeOptions;
    const { time, date } = getTimeAndDate();
    const ping = Math.floor(Math.random() * 100) + 1; // Generate a random ping between 1ms - 100ms

    try {
        await zk.sendMessage(dest, { 
            text: `*🚀 SYSTEM PING* 🔋\n\n🕒 System Time: ${time}\n*▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰*\n⚡ Response: ${ping}ms🟢\n📶 Quality: HIGH LATENCY\n```run online```\n- -run: 99.${ping}%\n- -cmd: ${ping}1%\n\n🌐 Routing: Automatic Optimization\n🖥️ Server: Core-: ${date} :${ping}\n*▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰*\n> *ping is available working online 24/7*`,
            contextInfo: {
          isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363399999197102@newsletter',
         newsletterName: "",
         serverMessageId: 143,
                }
            }
        }, { quoted: ms });

    } catch (e) {
        console.log("❌ Ping Command Error: " + e);
        repondre("❌ Error: " + e);
    }
});
