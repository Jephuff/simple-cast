const state = require('../state');

module.exports = () =>
  new Promise((resolve, reject) => {
    if (state.media) {
      state.media.stop(null, resolve, reject);
    } else {
      reject('not currently playing');
    }
  });
