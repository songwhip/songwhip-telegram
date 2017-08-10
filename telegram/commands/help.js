
/**
 * External Dependencies
 */

const debug = require('debug')('songwhip-bots:telegram:commands');

/**
 * Internal Dependencies
 */

const typing = require('../utils/wait-typing');

module.exports = (bot) => {
  return async ({ chat, from }) => {
    debug('help');

    await bot.sendMessage(chat.id, `You can interact with me in a few ways …`);

    await typing(bot, chat.id, 2000);
    await bot.sendMessage(chat.id, `Send me a music link you'd like to convert …`);

    await typing(bot, chat.id, 4000);
    await bot.sendMessage(chat.id, `Share a song directly from your favourite music app (eg. Spotify) to this chat in Telegram …`);

    await typing(bot, chat.id, 3700);
    await bot.sendMessage(chat.id, `Type '@SongwhipBot' in any chat to convert a link …`);

    await typing(bot, chat.id, 3900);
    await bot.sendMessage(chat.id, `Or add me to a group, and I'll automatically convert any links I see (requires I'm an 'admin').`);

    await typing(bot, chat.id, 5000);
    await bot.sendMessage(chat.id, `So many options ${from.first_name}! Take your time, you'll find the one that's right for you ☺️`),

    await typing(bot, chat.id, 5000);
    await bot.sendMessage(chat.id, 'Questions…? Reach out 🙌', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: `Twitter`,
              url: 'https://twitter.com/songwhip',
            },
          ],
          [
            {
              text: `Facebook`,
              url: 'https://facebook.com/songwhip',
            },
          ],
        ],
      },
    });
  };
};
