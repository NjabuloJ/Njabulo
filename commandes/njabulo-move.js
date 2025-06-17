const axios = require("axios");
const { fana } = require("../njabulo/fana");
const traduire = require("../njabulo/traduction");
const { Sticker, StickerTypes } = require('wa-sticker-formatter');

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
  nomCom: "movie",
  categorie: "Search"
}, async (chatId, zk, commandeOptions) => {
  const { arg, repondre, ms } = commandeOptions;

  if (!arg[0] || arg === "") {
    sendFormattedMessage(zk, chatId, "I need the name of a movie or series to search for! Like: .movie The Matrix", ms);
    return;
  }

  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${arg}&plot=full`);
    const imdbData = response.data;

    let imdbInfo = "Tap the link to join our movie channel on Telegram and download movies: https://t.me/moviebox_free_movie_download\n";
    imdbInfo += " ``` 𝗧𝗼𝘅𝗶𝗰 𝗠𝗗 𝗙𝗶𝗹𝗺𝘀 ```\n";
    imdbInfo += "𝗠𝗮𝗱𝗲 𝗯𝘆 𝐱𝐡_𝐜𝐥𝐢𝐧𝐭𝐨𝐧\n";
    imdbInfo += "🎬 𝗧𝗶𝘁𝗹𝗲: " + imdbData.Title + "\n";
    imdbInfo += "📅 𝗬𝗲𝗮𝗿: " + imdbData.Year + "\n";
    imdbInfo += "⭐ 𝗥𝗮𝘁𝗶𝗻𝗴: " + imdbData.Rated + "\n";
    imdbInfo += "📆 𝗥𝗲𝗹𝗲𝗮𝘀𝗲𝗱: " + imdbData.Released + "\n";
    imdbInfo += "⏳ 𝗥𝘂𝗻𝘁𝗶𝗺𝗲: " + imdbData.Runtime + "\n";
    imdbInfo += "🌀 𝗚𝗲𝗻𝗿𝗲: " + imdbData.Genre + "\n";
    imdbInfo += "👨🏻‍💻 𝗗𝗶𝗿𝗲𝗰𝘁𝗼𝗿: " + imdbData.Director + "\n";
    imdbInfo += "✍ 𝗪𝗿𝗶𝘁𝗲𝗿𝘀: " + imdbData.Writer + "\n";
    imdbInfo += "👨 𝗔𝗰𝘁𝗼𝗿𝘀: " + imdbData.Actors + "\n";
    imdbInfo += "📃 𝗣𝗹𝗼𝘁: " + imdbData.Plot + "\n";
    imdbInfo += "🌐 𝗟𝗮𝗻𝗴𝘂𝗮𝗴𝗲: " + imdbData.Language + "\n";
    imdbInfo += "🌍 𝗖𝗼𝘂𝗻𝘁𝗿𝘆: " + imdbData.Country + "\n";
    imdbInfo += "🎖️ 𝗔𝘄𝗮𝗿𝗱𝘀: " + imdbData.Awards + "\n";
    imdbInfo += "📦 𝗕𝗼𝘅 𝗢𝗳𝗳𝗶𝗰𝗲: " + imdbData.BoxOffice + "\n";
    imdbInfo += "🏙️ 𝗣𝗿𝗼𝗱𝘂𝗰𝘁𝗶𝗼𝗻: " + imdbData.Production + "\n";
    imdbInfo += "🌟 𝗦𝗰𝗼𝗿𝗲: " + imdbData.imdbRating + "\n";
    imdbInfo += "❎ 𝗜𝗠𝗗𝗕 𝗩𝗼𝘁𝗲𝘀: " + imdbData.imdbVotes + "";

    await zk.sendMessage(chatId, {
      image: {
        url: imdbData.Poster,
      },
      caption: imdbInfo,
    }, {
      quoted: ms,
    });
  } catch (error) {
    sendFormattedMessage(zk, chatId, "Oops, something went wrong while searching for the movie. Try again later!", ms);
  }
});
