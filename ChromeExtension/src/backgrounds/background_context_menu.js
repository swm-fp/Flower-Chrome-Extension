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
      console.log(status);
      if(status){
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
          chrome.tabs.sendMessage(tabs[0].id, { message: "contextMenu" });
        });
      }else{
        alert("LOGIN!");
      }
    }
  });
});

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {

  let node = request.node;
  if (node.message == "save") {
    //console.log("before create , node :" + JSON.stringify(node));

    let result = await FlowerAPI.postMemos(node.memoList);
    console.log("memos saved:" + JSON.stringify(node.memoList));
    console.log(result);
  } else if (node.message = "delete") { 
    console.log("memos deleted:" + JSON.stringify(node.memoId));
    let result = await FlowerAPI.deleteMemos(node.memoId);
  }
});

chrome.webNavigation.onCompleted.addListener(function(details) {
  if (details.frameId == 0) {
    chrome.tabs.query({ url: details.url, active: true }, async tabs => {
      if (tabs.length == 1) {
        let nodes = await FlowerAPI.getMemos(details.url);

        // node is exists
        if (nodes.length>0) {
          //console.log("read memo : " + JSON.stringify(node));
          chrome.tabs.sendMessage(tabs[0].id, { message: "node", node: nodes });
        }
      }
    });
  }
});
