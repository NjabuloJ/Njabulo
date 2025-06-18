const { fana } = require("../njabulo/fana");

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
  'nomCom': "weather",
  'reaction': "🌡️",
  'categorie': "Search"
}, 
    async (chatId, zk, commandeOptions) => {
  const { arg, repondre, ms } = commandeOptions;
  const location = arg.join(" ");
  if (!location) {
    return sendFormattedMessage(zk, chatId, "Give me location...", ms);
  }
  const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en");
  const data = await response.json();
  const city = data.name;
  const temp = data.main.temp;
  const desc = data.weather[0].description;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const rain = data.rain ? data.rain['1h'] : 0;
  const clouds = data.clouds.all;
  const sunrise = new Date(data.sys.sunrise * 1000);
  const sunset = new Date(data.sys.sunset * 1000);
  await sendFormattedMessage(zk, chatId, " *country * \n\n❄️ Weather in " + city + "\n\n🌡️ *Temperature:* " + temp + "°C\n📝 *Description:* " + desc + "\n❄️ *Humidity:* " + humidity + "%\n🌀 *Wind Speed:* " + windSpeed + " m/s\n🌧️ *Rain Volume (last hour):* " + rain + " mm\n☁️ *Cloudiness:* " + clouds + "%\n🌄 *Sunrise:* " + sunrise.toLocaleTimeString() + "\n🌅 *Sunset:* " + sunset.toLocaleTimeString() + "\n🌫️ *Latitude:* " + data.coord.lat + "\n🌪️ *Longitude:* " + data.coord.lon + "\n\n🗺 *Country:* " + data.sys.country + "\n\n\n*°Powered by Njabulo Jb*", ms);
});
