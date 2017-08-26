const get = require('lodash.get');

const init = require('./castHelpers/init');
const stop = require('./castHelpers/stop');
const seek = require('./castHelpers/seek');
const toggleSubtitles = require('./castHelpers/toggleSubtitles');
const pause = require('./castHelpers/pause');
const play = require('./castHelpers/play');

const emitter = require('./emitter');
const state = require('./state');
const setSession = require('./setSession');
const setMedia = require('./setMedia');
const getCurrentFile = require('./getCurrentFile');

let available = false;
let castSupported = null;

init(
  session => {
    setSession(session);
    if (state.session.media.length !== 0) {
      setMedia(state.session.media[0]);
    }
  },
  receiverState => {
    available = receiverState === chrome.cast.ReceiverAvailability.AVAILABLE;
  }
).then(
  () => {
    castSupported = true;
  },
  () => {
    castSupported = false;
  }
);

module.exports = Object.create(emitter, {
  duration: { get: () => get(state.media, 'media.duration') }, // TODO: make event?
  file: { get: getCurrentFile },
  play: { value: play },
  pause: { value: pause },
  seek: { value: seek },
  stop: { value: stop },
  toggleSubtitles: { value: toggleSubtitles },
});
