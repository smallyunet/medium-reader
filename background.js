chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url && changeInfo.url.includes("medium.com")) {
    chrome.tabs.reload(tabId);
  }
});
