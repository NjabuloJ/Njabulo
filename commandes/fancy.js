const { fana } = require("../njabulo/fana");
const fancy = require("../njabulo/style");

fana({ nomCom: "fancy", categorie: "Use", reaction: "🖊️" }, async (dest, zk, commandeOptions) => {
    const { arg, prefixe } = commandeOptions;
    const id = arg[0]?.match(/\d+/)?.join('');
    const text = arg.slice(1).join(" ");

    try {
        if (id === undefined || text === undefined) {
            const msg = `Example : ${prefixe}fancy 10 Njabulo-Jb\n` + String.fromCharCode(8206).repeat(4001) + fancy.list('text next', fancy);
            return await zk.sendMessage(dest, {
                text: msg,
                contextInfo: {
                    externalAdReply: {
                        title: "Njabulo Jb",
                        body: "WhatsApp status !",
                        thumbnailUrl: conf.URL,
                        sourceUrl: conf.GURL,
                        mediaType: 1,
                        showAdAttribution: true
                    }
                }
            });
        }

        const selectedStyle = fancy[parseInt(id) - 1];
        if (selectedStyle) {
            const styledText = fancy.apply(selectedStyle, text);
            return await zk.sendMessage(dest, {
                text: styledText,
                contextInfo: {
                    externalAdReply: {
                        title: "Njabulo Jb",
                        body: "WhatsApp status !",
                        thumbnailUrl: conf.URL,
                        sourceUrl: conf.GURL,
                        mediaType: 1,
                        showAdAttribution: true
                    }
                }
            });
        } else {
            return await zk.sendMessage(dest, {
                text: '_Style introuvable :(_',
                contextInfo: {
                    externalAdReply: {
                        title: "Njabulo Jb",
                        body: "WhatsApp status !",
                        thumbnailUrl: conf.URL,
                        sourceUrl: conf.GURL,
                        mediaType: 1,
                        showAdAttribution: true
                    }
                }
            });
        }
    } catch (error) {
        console.error(error);
        return await zk.sendMessage(dest, {
            text: '_Une erreur s\'est produite :(_',
            contextInfo: {
                externalAdReply: {
                    title: "Njabulo Jb",
                    body: "WhatsApp status !",
                    thumbnailUrl: conf.URL,
                    sourceUrl: conf.GURL,
                    mediaType: 1,
                    showAdAttribution: true
                }
            }
        });
    }
});
