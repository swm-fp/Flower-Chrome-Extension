/* global chrome */
import axios from "axios";
import config from "./api-config";
const apiUrl = config.memoApiUrl;


async function sendRequest(token,url, method, data = "", queryString = {}) {

  const request = {
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

const MemoAPI = {
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

  getMemos : async (token,requestUrl = undefined) => {
  const url = apiUrl;
  const method = "get";
  const queryStringParameters = {}
  if(requestUrl != undefined){
    queryStringParameters["requestUrl"] = requestUrl;
  }
  
  let response = await sendRequest(token,url,method,{},queryStringParameters);
  console.log(response);
  return response;
},

  postMemos : async (token,memoList) => {
  let url = apiUrl;
  let method = "post";
  let response = await sendRequest(token,url,method,JSON.stringify(memoList));
  console.log(response);
  return response;
},
deleteMemos : async (token,memoId) => {
  let url = apiUrl+"/"+memoId;
  let method = "delete";
  let response = await sendRequest(token,url,method);
  console.log(response);
  return response;
}



};
export default MemoAPI;
