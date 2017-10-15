
module.exports = (json) => {
  switch (json.type) {
    case 'artist': return `_${json.name}_ on any music service ✨`;
    case 'album':
    case 'track': return `"${json.name}" by ${json.artists[0].name} on any music service ✨`;
  }
};
