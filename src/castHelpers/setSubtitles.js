const state = require('../state');

module.exports = active => {
  if (state.media) {
    const tracksInfoRequest = new chrome.cast.media.EditTracksInfoRequest(
      active ? [1] : []
    );
    state.media.editTracksInfo(
      tracksInfoRequest,
      () => console.log('subtitles set'),
      () => console.warn('failed to set subtitles')
    );
  } else {
    console.warn('not currently playing');
  }
};
