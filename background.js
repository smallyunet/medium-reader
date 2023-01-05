chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  let r1 = changeInfo.url
  let r2 = changeInfo.url.includes("medium.com")
  let r3 = !changeInfo.url.includes("search?")
  if (r1 && r2 && r3) {
    chrome.tabs.reload(tabId);
  }
});
