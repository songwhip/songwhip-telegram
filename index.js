const debug = require('debug')('songwhip-telegram');
// const TelegramBot = require('./node-telegram-bot-api/src/telegram');
const fetch = require('node-fetch');
const micro = require('micro');
const http = require('http');

const findMusicLink = require('./utils/find-music-link');
const Commands = require('./commands');

const { TELEGRAM_BOT_TOKEN } = process.env;

const NOW_URL = 'https://songwhip-telegram.wilsonpage.now.sh';
const secretPath = `/bot${TELEGRAM_BOT_TOKEN}`;
const webhookUrl = `${NOW_URL}${secretPath}`;

const Telegraf = require('telegraf').default;
const Telegram = require('telegraf/telegram');

const bot = new Telegraf(TELEGRAM_BOT_TOKEN, {
  telegram: {
    // sets all messages to be sent as separate http requests
    // instead of sending them in the inbound http response
    webhookReply: false
  }
});

const telegram = new Telegram(TELEGRAM_BOT_TOKEN);
const commands = Commands(telegram);

bot.start(commands.start);
bot.help(commands.help);

bot.command('convert', commands.convert);
bot.on('inline_query', commands.inline);

bot.use((ctx, next) => {
  debug('on text', ctx.message);
  const { text } = ctx.message;
  const link = findMusicLink(text);

  if (!link) {
    debug('no link found');
    return next();
  }

  return commands.convert(ctx, [text, link], { quiet: false });
});

bot.telegram.setWebhook(webhookUrl);

bot.catch((error) => {
  console.log('ERROR', error);
});

micro
  .default(async (req, res) => {
    if (req.method === 'POST') {
      // protect endpoint using secret path
      if (!req.url.startsWith(secretPath)) {
        res.statusCode = 403;
        res.end('unauthorized');
        return;
      }

      const json = await micro.json(req);
      await bot.handleUpdate(json, res);

      // respond otherwise inbound request times-out
      return 'ok';
    }

    return telegram.getWebhookInfo();
  })
  .listen();
