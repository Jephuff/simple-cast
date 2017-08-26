const state = require('../state');

module.exports = time =>
  new Promise((resolve, reject) => {
    if (state.media) {
      const request = new chrome.cast.media.SeekRequest();
      request.currentTime = Math.floor(time);
      state.media.seek(request, resolve, reject);
    } else {
      reject('not currently playing');
    }
  });
