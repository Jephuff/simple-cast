const state = require('./state');
const emitter = require('./emitter');

let intervalTimer = null;

function onProgress() {
  if (state.media) {
    emitter.emit('PROGRESS', state.media.getEstimatedTime());
  }
}

module.exports = active => {
  onProgress();

  if (active) {
    if (!intervalTimer) {
      intervalTimer = setInterval(onProgress, 1000);
    }
  } else if (intervalTimer) {
    clearInterval(intervalTimer);
    intervalTimer = null;
  }
};
