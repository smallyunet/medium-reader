chrome.tabs.query({ active: true }).then((tabs) => {
  url = tabs[0].url;
  url = new URL(url);
  reUrl = "https://scribe.rip" + url.pathname + url.search + url.hash;
  chrome.tabs.update({ url: reUrl });
});
