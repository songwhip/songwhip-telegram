
/**
 * External Dependencies
 */

const debug = require('debug')('songwhip-bots:facebook');
const bodyParser = require('body-parser');
const express = require('express');

/**
 * Internal Dependencies
 */

const convert = require('../utils/convert-link');

/**
 * Locals
 */

const app = module.exports = express();

app.get('/', bodyParser.json(), async (req, res) => {
  const { sourceUrl } = req.query;
  const json = await convert(sourceUrl);

  if (!json) {
    res.json({
      messages: [
        { text: '😯 We couldn\'t convert that link, please try another one' },
      ],
    });

    return;
  }

  const url = `${json.url}?utm_source=facebook&utm_medium=messenger-bot&utm_campaign=convert-link`;

  res.json({
    messages: [
      {
        attachment:{
          type:"template",
          payload: {
            template_type:"generic",
            elements:[
              {
                title: json.name,
                image_url: json.images[0],
                subtitle: 'Listen on any music service',
                buttons: [
                  {
                    type: 'web_url',
                    url,
                    title: 'Listen',
                  },
                  {
                    type: 'element_share',
                  },
                ],
              },
            ],
          },
        },
      },
    ],
  });
});
