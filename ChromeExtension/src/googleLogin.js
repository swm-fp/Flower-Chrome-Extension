/* global chrome */
import axios from "axios";

async function login() {
  chrome.identity.getAuthToken({ interactive: true }, function(token) {
    console.log(token);
    chrome.storage.local.set({ token: token });
    alert("login!!");
  });
}

async function logout() {
  chrome.storage.local.get(["token"], function(result) {
    chrome.identity.removeCachedAuthToken({ token: result.token }, function() {
      chrome.storage.local.set({ token: "" });
      alert("logout!");
    });
  });
}

async function showLoginInfo() {
  chrome.storage.local.get(["token"], function(result) {
    getUserInfo(result.token);
    getTokenInfo(result.token);
  });
}

async function getUserInfo(token) {
  let request = {
    url:
      "https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=" +
      token,
    method: "GET",
    async: true,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    contentType: "json"
  };

  let response = await axios(request);

  console.log(response);
}

async function getTokenInfo(token) {
  let request = {
    url:
      "https://www.googleapis.com/oauth2/v3/tokeninfo?alt=json&access_token=" +
      token,
    method: "GET",
    async: true,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    contentType: "json"
  };

  let response = await axios(request);

  console.log(response);
}

const googleLogin = {
  login: login,
  logout: logout,
  showLoginInfo: showLoginInfo,
  getUserInfo: getUserInfo,
  getTokenInfo: getTokenInfo
};
export default googleLogin;
