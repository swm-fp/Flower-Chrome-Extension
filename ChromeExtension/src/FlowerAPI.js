/* global chrome */
import axios from "axios";
import "./chrome-extension-async";
async function getUserInfo() {
  return chrome.storage.local.get(["token", "id"]);
}

async function sendRequest(url, method, data = {}, queryString = {}) {
  let userInfo = await getUserInfo();
  let token = userInfo["token"];
  let userId = userInfo["id"];

  data["userId"] = userId;
  let body = JSON.stringify(data);

  let request = {
    url: url,
    method: method,
    headers: {
      Authorization: token
    },
    data: body,

    params: queryString
  };
  console.log(request);

  let response = await axios(request);
  return response;
}

async function getSampleNodes() {
  let url = "https://2i0zlhluc1.execute-api.ap-northeast-2.amazonaws.com/beta";
  let method = "get";
  let response = await sendRequest(url, method);
  console.log(response.data.data);
  return response.data.data;
}

async function readNodes(projectId) {
  let userInfo = await getUserInfo();
  let userId = userInfo["id"];
  let url =
    "https://nl9xif1q55.execute-api.ap-northeast-2.amazonaws.com/beta/users/" +
    userId +
    "/projects/" +
    projectId +
    "/nodes";
  let method = "get";
  let response = await sendRequest(url, method);
  console.log(response.data);
  return response.data;
}

async function readAllNodes() {
  let userInfo = await getUserInfo();
  let userId = userInfo["id"];
  let url =
    "https://nl9xif1q55.execute-api.ap-northeast-2.amazonaws.com/beta/users/" +
    userId +
    "/nodes";
  let method = "get";
  let response = await sendRequest(url, method, {}, {});
  return response.data;
}
/*
result :
[
  {
    userId : 123 ,
    memoList : {
      position : {
        top : 10px,
        left : 10px,
      },
      text : abc
    },
    requestUrl : ~~,
    ...
    
  } , 
  { ... }
]
 */

async function readNode(requestUrl) {
  let userInfo = await getUserInfo();
  let userId = userInfo["id"];
  let url =
    "https://nl9xif1q55.execute-api.ap-northeast-2.amazonaws.com/beta/users/" +
    userId +
    "/node";
  let method = "get";
  let queryString = {
    requestUrl: requestUrl
  };
  let response = await sendRequest(url, method, {}, queryString);
  console.log(response.data);
  return response.data;
}

//data must object
async function createNodes(projectId, nodesObject) {
  let userInfo = await getUserInfo();
  let userId = userInfo["id"];
  let url =
    "https://nl9xif1q55.execute-api.ap-northeast-2.amazonaws.com/beta/users/" +
    userId +
    "/projects/" +
    projectId +
    "/nodes";

  let method = "post";
  let data = nodesObject;
  let response = await sendRequest(url, method, data);
  console.log(response.data);

  return response.data;
}

async function deleteNode(projectId, nodesArray) {
  let userInfo = await getUserInfo();
  let userId = userInfo["id"];
  let url =
    "https://nl9xif1q55.execute-api.ap-northeast-2.amazonaws.com/beta/users/" +
    userId +
    "/projects/" +
    projectId +
    "/nodes";

  let method = "delete";
  let data = nodesArray;
  let response = await sendRequest(url, method, data);
  console.log(response.data);
  return response.data;
}

async function updateNode(projectId, nodesArray) {
  let userInfo = await getUserInfo();
  let userId = userInfo["id"];
  let url =
    "https://nl9xif1q55.execute-api.ap-northeast-2.amazonaws.com/beta/users/" +
    userId +
    "/projects/" +
    projectId +
    "/nodes";

  let method = "put";
  let data = nodesArray;
  let response = await sendRequest(url, method, data);
  console.log(response.data);
  return response.data;
}

async function getTags(node) {
  /*
  node = 
  {
    title : ""
    url : ""
    memo : ["", "", ...]
    highlight : ["", "", ...]
  }
  */
  let url =
    "https://ep9jktepxl.execute-api.ap-northeast-2.amazonaws.com/beata/";
  //let url = "https://ec2-15-164-93-85.ap-northeast-2.compute.amazonaws.com/info/";
  let method = "post";
  let data = node;
  let response = await sendRequest(url, method, data);
  /*
  return type:

  {
    keywords:{
      "k1" : "..",
      "k2" : "..",
      "k3" : "..",
      ...
    }
  }
  */

  return response.data.keywords;
}

const FlowerAPI = {
  getSampleNodes: getSampleNodes,
  readNodes: readNodes,
  readNode: readNode,
  createNodes: createNodes,
  deleteNode: deleteNode,
  updateNode: updateNode,
  readAllNodes: readAllNodes,
  getTags: getTags
};
export default FlowerAPI;
