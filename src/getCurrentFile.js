const get = require('lodash.get');
const state = require('./state');

module.exports = () => get(state.media, 'media.contentId');
