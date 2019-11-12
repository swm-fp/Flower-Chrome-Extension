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
