#!/bin/bash

domains=(
"medium.com"
"javascript.plainenglish.io"
"medium.datadriveninvestor.com"
"coinsbench.com"
"entrepreneurshandbook.co"
"writingcooperative.com"
)

cat > background.js <<EOF
const rs = [
$(printf '  "%s",\n' "${domains[@]}" | sed '$ s/,$//')
];

let logEnabled = true; 

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
    const hostnameMatch = rs.some((r) => url.hostname.includes(r));
    log('Hostname match:', hostnameMatch);
    let pathnameMatch = url.pathname.split('/').length > 2;
    pathnameMatch = pathnameMatch || url.pathname.includes('/@');
    log('Pathname match:', pathnameMatch);
    if (hostnameMatch && pathnameMatch) {
      log('Condition met');
      chrome.tabs.reload(tabId);
    }
  }
});
EOF

# 生成manifest.json文件内容
cat > manifest.json <<EOF
{
  "name": "Medium Reader",
  "version": "0.1",
  "manifest_version": 3,
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "js": ["scripts/content.js"],
      "matches": [
$(printf '        "https://*.%s/*",\n' "${domains[@]}" | sed '$ s/,$//')
      ],
      "run_at": "document_end"
    }
  ],
  "host_permissions": [
$(printf '    "https://*.%s/*",\n' "${domains[@]}" | sed '$ s/,$//')
  ],
  "permissions": [
    "tabs",
    "activeTab",
    "webNavigation"
  ],
  "action": {
    "default_popup": "popup.html"
  }
}
EOF

echo "finished!"
