/* global chrome */
chrome.browserAction.onClicked.addListener(function() {
  console.log("hello");
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, "toggle");
  });
});
