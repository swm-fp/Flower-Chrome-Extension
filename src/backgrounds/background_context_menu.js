/* global chrome */
import FlowerAPI from "../FlowerAPI";
let node = {};

 chrome.runtime.onInstalled.addListener( ()=> {
    chrome.contextMenus.create({
        //id: key,
        title: "add Memo",
        type: 'normal',
        contexts: ['page'],
        onclick:()=>{
          chrome.tabs.query({active: true, currentWindow: true}, (tabs)=> {
            chrome.tabs.sendMessage(tabs[0].id, {message : "contextMenu"});
          })
        }
        })
      });
 
  chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
     let memoList = request.memoList;
     let requestUrl = sender.url;

     node["requestUrl"] = requestUrl;
     node["memoList"] = memoList;

     let nodesArray = [];
     nodesArray.push(node);

     let nodesObject = {
       "nodes" : nodesArray
     };
     console.log("before create , node :" + JSON.stringify(node));
     

     (async ()=>{
      let result =await FlowerAPI.createNodes("unknown", nodesObject);
      console.log("create memo : " + JSON.stringify(result));
     })();
     
   });


   chrome.webNavigation.onCompleted.addListener(function(details) {

    if(details.frameId==0){
      (async ()=>{
        node = await FlowerAPI.readNode(details.url);
        console.log("read memo : " + JSON.stringify(node));
        
        

        if(node.memoList){
          chrome.tabs.query({active: true, currentWindow: true}, (tabs)=> {
            chrome.tabs.sendMessage(tabs[0].id, {message : "memoList",memoList : node.memoList});
          })
        }
      })();
      }
    

    /*
    if(details.frameId === 0) {
        // Fires only when details.url === currentTab.url
        chrome.tabs.get(details.tabId, function(tab) {
            if(tab.url === details.url) {

              
            }
        });
    }
    */

});


   