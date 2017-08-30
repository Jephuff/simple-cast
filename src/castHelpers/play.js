const state = require('../state');
const getCurrentFile = require('../getCurrentFile');
const setMedia = require('../setMedia');
const connect = require('./connect');
const loadMedia = require('./loadMedia');
const seek = require('./seek');

module.exports = (file, time) => {
  let currentFile = getCurrentFile();
  let playFile = file;
  let playFrom = time;
  if (!state.session && currentFile && (!file || file === currentFile)) {
    playFile = currentFile;
    currentFile = null;
    playFrom = time || Math.max(state.media.getEstimatedTime() - 10, 0);
  }

  connect()
    .then(() => {
      if (playFile && currentFile !== playFile) {
        return loadMedia(playFile, setMedia);
      } else if (state.media) {
        return new Promise((resolve, reject) => {
          state.media.play(null, resolve, reject);
        });
      }
      return Promise.resolve();
    })
    .then(() => playFrom && seek(playFrom));
};
