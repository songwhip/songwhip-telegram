const debug = require('debug')('songwhip-bots:utils:convert-link');
const fetch = require('node-fetch');

const { SONGWHIP_WEB_URL } = process.env;

module.exports = async url => {
  debug('get', url);
  const response = await fetch(SONGWHIP_WEB_URL, {
    method: 'POST',
    body: url
  });

  if (!response.ok) return;
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch (e) {
    debug('error parsing json', text);
  }
};
