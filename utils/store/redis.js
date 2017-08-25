
/**
 * External Dependencies
 */

const debug = require('debug')('songwhip-bots:store:redis');
const redis = require('redis');

const {
  REDIS_HOST,
  REDIS_PORT,
} = process.env;

const config = {
  host: REDIS_HOST,
  port: REDIS_PORT,
};

const client = redis.createClient(config);

client.on('ready', () => debug('connected', config));

module.exports = client;
