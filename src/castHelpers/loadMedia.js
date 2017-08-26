const state = require('../state');

function createLoadRequest(file) {
  // TODO: accept mediaInfo?
  const subtitle = new chrome.cast.media.Track(
    1,
    chrome.cast.media.TrackType.TEXT
  );

  subtitle.trackContentId = file.replace(/\.mp4$/, '.vtt'); // TODO: support more formats
  subtitle.trackContentType = 'text/vtt';
  subtitle.subtype = chrome.cast.media.TextTrackType.SUBTITLES;
  subtitle.name = 'Subtitles';
  subtitle.language = 'en-US';
  // subtitle.customData = null; // remove?

  const mediaInfo = Object.assign(new chrome.cast.media.MediaInfo(file), {
    contentType: 'video/mp4',
    textTrackStyle: new chrome.cast.media.TextTrackStyle(),
    tracks: [subtitle],
  });

  const request = new chrome.cast.media.LoadRequest(mediaInfo);
  request.activeTrackIds = [];

  return request;
}

module.exports = (file, onMediaDiscovered, onMediaError) =>
  new Promise((resolve, reject) => {
    const request = createLoadRequest(file);
    state.session.loadMedia(
      request,
      media => {
        resolve();
        onMediaDiscovered(media);
      },
      err => {
        reject(err);
        if (onMediaError) onMediaError();
      }
    );
  });
