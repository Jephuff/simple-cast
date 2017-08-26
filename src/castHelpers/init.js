const get = require('lodash.get');
const loadScript = require('load-script');

const castSenderScriptSrc =
  'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js';

const MAX_INIT_TRIES = 5;

function addCastScript() {
  return new Promise((resolve, reject) => {
    if (!document.querySelector(`script[src="${castSenderScriptSrc}"]`)) {
      loadScript(castSenderScriptSrc, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
}

module.exports = (sessionListener, receiverListener) => {
  let initRetries = 0;

  return addCastScript()
    .then(function init() {
      return new Promise((resolve, reject) => {
        initRetries += 1;
        if (get(window, 'chrome.cast.isAvailable')) {
          resolve(true);
        } else if (initRetries < MAX_INIT_TRIES) {
          setTimeout(() => resolve(init()), 1000);
        } else {
          reject();
        }
      });
    })
    .then(
      () =>
        new Promise((resolve, reject) => {
          const sessionRequest = new chrome.cast.SessionRequest(
            chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
          );
          chrome.cast.initialize(
            new chrome.cast.ApiConfig(
              sessionRequest,
              sessionListener,
              receiverListener
            ),
            resolve,
            reject
          );
        })
    );
};
