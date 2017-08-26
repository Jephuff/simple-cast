const state = require('./state');
const emitter = require('./emitter');
const monitorProgress = require('./monitorProgress');

module.exports = session => {
  state.session = session;
  if (session) {
    state.session.addUpdateListener(() => {
      if (state.session.status === chrome.cast.SessionStatus.STOPPED) {
        state.session = null;
        emitter.emit('DISCONNECT');
        monitorProgress(false);
      }
    });
  }
};
