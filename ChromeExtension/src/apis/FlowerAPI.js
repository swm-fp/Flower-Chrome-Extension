/* global chrome */
import axios from "axios";

async function getUserInfo() {
  return chrome.storage.local.get(["token", "id"]);
}

async function sendRequest(token,url, method, data = "", queryString = {}) {

  let request = {
    url: url,
    method: method,
    headers: {
      Authorization: token
    },
    data: data,

    params: queryString
  };

  let response = await axios(request);
  return response;
}

const FlowerAPI = {
  getTags: async (token,node) => {
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
  let response = await sendRequest(token,url, method, JSON.stringify(data));
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
},

  getMemos : async (token,requestUrl) => {
  let url = "https://nl9xif1q55.execute-api.ap-northeast-2.amazonaws.com/develop/memos";
  let method = "get";
  let response = await sendRequest(token,url,method,{},{requestUrl : requestUrl});
  return response;
},

  postMemos : async (token,memoList) => {
  let url = "https://nl9xif1q55.execute-api.ap-northeast-2.amazonaws.com/develop/memos";
  let method = "post";
  let response = await sendRequest(token,url,method,JSON.stringify(memoList));
  return response;
}

};
export default FlowerAPI;
