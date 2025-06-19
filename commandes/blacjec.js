const { fana } = require("../njabulo/fana");
const conf = require(__dirname + "/../set");

fana({
  nomCom: "blackjack",
  aliases: ["bj"],
  desc: "play blackjack",
  categorie: "Game"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  let playerHand = [getRandomCard(), getRandomCard()];
  let dealerHand = [getRandomCard(), getRandomCard()];

  if (arg[0] === "start") {
    repondre(`Your hand: ${playerHand.join(", ")} (Total: ${calculateHandValue(playerHand)})`);
    repondre(`Dealer's up card: ${dealerHand[0]}`);
  } else if (arg[0] === "hit") {
    playerHand.push(getRandomCard());
    repondre(`Your hand: ${playerHand.join(", ")} (Total: ${calculateHandValue(playerHand)})`);
    if (calculateHandValue(playerHand) > 21) {
      repondre(`You busted! Dealer wins.`);
      return;
    }
  } else if (arg[0] === "stand") {
    repondre(`Dealer's hand: ${dealerHand.join(", ")} (Total: ${calculateHandValue(dealerHand)})`);
    while (calculateHandValue(dealerHand) < 17) {
      dealerHand.push(getRandomCard());
      repondre(`Dealer draws: ${dealerHand[dealerHand.length - 1]}`);
      repondre(`Dealer's hand: ${dealerHand.join(", ")} (Total: ${calculateHandValue(dealerHand)})`);
    }
    if (calculateHandValue(dealerHand) > 21) {
      repondre(`Dealer busted! You win.`);
    } else if (calculateHandValue(dealerHand) < calculateHandValue(playerHand)) {
      repondre(`You win!`);
    } else if (calculateHandValue(dealerHand) > calculateHandValue(playerHand)) {
      repondre(`Dealer wins.`);
    } else {
      repondre(`Push.`);
    }
  }
});

function getRandomCard() {
  const cards = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
  return cards[Math.floor(Math.random() * cards.length)];
}

function calculateHandValue(hand) {
  let value = 0;
  let aces = 0;
  for (let card of hand) {
    if (card === "Ace") {
      aces++;
      value += 11;
    } else if (["Jack", "Queen", "King"].includes(card)) {
      value += 10;
    } else {
      value += parseInt(card);
    }
  }
  while (value > 21 && aces) {
    value -= 10;
    aces--;
  }
  return value;
}