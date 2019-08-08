/* global chrome */
import axios from 'axios'

function getUserInfo(){
  return chrome.storage.local.get(["token","id"]);
}


async function sendRequest(url,method,data={}){
  let userInfo = await getUserInfo();
  let token = userInfo["token"];
  let userId = userInfo["id"];

  data["userId"] = userId;

  let request = 
  {
    url : url,
    method : method,
    headers: {
      "Authorization" : token
    },
    data : data,
  }

  let result = axios(request);
  return result;
}

function makeRequest_bookmark(token) {
  return {
    /*
      params: { // query string
        title: 'NEXT JS'
      },
      */
    headers: {
      // 요청 헤더
      bookmarks: token
    }
    //timeout: 3000 // 1초 이내에 응답이 오지 않으면 에러로 간주
  };
}

async function getBookmarkTest() {
  let response = await chrome.runtime.sendMessage(
    {
      greeting: "hello"
    }
  );

  console.log(`message from background: ${response}`);

  let url = "https://lh5z9ce6yc.execute-api.ap-northeast-2.amazonaws.com/test/bookmark";
  let data = JSON.parse(response);
  let result = await sendRequest(url,"post",data);
  console.log(result);
  }

async function getSampleNodes(){
  let url = "https://2i0zlhluc1.execute-api.ap-northeast-2.amazonaws.com/beta";
  let method = "get";
  let result =await sendRequest(url,method);
  console.log(result.data.data);
  return result.data.data;
}

async function readNodes(projectId){
  let url = "https://nl9xif1q55.execute-api.ap-northeast-2.amazonaws.com/beta/users/{userId}/projects/"+projectId+"/nodes";
  let method = "get"
  let result = await sendRequest(url,method);
  console.log(result);
  return result;
}

const FlowerAPI = {
"getBookmarkTest" : getBookmarkTest,
"getSampleNodes" : getSampleNodes,
"readNodes" : readNodes
}
export default FlowerAPI;

