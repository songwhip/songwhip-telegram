module.exports = (json) => {
  switch (json.type) {
    case 'artist':
      return `_${json.name}_ ${json.url}`;
    case 'album':
    case 'track':
      return `"${json.name}" by ${json.artists[0].name} ${json.url}`;
  }
};
