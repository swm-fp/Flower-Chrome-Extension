//getEntireTree('1');
let nodeList = [];
getEntireTree('1');

function node(id, title, is_folder, url=null, parentID=null, children=null) {
    this.id = id;
    this.parentID = parentID
    this.title = title;
    this.url = url;
    this.isFolder = (url == null);
    this.children = children;
}

function addNodes(arr){
    for(let i=0 ; i<arr.length;i++){
        n = arr[i];
        if(!!n.children){
            nodeList.push(new node(n.id, n.title, true, null, n.parentId, n.children.map(n => n.id)));
            addNodes(n.children);
        }else if(n.parentId!=1){
            nodeList.push(new node(n.id, n.title, false, n.url, n.parentId, null));
        }
    }
}

let jsonInfo;

function getEntireTree(id){
    chrome.bookmarks.getSubTree(id, function(tree){
        /*
        addNodes(tree[0].children);
        //console.log(tree);
        let totalInfo = new Object();
        totalInfo.link = nodeList;

        jsonInfo = JSON.stringify(totalInfo);
        */

        jsonInfo = JSON.stringify(tree);
        console.log(jsonInfo);
    });
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("background");
        if (request.cmd == "any command") {
            sendResponse({
                result: "any response from background"
            });
        } else {
            sendResponse(jsonInfo);
        }
        // Note: Returning true is required here!
        //  ref: http://stackoverflow.com/questions/20077487/chrome-extension-message-passing-response-not-sent
        return true;
    });

/*
1. remove: 
{"id" : id}

2. create:
{"id":,"parentID":,"title":,"url":,isFolder:}


3. update:
{"id":, "parentID":, "title":, "url":, "isFolder":}
*/

chrome.bookmarks.onCreated.addListener(function (id, bookmark) {
    let data = new Object();
    data.id = bookmark.id;
    data.parentID = bookmark.parentId;
    data.title = bookmark.title;
    data.url = bookmark.url || null;
    data.isFolder = (data.url == null);

    let jsonInfo = JSON.stringify(data);
    console.log("[create] "+jsonInfo);
    //createAPI("data");
});

chrome.bookmarks.onChanged.addListener(function (id, bookmark) {
    chrome.bookmarks.get(id, function (nodes){
        let data = new Object();
        node = nodes[0];
        data.id = id;
        data.parentID = node.parentId;
        data.title = node.title;
        data.url = node.url;
        data.isFolder = (data.url == null);

        let jsonInfo = JSON.stringify(data);
        console.log("[changed] "+jsonInfo);
    });
});

chrome.bookmarks.onRemoved.addListener(function (id, bookmark) {
    let data = new Object();
    data.id = id;
    
    let jsonInfo = JSON.stringify(data);
    console.log("[remove] "+jsonInfo);
});

chrome.bookmarks.onMoved.addListener(function (id, bookmark) {
    chrome.bookmarks.get(id, function (nodes){
        let data = new Object();
        node = nodes[0];
        data.id = id;
        data.parentID = node.parentId;
        data.title = node.title;
        data.url = node.url;
        data.isFolder = (data.url == null);

        let jsonInfo = JSON.stringify(data);
        console.log("[moved] "+jsonInfo);
    });
});