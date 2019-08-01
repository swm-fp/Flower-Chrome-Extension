getEntireTree('1');
let nodeList = [];

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

function getEntireTree(id){
    chrome.bookmarks.getSubTree(id, function(tree){
        addNodes(tree[0].children);
        //console.log(nodeList);
        let totalInfo = new Object();
        totalInfo.link = nodeList;

        let jsonInfo = JSON.stringify(totalInfo);
        console.log(jsonInfo);
    });
}

chrome.bookmarks.onCreated.addListener(function (id, bookmark) {
    console.log("id: "+id+" id2: "+bookmark.id);
    getEntireTree('1');
});

chrome.bookmarks.onChanged.addListener(function (id, bookmark) {
    console.log("id: "+id+" id2: "+bookmark.id);
});

chrome.bookmarks.onRemoved.addListener(function (id, bookmark) {
    console.log("id: "+id+" id2: "+bookmark.id);
});

chrome.bookmarks.onMoved.addListener(function (id, bookmark) {
    console.log("id: "+id+" id2: "+bookmark.id);
});