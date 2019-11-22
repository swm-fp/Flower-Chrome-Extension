/* global chrome */
import FlowerAPI from "../apis/FlowerAPI";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    //id: key,
    title: "add Memo",
    type: "normal",
    contexts: ["page"],
    onclick: async () => {
      let status = await FlowerAPI.checkLoginStatus();

      if (status) {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
          chrome.tabs.sendMessage(tabs[0].id, { message: "contextMenu" });
        });
      } else {
        if (window.confirm("You have to login.")) {
          // have to redirect url
        }
      }
    }
  });
});

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  try {
    let node = request.node;
    if (node.message === "save") {
      await FlowerAPI.postMemos(node.memoList);


      try {

        let url = await chrome.tabs.executeScript({
          code: "document.URL"
        });

        const tags = [];
        for (let tag of node.tags) {
          tags.push(tag.text);
        }
        console.log(url);
        console.log(tags);
        let response = await FlowerAPI.postTags(url[0], tags);
        console.log(response);
      }
      catch (e) {

      }

    } else if ((node.message === "delete")) {
      await FlowerAPI.deleteMemos(node.memoId);
    }
  }
  catch (e) {

  }

});

chrome.webNavigation.onCompleted.addListener(function (details) {
  if (details.frameId === 0) {
    chrome.tabs.query({ url: details.url, active: true }, async tabs => {
      if (tabs.length === 1) {
        if (!(await FlowerAPI.checkLoginStatus())) return;
        let nodes = await FlowerAPI.getMemos(details.url);
        // node is exists
        if (nodes.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, { message: "node", node: nodes });
        }
      }
    });
  }
});
