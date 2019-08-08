/* global chrome */

function node(id, title, is_folder, url=null, parentID=null, children=null) {
    this.id = id;
    this.parentID = parentID
    this.title = title;
    this.url = url;
    this.isFolder = (url == null);
    this.children = children;
}

function addNodes(arr, nodeList){
    for(let i=0 ; i<arr.length;i++){
        let n = arr[i];
        if(!!n.children){
            nodeList.push(new node(n.id, n.title, true, null, n.parentId, n.children.map(n => n.id)));
            addNodes(n.children, nodeList);
        }else if(n.parentId!=1){
            nodeList.push(new node(n.id, n.title, false, n.url, n.parentId, null));
        }
    }
    return nodeList;
}

async function getEntireTree(id){
    let nodes = [];
    let data = new Object();

    const tree = await chrome.bookmarks.getSubTree(id);
    nodes = await addNodes(tree[0].children, nodes);

    data.nodes = nodes;
    return data;
}

const bookmark = {
    "getEntireTree" : getEntireTree,
}
export default bookmark;

/*
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
*/