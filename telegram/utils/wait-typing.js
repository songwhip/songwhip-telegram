
const wait = require('../../utils/wait');

module.exports = async (bot, chatId, ms) => {
  await bot.sendChatAction(chatId, 'typing');
  await wait(ms);
};
