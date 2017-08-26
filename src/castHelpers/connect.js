const state = require('../state');
const setSession = require('../setSession');

module.exports = () =>
  new Promise((resolve, reject) => {
    if (state.session) {
      resolve(state.session);
      return;
    }
    chrome.cast.requestSession(session => {
      setSession(session);
      resolve(session);
    }, reject);
  });
