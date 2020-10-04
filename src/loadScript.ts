const castSenderScriptSrc =
  "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";

export default () => {
  return new Promise((resolve, reject) => {
    window.__onGCastApiAvailable = (isAvailable) => {
      if (isAvailable) {
        resolve();
      } else {
        reject(new Error("cast api not available"));
      }
    };

    if (!document.querySelector(`script[src="${castSenderScriptSrc}"]`)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = castSenderScriptSrc;

      script.onload = () => {
        script.onerror = script.onload = null;
      };

      script.onerror = () => {
        script.onerror = script.onload = null;
        reject(new Error(`Failed to load ${castSenderScriptSrc}`));
      };

      const node = document.head || document.getElementsByTagName("head")[0];
      node.appendChild(script);
    }
  });
};
