let logEnabled = true; // 日志开关

function log(...args) {
  if (logEnabled) {
    console.log(...args);
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  log('onUpdated event triggered');
  log('URL:', changeInfo.url);
  if (changeInfo.url && !changeInfo.url.includes("search?")) {
    const url = new URL(changeInfo.url);
    log('Hostname:', url.hostname);
    log('Pathname:', url.pathname);
    let pathnameMatch = url.pathname.split('/').length > 2;
    pathnameMatch = pathnameMatch || url.pathname.includes('/@');
    log('Pathname match:', pathnameMatch);
    if (pathnameMatch) {
      log('Condition met');
      chrome.tabs.reload(tabId);
    }
  }
});
