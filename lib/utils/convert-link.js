const debug = require('debug')('songwhip-bots:utils:convert-link');
const fetch = require('node-fetch');

const SONGWHIP_TELEGRAM_USER_AGENT = process.env.SONGWHIP_TELEGRAM_USER_AGENT;
const SONGWHIP_WEB_URL = process.env.SONGWHIP_WEB_URL;

module.exports = async (url) => {
  debug('get', url);
  const response = await fetch(`${SONGWHIP_WEB_URL}?utm_source=telegram`, {
    method: 'POST',
    body: url,

    headers: {
      'user-agent': SONGWHIP_TELEGRAM_USER_AGENT,
    },
  });

  if (!response.ok) return;
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch (e) {
    debug('error parsing json', text);
  }
};
