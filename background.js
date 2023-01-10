chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  let rs = [
    "medium.com", 
    "javascript.plainenglish.io",
    "medium.datadriveninvestor.com",
  ];
  if (changeInfo.url && !changeInfo.url.includes("search?")) {
    for (let i = 0; i < rs.length; i++) {
      if (changeInfo.url.includes(rs[i])) {
        chrome.tabs.reload(tabId);
      }
    }
  }
});
