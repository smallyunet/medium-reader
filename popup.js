chrome.tabs.queryActiveTab().then((tabs) => {
  const tab = tabs[0];
  let url = new URL(tab.url);
  let reUrl = "https://scribe.rip" + url.pathname + url.search + url.hash;
  chrome.tabs.update(tab.id, { url: reUrl });
});
