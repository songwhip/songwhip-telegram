
/**
 * External Dependencies
 */

const debug = require('debug')('songwhip-bots:telegram:commands:inline');

/**
 * Internal Dependencies
 */

const createMessage = require('../utils/create-message');
const convert = require('../../utils/convert-link');

module.exports = (bot) => {
  return async ({ id, query }) => {
    const link = query;
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

    // const results = [
    //   {
    //     id: '287878416582808857/' + Date.now(),
    //     type: 'photo',
    //     title: json.name,
    //     description: `DESCFEC: Listen to "${json.name}" on any music service`,
    //     photo_url: json.images[0],
    //     thumb_url: json.images[0],
    //     reply_markup: {
    //       inline_keyboard: [
    //         [
    //           {
    //             text: 'Listen Now',
    //             url: json.url,
    //           },
    //         ],
    //       ],
    //     },
    //   },
    // ];

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
          message_text: createMessage(json),
        },

        reply_markup: {
          inline_keyboard: [
            createKeyboards(json),
          ],
        },

      },
    ];

    bot.answerInlineQuery(id, results);
  };
};

function createKeyboards(json) {
  let result = [
    {
      text: 'Listen Now',
      url: json.url,
    },
  ];

  return result;
}
