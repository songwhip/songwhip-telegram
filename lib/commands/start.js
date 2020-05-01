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

    await bot.sendChatAction(chat.id, 'typing');
    await wait(2000);

    await bot.sendPhoto(
      chat.id,
      'https://pbs.twimg.com/media/DG2_BFgXYAAsbTJ.jpg:large'
    );
    await bot.sendMessage(
      chat.id,
      `👆 This is what a songwhip link looks like when someone opens it`
    );

    await bot.sendChatAction(chat.id, 'typing');
    await wait(3000);

    await bot.sendMessage(
      chat.id,
      `It's way better than sharing a regular (eg. Spotify) music link as anyone can play it, no matter what streaming platform they're on ✌️`
    );

    await bot.sendChatAction(chat.id, 'typing');
    await wait(2000);

    await bot.sendMessage(
      chat.id,
      `Have a go … send me a music link and I'll convert it for you! 😌`
    );

    await bot.sendChatAction(chat.id, 'typing');
    await wait(3000);

    return reply(`If you get stuck, type '/help'`);
  };
};
