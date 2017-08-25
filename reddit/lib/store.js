const store = require('../../utils/store');

const NAMESPACE = `reddit-replies`;

exports.setReplied = (key) => {
  return store.set(`${NAMESPACE}:${key}`, 1);
};

exports.hasReplied = (key) => {
  return store.exists(`${NAMESPACE}:${key}`);
};
