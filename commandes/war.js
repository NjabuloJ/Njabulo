const { fana } = require('../njabulo/fana');
const { ajouterUtilisateurAvecWarnCount, getWarnCountByJID, resetWarnCountByJID } = require('../bdd/warn')
const s = require("../set")

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

fana(
  {
    nomCom: 'warn',
    categorie: 'Group'

  }, async (dest, zk, commandeOptions) => {

    const { ms, arg, superUser, verifGroupe, verifAdmin, msgRepondu, auteurMsgRepondu } = commandeOptions;
    if (!verifGroupe) {
      sendFormattedMessage(zk, dest, 'This is a group command', ms);
      return;
    };

    if (verifAdmin || superUser) {
      if (!msgRepondu) {
        sendFormattedMessage(zk, dest, 'Reply to a message of user to warn', ms);
        return;
      };

      if (!arg || !arg[0] || arg.join('') === '') {
        await ajouterUtilisateurAvecWarnCount(auteurMsgRepondu)
        let warn = await getWarnCountByJID(auteurMsgRepondu)
        let warnlimit = s.WARN_COUNT

        if (warn >= warnlimit) {
          sendFormattedMessage(zk, dest, 'This user has reached the limit of warnings, so I will kick them', ms);
          zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "remove")
        } else {
          var rest = warnlimit - warn;
          sendFormattedMessage(zk, dest, `This user is warned, rest before kick: ${rest}`, ms)
        }
      } else if (arg[0] === 'reset') {
        await resetWarnCountByJID(auteurMsgRepondu)
        sendFormattedMessage(zk, dest, "Warn count is reset for this user", ms)
      } else {
        sendFormattedMessage(zk, dest, 'Reply to a user by typing .warn or .warn reset', ms)
      }

    } else {
      sendFormattedMessage(zk, dest, 'You are not admin', ms)
    }

  });
