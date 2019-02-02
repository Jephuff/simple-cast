import loadScript from "load-script";

export default () => {
  return new Promise((resolve, reject) => {
    window.__onGCastApiAvailable = isAvailable => {
      if (isAvailable) {
        resolve();
      } else {
        reject(new Error("cast api not available"));
      }
    };

    const castSenderScriptSrc =
      "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";

    if (!document.querySelector(`script[src="${castSenderScriptSrc}"]`)) {
      loadScript(castSenderScriptSrc, err => {
        if (err) reject(err);
      });
    }
  });
};
