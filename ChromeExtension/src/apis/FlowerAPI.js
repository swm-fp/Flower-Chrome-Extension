/* global chrome */
import axios from "axios";
import memoAPI from "./MemoAPI";
import userAPI from "./UserAPI";
import projectAPI from "./ProjectAPI";
import tagAPI from "./TagAPI";
import atob from "atob";
import "./chrome-extension-async";

async function sendRequest(token, url, method, data = "", queryString = {}) {
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
  postUser: async () => {
    const info = await FlowerAPI.getUserInfo();
    userAPI.postUser(info.token);
  },

  getMemos: async requestUrl => {
    if (await FlowerAPI.checkLoginStatus()) {
      const info = await FlowerAPI.getUserInfo();

      let response = await memoAPI.getMemos(info.token, requestUrl);
      return response.data;
    }
  },

  postMemos: async memoList => {
    if (await FlowerAPI.checkLoginStatus()) {
      const info = await FlowerAPI.getUserInfo();
      let response = await memoAPI.postMemos(info.token, memoList);
      return response.data;
    }
  },

  getTags: async (tagUrl = undefined, title = undefined) => {
    if (await FlowerAPI.checkLoginStatus()) {
      const info = await FlowerAPI.getUserInfo();
      let response = await tagAPI.getTags(info.token, tagUrl);

      let res = response.data.tagList;

      if (res.length) {
        return res;
      } else {
        response = await tagAPI.putQueue(info.token, tagUrl, title);

        console.log(response);

        setTimeout(async function() {
          response = await tagAPI.getTags(info.token, tagUrl);
          console.log(response.data.tagList);
          return response.data.tagList;
        }, 5000);

        return [];
      }
    }
  },

  postTags: async (tagUrl = undefined, tags = undefined) => {
    if (await FlowerAPI.checkLoginStatus()) {
      const info = await FlowerAPI.getUserInfo();
      let response = await tagAPI.postTags(info.token, tagUrl, tags);

      return "success";
    }
  },

  deleteMemos: async memoId => {
    if (await FlowerAPI.checkLoginStatus()) {
      const info = await FlowerAPI.getUserInfo();

      let response = await memoAPI.deleteMemos(info.token, memoId);
      return response.data;
    }
  },

  postProject: async (projectName, memoIdList) => {
    if (await FlowerAPI.checkLoginStatus()) {
      const info = await FlowerAPI.getUserInfo();
      let response = await projectAPI.postProject(
        info.token,
        projectName,
        memoIdList
      );

      return response.data;
    }
  },

  postShareLink: async projectId => {
    if (await FlowerAPI.checkLoginStatus()) {
      const info = await FlowerAPI.getUserInfo();
      let response = await projectAPI.postShareLink(info.token, projectId);
      return response.data;
    }
  },

  getUserInfo: async () => {
    const info = await chrome.storage.local.get(["token", "email"]);
    return info;
  },

  checkLoginStatus: async () => {
    const info = await FlowerAPI.getUserInfo();
    const con1 = await FlowerAPI.getLoginState(info.token);

    if (con1) {
      return await FlowerAPI.checkTokenValid(info.token);
    }
    return false;
  },

  getLoginState: async token => {
    if (token === undefined || token === "") {
      return false;
    } else {
      return true;
    }
  },

  checkTokenValid: async token => {
    let infoToken = token.split(".")[1];
    let infoString = atob(infoToken);
    let info = JSON.parse(infoString);
    let expireTime = info["exp"];
    let now = new Date().getTime();

    return parseInt(now / 1000) < expireTime === true;
  },

  updateLogoutState: async () => {
    await chrome.storage.local.set(
      { token: "", id: "", email: "" },
      function() {
        alert("logout");
      }
    );
  }
};
export default FlowerAPI;
