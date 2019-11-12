/* global chrome */
import axios from "axios";
import config from "./api-config";
const apiUrl = config.tagApiUrl;

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

  //console.log(JSON.stringify(request));

  let response = await axios(request);
  return response;
}

const TagAPI = {

  getTags: async (token, tagUrl) => {
    const url = apiUrl;
    const method = "get";
    const queryStringParameters = {}
    if(tagUrl != undefined){
      queryStringParameters["tagUrl"] = tagUrl;
    }

    let response = await sendRequest(token, url, method, {}, queryStringParameters);
    return response;
  },

  postTags : async (token, tagUrl, tags) => {
    const url = apiUrl;
    const method = "post";
    const data = {url:tagUrl, tags:tags};

    let response = await sendRequest(token, url, method, JSON.stringify(data));
    return response;
  },

  putQueue : async (token, tagUrl, title) => {
    const url = "https://nhe02otv71.execute-api.ap-northeast-2.amazonaws.com/beta";
    const method = "post";
    const data = {url:tagUrl, title:title};

    let response = await axios({
      url: url,
      method: method,
      headers:{
        Authorization: token,
        "Content-Type":"application/json"
      },
      data: JSON.stringify(data)
    });

    return response;
  }

};
export default TagAPI;
