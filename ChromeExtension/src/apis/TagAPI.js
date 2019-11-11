/* global chrome */
import axios from "axios";
const apiUrl = "https://nl9xif1q55.execute-api.ap-northeast-2.amazonaws.com/develop/memos";

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

  console.log(JSON.stringify(request));

  let response = await axios(request);
  return response;
}

const TagAPI = {

  getTags: async (token, tagurl) => {
    const url = apiUrl;
    const method = "get";
    const data = {};
    
    data["url"] = tagurl;

    let response = await sendRequest(token, url, method, JSON.stringify(data));
    console.log(response);
  },

  postTags : async (token, tagurl, tags) => {
    const url = apiUrl;
    const method = "post";
    const data = {};

    data["url"] = tagurl;
    data["tags"] = tags;

    let response = await sendRequest(token, url, method, JSON.stringify(data));
    console.log(response);
  }

};
export default TagAPI;
