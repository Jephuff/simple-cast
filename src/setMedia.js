const get = require('lodash.get');

const state = require('./state');
const emitter = require('./emitter');
const monitorProgress = require('./monitorProgress');
const getCurrentFile = require('./getCurrentFile');
const getDuration = require('./getDuration');

let lastDuration;
function onMediaStatusUpdate() {
  const playerState = state.media.playerState;
  const currentDuration = getDuration();
  if (currentDuration !== lastDuration) {
    lastDuration = currentDuration;
    emitter.emit('DURATION', currentDuration);
  }

  emitter.emit(playerState);

  // TODO: if an event listener is added, should start monitoring
  monitorProgress(
    playerState === 'PLAYING' && emitter.listeners('PROGRESS', true)
  );

  if (playerState === 'IDLE' && get(state.media, 'idleReason') === 'FINISHED') {
    emitter.emit('FINISHED', getCurrentFile());
  }
}

module.exports = media => {
  state.media = media;
  state.media.addUpdateListener(onMediaStatusUpdate);
  onMediaStatusUpdate();
};
