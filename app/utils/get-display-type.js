
const DISPLAY_TYPES = {
  artist: 'Artist',
  album: 'Album',
  track: 'Song',
};

module.exports = (type) => {
  return DISPLAY_TYPES[type];
};
