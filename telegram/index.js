
/**
 * External Dependencies
 */

const debug = require('debug')('songwhip-bots:telegram');
const TelegramBot = require('node-telegram-bot-api');

/**
 * Internal Dependencies
 */

const findMusicLink = require('../utils/find-music-link');

/**
 * Locals
 */

const { TELEGRAM_BOT_TOKEN } = process.env;
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });
const commands = require('./commands')(bot);

bot.onText(/\/convert ?(.+)?/, commands.convert);
bot.onText(/\/start/, commands.start);
bot.onText(/\/help/, commands.help);
bot.on('inline_query', commands.inline);

bot.on('message', (message) => {
  debug('on message', message);
  const { text } = message;
  const link = findMusicLink(text);
  if (link) commands.convert(message, [ text, link ], { quiet: true });
});

debug('connected to bot "%s"', TELEGRAM_BOT_TOKEN);
