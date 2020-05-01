/**
 * External Dependencies
 */

const debug = require('debug')('songwhip-bots:telegram:commands');

/**
 * Internal Dependencies
 */

const wait = require('../utils/wait');

/**
 * @param {import('telegraf/telegram')} bot
 */
module.exports = (bot) => {
  return async ({ chat, from, reply }) => {
    debug('start');
    await bot.sendMessage(chat.id, `Welcome ${from.first_name}!`);
  };
};
