const { fana } = require("../njabulo/fana");
const conf = require(__dirname + "/../set");

let leaderboard = {};

fana({
  nomCom: "leaderboard",
  aliases: ["lb"],
  desc: "view the leaderboard",
  categorie: "Game"
}, async (dest, zk, commandeOptions) => {
  const { repondre, auteurMessage, arg } = commandeOptions;

  if (arg[0] === "add") {
    const points = parseInt(arg[1]);
    if (!leaderboard[auteurMessage]) {
      leaderboard[auteurMessage] = 0;
    }
    leaderboard[auteurMessage] += points;
    repondre(`Added ${points} points to your score! Your new score is ${leaderboard[auteurMessage]}.`);
  } else if (arg[0] === "view") {
    const sortedLeaderboard = Object.keys(leaderboard).sort((a, b) => leaderboard[b] - leaderboard[a]);
    let leaderboardMessage = "Leaderboard:\n";
    for (let i = 0; i < sortedLeaderboard.length; i++) {
      leaderboardMessage += `${i + 1}. ${sortedLeaderboard[i]} - ${leaderboard[sortedLeaderboard[i]]} points\n`;
    }
    repondre(leaderboardMessage);
  } else if (arg[0] === "myrank") {
    const sortedLeaderboard = Object.keys(leaderboard).sort((a, b) => leaderboard[b] - leaderboard[a]);
    const rank = sortedLeaderboard.indexOf(auteurMessage) + 1;
    if (rank === 0) {
      repondre(`You don't have a rank yet.`);
    } else {
      repondre(`Your rank is #${rank} with ${leaderboard[auteurMessage]} points.`);
    }
  } else {
    repondre(`Leaderboard commands: .leaderboard add <points> to add points, .leaderboard view to view the leaderboard, .leaderboard myrank to view your rank.`);
  }
});