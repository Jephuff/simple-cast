const state = require('../state');

module.exports = time => {
  if (state.media) {
    const request = new chrome.cast.media.SeekRequest();
    request.currentTime = Math.floor(time);
    state.media.seek(
      request,
      () => console.log('seeked'),
      () => console.warn('failed to seek')
    );
  } else {
    console.warn('not currently playing');
  }
};
