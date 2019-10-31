/* global chrome */
import FlowerAPI from "../apis/FlowerAPI";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    //id: key,
    title: "add Memo",
    type: "normal",
    contexts: ["page"],
    onclick: () => {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { message: "contextMenu" });
      });
    }
  });
});

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  let node = request.node;
  //console.log("before create , node :" + JSON.stringify(node));

  let result = await FlowerAPI.postMemos("", node);
  console.log(result);
});

chrome.webNavigation.onCompleted.addListener(function(details) {
  if (details.frameId == 0) {
    chrome.tabs.query({ url: details.url, active: true }, async tabs => {
      if (tabs.length == 1) {
        let nodes = await FlowerAPI.getMemos("", details.url);

        console.log(nodes);

        // node is exists
        if (nodes.length>0) {
          //console.log("read memo : " + JSON.stringify(node));
          chrome.tabs.sendMessage(tabs[0].id, { message: "node", node: nodes });
        }
      }
    });
  }
});
