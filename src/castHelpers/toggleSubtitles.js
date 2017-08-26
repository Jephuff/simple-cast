const state = require('../state');

module.exports = active =>
  new Promise((resolve, reject) => {
    if (state.media) {
      const tracksInfoRequest = new chrome.cast.media.EditTracksInfoRequest(
        active ? [1] : []
      );
      state.media.editTracksInfo(tracksInfoRequest, resolve, reject);
    } else {
      reject('not currently playing');
    }
  });
