
module.exports = (json) => {
  const prefix = getRandomNoise();

  switch (json.type) {
    case 'artist': return `${prefix} Here's [${json.name}](json.url) on _any_ music service ✨`;
    case 'album':
    case 'track': return `${prefix} Here's [${json.name}](json.url) by _${json.artist.name}_ on *any music service* ✨ [.](${json.url})`;
  }
};

function getRandomNoise() {
  const words = [
    '💣 Boom!',
    '♠️ Ace!',
    '🐣 Cracking!',
    '🎈 Smashing!',
    '📣 Terrific!',
    '🔥 Hot!',
    '🚀 Wahoo!',
    '💃 Woopah!',
    '🕺 Yippie!',
    '🤠 Mega!',
    '🎩 Top Notch!',
    '🎉 Woohoo!',
    '🐙 Yes!',
    '🤙 Rad!',
    '🏆 Winner!',
  ];

  return words[randomNumber(0, words.length - 1)];
}

function randomNumber(from, to) {
  return Math.floor(Math.random() * to) + from;
}
