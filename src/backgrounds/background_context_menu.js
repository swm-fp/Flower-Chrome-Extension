/* global chrome */
import FlowerAPI from "../FlowerAPI";

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
    let node = request.node;
    let requestUrl = sender.url;
    
    node["requestUrl"] = requestUrl;
    
    let nodesArray = [];
    nodesArray.push(node);
    
    let nodesObject = {
      "nodes" : nodesArray
    };
    console.log("before create , node :" + JSON.stringify(node));
    
    
    (async ()=>{
      let projectId;
      if(node["projectId"]){
        projectId = node["projectId"];
      }
      else{
        projectId = "unknown";
      }

      let result =await FlowerAPI.createNodes(projectId, nodesObject);
      console.log("create memo : " + JSON.stringify(result));
    })();
    
  });
  
  
  chrome.webNavigation.onCompleted.addListener(function(details) {
    
    if(details.frameId==0){
      (async ()=>{
        let node = await FlowerAPI.readNode(details.url);
        console.log("read memo : " + JSON.stringify(node));
        chrome.tabs.query({active: true, currentWindow: true}, (tabs)=> {
          chrome.tabs.sendMessage(tabs[0].id, {"message" : "node","node" : node});
        })
      })();
    }
  });
  
  
  