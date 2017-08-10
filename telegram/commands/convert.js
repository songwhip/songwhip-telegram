
/**
 * External Dependencies
 */

const debug = require('debug')('songwhip-bots:telegram:commands');

/**
 * Internal Dependencies
 */

const getDisplayType = require('../../utils/get-display-type');
const createMessage = require('../utils/create-message');
const convert = require('../../utils/convert-link');

module.exports = (bot) => {
  return async (message, match = []) => {
    const link = match[1];
    debug('convert', link, message);

    const {
      chat,
      from,
      message_id,
    } = message;

    if (!link.startsWith('http')) {
      bot.sendMessage(chat.id, '🤔 Hmmm … that\'s not a link, try again', {
        reply_to_message_id: message_id,
      });

      return;
    }

    await bot.sendMessage(chat.id, `Thanks ${from.first_name}! Let me convert that …`, {
      reply_to_message_id: message_id,
    });

    await bot.sendChatAction(message.chat.id, 'typing');
    const json = await convert(link);

    if (!json || Object.keys(json.links).length < 2) {
      bot.sendMessage(message.chat.id, '🤔 Hmmm … we can\'t seem to convert that link', {
        reply_to_message_id: message_id,
      });

      return;
    }

    await bot.sendMessage(message.chat.id, createMessage(json), {
      reply_to_message_id: message_id,
      parse_mode: 'markdown',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: `Open ${getDisplayType(json.type)}`,
              url: json.url,
            },
          ],
        ],
      },
    });
  };
};
