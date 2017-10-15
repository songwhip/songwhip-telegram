
/**
 * External Dependencies
 */

const debug = require('debug')('songwhip-bots:reddit');
const Snoostorm = require('snoostorm');
const Snoowrap = require('snoowrap');

/**
 * Internal Dependencies
 */

const findLink = require('../utils/find-music-link');
const convert = require('../utils/convert-link');
const createText = require('./lib/create-text');
const store = require('./lib/store');
const reply = require('./lib/reply');

const {
  REDDIT_CLIENT_ID,
  REDDIT_CLIENT_SECRET,
  REDDIT_USERNAME,
  REDDIT_PASSWORD,
  REDDIT_STREAMS,
} = process.env;

const MAX_REQUESTS_PER_MINUTE = 60;
const subreddits = REDDIT_STREAMS.split(',');
const pollTime = 60000 / (MAX_REQUESTS_PER_MINUTE / subreddits.length) + 1000;

const reddit = new Snoostorm(new Snoowrap({
    userAgent: 'songwhip/v1',
    clientId: REDDIT_CLIENT_ID,
    clientSecret: REDDIT_CLIENT_SECRET,
    username: REDDIT_USERNAME,
    password: REDDIT_PASSWORD,
}));

subreddits.forEach((subreddit) => {
  reddit.SubmissionStream({
    subreddit,
    results: 5,
    pollTime,
  }).on('submission', onSubmission);
});

async function onSubmission(post) {
  debug(`new submission by ${post.author.name}`, post);
  const link = findLink(post.url);

  if (!link) {
    debug('no supported link found');
    return;
  }

  const hasReplied = await store.hasReplied(post.id);
  if (hasReplied) {
    debug('abort: replied already', post.id);
    return;
  }

  const json = await convert(link);

  if (!json || Object.keys(json.links).length < 3) {
    debug('not enough matching links found: "%s"', link);
    return;
  }

  await store.setReplied(post.id);
  reply(post, createText(json));
}

debug('listening to subreddits: ', subreddits);
