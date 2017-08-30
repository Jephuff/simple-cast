const state = require('./state');
const emitter = require('./emitter');

let intervalTimer = null;

let lastProgress;
function onProgress() {
  if (state.media) {
    const currentTime = state.media.getEstimatedTime();
    if (lastProgress !== currentTime) {
      lastProgress = currentTime;
      emitter.emit('PROGRESS', state.media.getEstimatedTime());
    }
  } else {
    lastProgress = null;
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
