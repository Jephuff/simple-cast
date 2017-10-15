const state = require('../state');
const emitter = require('../emitter');

module.exports = active => {
  if (state.media) {
    const tracksInfoRequest = new chrome.cast.media.EditTracksInfoRequest(
      active ? [1] : []
    );
    state.media.editTracksInfo(
      tracksInfoRequest,
      () => emitter.emit('SUBTITLES_ON'),
      () => emitter.emit('SUBTITLES_OFF')
    );
  } else {
    console.warn('not currently playing');
  }
};

//
//
