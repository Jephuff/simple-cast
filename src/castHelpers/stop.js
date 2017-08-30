const state = require('../state');

module.exports = () => {
  if (state.media) {
    state.media.stop(
      null,
      () => console.log('stopped'),
      () => console.warn('failed to stop')
    );
  } else {
    console.warn('not currently playing');
  }
};
