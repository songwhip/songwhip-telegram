
/**
 * External Dependencies
 */

const throttledQueue = require('throttled-queue');

const INTERVAL = 1000 * 60 * 10; // 10 mins
const queue = throttledQueue(1, INTERVAL);

module.exports = (post, text) => {
  queue(() => post.reply(text));
};
