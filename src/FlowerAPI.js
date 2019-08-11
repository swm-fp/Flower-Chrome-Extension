/* global chrome */
import axios from 'axios'

function getUserInfo(){
  return chrome.storage.local.get(["token","id"]);
}

async function sendRequest(url,method,data={}){
  let userInfo = await getUserInfo();
  let token = userInfo["token"];
  let userId = userInfo["id"];
  let projectId = '1';
  url = "https://nl9xif1q55.execute-api.ap-northeast-2.amazonaws.com/beta/users/"+userId+"/projects/"+projectId+"/nodes";
  
  data["userId"] = userId;
  let body = JSON.stringify(data);

  let request = 
  {
    url : url,
    method : method,
    headers: {
      "Authorization" : token
    },
    data : body,
  }

  console.log(request);

  let response = await axios(request);
  return response;
}

async function getSampleNodes(){
  let url = "https://2i0zlhluc1.execute-api.ap-northeast-2.amazonaws.com/beta";
  let method = "get";
  let response =await sendRequest(url,method);
  console.log(response.data.data);
  return response.data.data;
}

async function readNodes(projectId){
  let url = "https://nl9xif1q55.execute-api.ap-northeast-2.amazonaws.com/beta/users/${userId}/projects/"+projectId+"/nodes";
  let method = "get"
  let response = await sendRequest(url,method);
  console.log(response.data);
  return response.data;
}

//data must object
async function createNodes(projectId,nodesArray){
  let url = "https://nl9xif1q55.execute-api.ap-northeast-2.amazonaws.com/beta/users/{userId}/projects/"+projectId+"/nodes";
  let method = "post"
  let data = nodesArray;
  let response = await sendRequest(url,method,data);
  console.log(response.data);
  return response.data;
}

async function deleteNode(projectId, nodesArray){
  let url = "https://nl9xif1q55.execute-api.ap-northeast-2.amazonaws.com/beta/users/{userId}/projects/"+projectId+"/nodes";
  let method = "delete"
  let data = nodesArray;
  let response = await sendRequest(url,method,data);
  console.log(response.data);
  return response.data;
}

async function updateNode(projectId, nodesArray){
  let url = "https://nl9xif1q55.execute-api.ap-northeast-2.amazonaws.com/beta/users/{userId}/projects/"+projectId+"/nodes";
  let method = "put"
  let data = nodesArray;
  let response = await sendRequest(url,method,data);
  console.log(response.data);
  return response.data;
}

const FlowerAPI = {
"getSampleNodes" : getSampleNodes,
"readNodes" : readNodes,
"createNodes" : createNodes,
"deleteNode" : deleteNode,
"updateNode" : updateNode,
}
export default FlowerAPI;

