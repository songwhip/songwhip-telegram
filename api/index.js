const debug = require('debug')('songwhip-telegram');
const Telegraf = require('telegraf').default;
const Telegram = require('telegraf/telegram');

const findMusicLink = require('../lib/utils/find-music-link');
const Commands = require('../lib/commands');

const { TELEGRAM_BOT_TOKEN, SONGWHIP_TELEGRAM_URL } = process.env;

const secretPath = `/bot${TELEGRAM_BOT_TOKEN}`;
const webhookUrl = `${SONGWHIP_TELEGRAM_URL}${secretPath}`;

debug('starting', SONGWHIP_TELEGRAM_URL);

const bot = new Telegraf(TELEGRAM_BOT_TOKEN, {
  telegram: {
    // sets all messages to be sent as separate http requests
    // instead of sending them in the inbound http response
    webhookReply: false,
  },
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

bot.catch((error) => {
  console.error(error);
});

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    // protect endpoint using secret path
    if (!req.url.startsWith(secretPath)) {
      res.statusCode = 403;
      res.end('unauthorized');
      return;
    }

    await bot.handleUpdate(req.body, res);

    // respond otherwise inbound request times-out
    return res.end('ok');
  }

  // hit this url manually to establish the connection between
  // telegram and this service. This only needs to be done once,
  // (or whenever the service url changes)
  if (req.url === '/set-webhook') {
    const json = await bot.telegram.setWebhook(webhookUrl);
    res.json(json);
    return;
  }

  // return some info about the state of the webhook
  const webhookInfo = await telegram.getWebhookInfo();

  res.json(webhookInfo);
};
