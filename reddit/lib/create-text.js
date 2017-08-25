
/**
 * External Dependencies
 */

const debug = require('debug')('songwhip-bots:reddit:create-text');
const URL = require('url');

module.exports = (json) => {
  debug('create text', json);
  switch (json.type) {
    case 'artist': return createTextArtist(json);
    case 'album': return createTextAlbum(json);
    case 'track': return createTextTrack(json);
  }
};

function createTextArtist(artist) {
  const url = formatUrl(artist.url);
  return `[Here's a link](${url}) to "${artist.name}" on every music streaming service.`;
}

function createTextAlbum(album) {
  const url = formatUrl(album.url);
  const artistUrl = formatUrl(album.artist.url);
  return `Here's [_${album.name}_](${url}) by [_${album.artist.name}_](${artistUrl}) on every music streaming service.`;
}

function createTextTrack(track) {
  const url = formatUrl(track.url);
  const { artist, album } = track;

  if (!album) return;

  const artistUrl = formatUrl(artist.url);
  const albumUrl = formatUrl(track.album.url);

  return `[_${track.name}_](${url}) by [_${artist.name}_](${artistUrl}) is from the album [_${album.name}_](${albumUrl}).`;
}

function formatUrl(url) {
  const parsed = URL.parse(url, true);
  delete parsed.search;

  parsed.query.utm_source = 'reddit';
  parsed.query.utm_medium = 'songwhip-helper';
  parsed.query.utm_campaign = 'convert-link';

  return URL.format(parsed);
}
