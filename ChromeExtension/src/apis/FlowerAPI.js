/* global chrome */
import axios from "axios";
import memoAPI from "./MemoAPI";
import "./chrome-extension-async";



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

  getMemos :async (requestUrl)=>{
    const info = await getUserInfo();
    
    let result = await memoAPI.getMemos(info.token,requestUrl);
    return result;
  },

  postMemos :async (memoList)=>{
    const info = await getUserInfo();

let result = await memoAPI.postMemos(info.token,memoList);
return result;

  },
  
getUserInfo : async () => {
  const info = await chrome.storage.local.get(["token","email"]);
  return info;
},
getLoginState : async ()=>{
 const info = await getUserInfo();
 if(info.token == undefined){
   return false;
 }
 else {
   return true;
 }
}


};
export default FlowerAPI;
