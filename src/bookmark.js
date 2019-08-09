/* global chrome */
import FlowerAPI from "./FlowerAPI";

function node(id, title, isFolder, url=null, parentID=null, children=null) {
    /*
    this.id = id;
    this.parentID = parentID
    this.title = title;
    this.url = url;
    this.isFolder = (url == null);
    this.children = children;
    */
    return {"id":id, "parentId":parentID, "title":title, "url":url, "isFolder":isFolder, "children":children};
}

function addNodes(arr, nodeList){
    for(let i=0 ; i<arr.length;i++){
        let n = arr[i];
        if(!!n.children){
            nodeList.push(node(n.id, n.title, true, null, n.parentId, n.children.map(n => n.id)));
            addNodes(n.children, nodeList);
        }else if(n.parentId!=1){
            nodeList.push(node(n.id, n.title, false, n.url, n.parentId, null));
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

async function createBookmarks(){
    let data = await getEntireTree('1');
    console.log(data.nodes);
    return data.nodes;
    //FlowerAPI.createNodes(projectId, data.nodes);
}

/*
chrome.bookmarks.onCreated.addListener(function (id, n) {
    let data = new Object();
    let nodes = [];
    nodes.push(new node(n.id, n.title, n.url==null, n.url, n.parentId, null))

    data.nodes = nodes;
    FlowerAPI.createNodes(projectId, data);
    console.log("[create] "+data);
});

chrome.bookmarks.onChanged.addListener(function (id, bookmark) {
    chrome.bookmarks.get(id, function (nodes){
        let data = new Object();
        n = nodes[0];

        let nodes = [];
        nodes.push(new node(id, n.title, n.url==null, n.url, n.parentId, null))
        
        data.nodes = nodes;
        FlowerAPI.updateNode(projectId, data);
        console.log("[changed] "+data);
    });
});

chrome.bookmarks.onRemoved.addListener(function (id, bookmark) {
    let data = new Object();
    data.removedNodeId = id;
    
    FlowerAPI.deleteNode(projectId, data);
    console.log("[remove] "+data);
});

chrome.bookmarks.onMoved.addListener(function (id, bookmark) {
    chrome.bookmarks.get(id, function (nodes){
        let data = new Object();
        node = nodes[0];

        let nodes = [];
        nodes.push(new node(id, n.title, n.url==null, n.url, n.parentId, null))

        data.nodes = nodes;
        FlowerAPI.updateNode(projectId, data);
        console.log("[moved] "+jsonInfo);
    });
});
*/
const bookmark = {
    "createBookmarks" : createBookmarks,
}
export default bookmark;