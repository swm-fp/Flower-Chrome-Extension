/* global chrome */
import FlowerAPI from "./FlowerAPI";

async function node(id, title, isFolder, url = null, parentID = null, children = null) {
    return {
        nodeId: id,
        parentId: parentID,
        title: title,
        url: url || "null",
        isFolder: isFolder,
        children: children
    };
}

async function addNodes(arr, nodeList){
    for(let i=0 ; i<arr.length;i++){
        let n = arr[i];
        if(!!n.children){
            await nodeList.push(await node(n.id, n.title, true, null, n.parentId, n.children.map(n => n.id)));
            await addNodes(n.children, nodeList);
        }else if(n.parentId!=1){
            await nodeList.push(await node(n.id, n.title, false, n.url, n.parentId, []));
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
    data.createOne = false;
    //let result = await FlowerAPI.createNodes("sampleProject", data);
    return data.nodes;
}


chrome.bookmarks.onCreated.addListener(async function (id, n) {
    let data = {"nodes": [await node(n.id, n.title, n.url==null, n.url, n.parentId, [])]}
    data.createOne = true;
    await FlowerAPI.createNodes("sampleProject", data);
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
                "url":node[0].url||"null", 
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
    await FlowerAPI.updateNode("sampleProject", data);
});

chrome.bookmarks.onRemoved.addListener(async function (id, bookmark) {
    let data = {"nodes":[{"nodeId":id}]};    
    await FlowerAPI.deleteNode("sampleProject", data);
    console.log(data);
});

chrome.bookmarks.onMoved.addListener(async function (id, bookmark) {
    let data = await getBookmarkInfo(id);
    data.moved = true;
    console.log(data);
    await FlowerAPI.updateNode("sampleProject", data);
});

const bookmark = {
    "createBookmarks" : createBookmarks,
}
export default bookmark;