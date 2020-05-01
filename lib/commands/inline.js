const debug = require('debug')('songwhip-telegram/commands/inline');

const createMessage = require('../utils/create-message');
const convert = require('../utils/convert-link');

module.exports = (bot) => {
  return async ({ answerInlineQuery, inlineQuery }) => {

    //Picture (server side error or convert problem)
    const sw_holder = 'https://pbs.twimg.com/profile_images/1159426910541242369/rxpC-VPz_400x400.jpg';

    const link = inlineQuery.query;
    debug('query', link);

    if (!link.startsWith('http')) {
      debug('not a link');
      return;
    }

    const json = await convert(link);

    if (!json) {
      debug('conversion failed for "%s"', link);
      const results = [
        {
          id: '287878416582808857/' + Date.now(),
          type: 'article',
          title: 'Oops..',
          description: `Convert error 😥`,
          url: link,
          thumb_url: sw_holder,
          input_message_content: {
            parse_mode: 'markdown',
            message_text: createMessage(json)
          }
        }
      ];
    } else {
      const results = [
        {
          id: '287878416582808857/' + Date.now(),
          type: 'article',
          title: json.name,
          description: `Tap to continue`,
          url: json.url,

          thumb_url: (json.image != null ? json.image : 'https://pbs.twimg.com/profile_images/1159426910541242369/rxpC-VPz_400x400.jpg'),
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
    }


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
