const wait = require('../../utils/wait');

const ACTION_TYPING = 'typing';

module.exports = async (bot, chatId, ms = 100) => {
  await bot.sendChatAction(chatId, ACTION_TYPING);
  await wait(ms);
};
