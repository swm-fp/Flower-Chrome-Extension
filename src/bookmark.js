/* global chrome */
import FlowerAPI from "./FlowerAPI";

function node(id, title, isFolder, url=null, parentID=null, children=null) {
    return {"nodeId":id, "parentId":parentID, "title":title, "url":url||null, "isFolder":isFolder, "children":children};
}

function addNodes(arr, nodeList){
    for(let i=0 ; i<arr.length;i++){
        let n = arr[i];
        if(!!n.children){
            nodeList.push(node(n.id, n.title, true, null, n.parentId, n.children.map(n => n.id)));
            addNodes(n.children, nodeList);
        }else if(n.parentId!=1){
            nodeList.push(node(n.id, n.title, false, n.url, n.parentId, []));
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
    data.createOne = false;
    return data.nodes;
    //FlowerAPI.createNodes(projectId, data.nodes);
}


chrome.bookmarks.onCreated.addListener(async function (id, n) {
    let data = {"nodes": [node(n.id, n.title, n.url==null, n.url, n.parentId, null)]}
    data.createOne = true;
    await FlowerAPI.createNodes("1", data);
    console.log(data);
});

async function getBookmarkInfo(id){
    node = await chrome.bookmarks.get(id);
    return {
        nodes:[
            {
                "nodeId":id, 
                "title":node[0].title, 
                "isFolder":node[0].url==null, 
                "url":node[0].url||null, 
                "parentId":node[0].parentId, 
                "children": []
            }
        ]
    };
}

chrome.bookmarks.onChanged.addListener(async function (id, bookmark) {
    let data = await getBookmarkInfo(id);
    data.moved = false;
    console.log(data);
    await FlowerAPI.updateNode("1", data);
});

chrome.bookmarks.onRemoved.addListener(async function (id, bookmark) {
    let data = {"nodes":[{"id":id}]}    
    await FlowerAPI.deleteNode("1", data);
    console.log(data);
});

chrome.bookmarks.onMoved.addListener(async function (id, bookmark) {
    let data = await getBookmarkInfo(id);
    data.moved = true;
    console.log(data);
    await FlowerAPI.updateNode("1", data);
});

const bookmark = {
    "createBookmarks" : createBookmarks,
}
export default bookmark;