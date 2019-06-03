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
const typing = require('../utils/wait-typing');
const wait = require('../../utils/wait');

/**
 * @param {import('telegraf/telegram')} bot
 */
module.exports = (bot) => {
  return async (ctx, match = [], { quiet = false } = {}) => {
    const link = match[1];
    debug('convert', { quiet });

    const { message } = ctx;
    const { chat, message_id } = message;

    if (!link) {
      return ctx.reply("Paste a music link you'd like to convert 👇");
    }

    if (!link.startsWith('http')) {
      return ctx.reply("🤔 Hmmm … that's not a link, try again", {
        reply_to_message_id: message_id
      });
    }

    if (!quiet) {
      typing(bot, message.chat.id);
    }

    const json = await convert(link);

    if (!json || Object.keys(json.links).length <= 1) {
      if (!quiet) {
        return ctx.reply("🤔 Hmmm … we can't seem to convert that link", {
          reply_to_message_id: message_id
        });
      }

      return;
    }

    return ctx.reply(createMessage(json), {
      parse_mode: 'markdown'
      // reply_markup: {
      //   inline_keyboard: [
      //     [
      //       {
      //         text: `Open ${getDisplayType(json.type)}`,
      //         url: `${
      //           json.url
      //         }?utm_source=telegram&utm_medium=songwhipbot&utm_campaign=convert-link`
      //       }
      //     ]
      //   ]
      // }
    });
  };
};
