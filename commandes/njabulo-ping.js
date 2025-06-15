const util = require('util');
const fs = require('fs-extra');
const axios = require('axios');
const { fana } = require(__dirname + "/../njabulo/fana");
const os = require("os");
const moment = require("moment-timezone");
const set = require(__dirname + "/../set");

//uptime hh mm ss
    moment.tz.setDefault("Africa/Dar_es_Salaam");
    const hour = moment().hour();
    let greeting = "Good morning";
    if (hour >= 12 && hour < 18) greeting = "Good afternoon!";
    else if (hour >= 18) greeting = "Good evening!";
    else if (hour >= 22 || hour < 5) greeting = "Good night";

        time: moment().format('HH:mm:ss'),
        date: moment().format('DD/MM/YYYY')

// Ping Command
fana({ nomCom: "ping", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms } = commandeOptions;
    const { time, date } = getTimeAndDate();
    const ping = Math.floor(Math.random() * 100) + 1; // Generate a random ping between 1ms - 100ms

    try {
        await zk.sendMessage(dest, { 
            text: `*🚀 SYSTEM PONG* 🔋\n\n🕒 System Time: ${time}\n*□□□□□□□□□□□□□□□□□□□□□□□□□□*\nDuration pong: ${ping}ms\n📅 Activated: ${date}\n\n⚡ Performance:\nReliability: 99.98%\n Stability: 96%\n Nodes:\nGlobal Distribution\n\n🔋 Maintenance:\nAuto-Scheduled\n*□□□□□□□□□□□□□□□□□□□□□□□□□□*\n*🌐 Njabulo JB online date* \n Uptime days: ${greeting}`,
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

    } catch (e) {
        console.log("❌ Ping Command Error: " + e);
        repondre("❌ Error: " + e);
    }
});

