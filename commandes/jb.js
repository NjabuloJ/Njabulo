const util = require('util');
const fs = require('fs-extra');
const axios = require('axios');
const { fana } = require(__dirname + "/../njabulo/fana");
const { format } = require(__dirname + "/../njabulo/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

fana({ nomCom: "ollmenu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../njabulo/fana");

    var commandsList = {};
    var mode = (s.MODE).toLocaleLowerCase() !== "yes" ? "private" : "public";

    cm.map((com) => {
        if (!commandsList[com.categorie]) commandsList[com.categorie] = [];
        commandsList[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('EAT');

    const time = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');
    const url= "https://files.catbox.moe/1l4ix7.jpg",


    let infoMsg = `
commands`;

    let menuMsg = ``;

    for (const category in commandsList) {
        menuMsg += `
 *${category}* `;
        for (const cmd of commandsList[category]) {
            menuMsg += `          
_ _ ${cmd*`;
        }
        menuMsg += `
_ _`;
     
      } 
  zk.sendMessage(dest, { text: infoMsg + menuMsg, .map((i) => i.id) }, { quoted: ms })

   } else { repondre('command reserved for admins')}

});
