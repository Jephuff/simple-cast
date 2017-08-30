const state = require('../state');

module.exports = () => {
  if (state.media) {
    state.media.pause(
      null,
      () => console.log('paused'),
      () => console.warn('failed to pause')
    );
  } else {
    console.warn('not currently playing');
  }
};
