
module.exports = (bot) => {
  return {
    start: require('./start')(bot),
    convert: require('./convert')(bot),
    help: require('./help')(bot),
    inline: require('./inline')(bot),
  };
};
