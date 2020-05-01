const debug = require('debug')('songwhip-telegram/commands/inline');

const createMessage = require('../utils/create-message');
const convert = require('../utils/convert-link');

module.exports = (bot) => {
  return async ({ answerInlineQuery, inlineQuery }) => {
    const link = inlineQuery.query;
    debug('query', link);

    if (!link.startsWith('http')) {
      debug('not a link');
      return;
    }

    const json = await convert(link);

    if (!json) {
      debug('conversion failed for "%s"', link);
      return;
    }

    const results = [
      {
        id: '287878416582808857/' + Date.now(),
        type: 'article',
        title: json.name,
        description: `Tap to continue`,
        // url: json.url,

        thumb_url: json.images[0],
        // hide_url: true,

        input_message_content: {
          parse_mode: 'markdown',
          message_text: createMessage(json)
        }

        // reply_markup: {
        //   inline_keyboard: [createKeyboards(json)]
        // }
      }
    ];

    return answerInlineQuery(results);
  };
};

function createKeyboards(json) {
  let result = [
    {
      text: 'Listen Now',
      url: json.url
    }
  ];

  return result;
}
