const rs = [
  "medium.com",
  "javascript.plainenglish.io",
  "medium.datadriveninvestor.com",
];

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  console.log('onUpdated event triggered');
  console.log('URL:', changeInfo.url);
  if (changeInfo.url && !changeInfo.url.includes("search?")) {
    const url = new URL(changeInfo.url);
    console.log('Hostname:', url.hostname);
    console.log('Pathname:', url.pathname);
    const hostnameMatch = rs.some((r) => url.hostname.includes(r));
    console.log('Hostname match:', hostnameMatch);
    let pathnameMatch = url.pathname.split('/').length > 2;
    pathnameMatch = pathnameMatch || url.pathname.includes('/@');
    console.log('Pathname match:', pathnameMatch);
    if (hostnameMatch && pathnameMatch) {
      console.log('Condition met');
      chrome.tabs.reload(tabId);
    }
  }
});
