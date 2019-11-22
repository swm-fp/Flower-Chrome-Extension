/* global chrome */
import FlowerAPI from "../apis/FlowerAPI";
import "../apis/chrome-extension-async";

async function test(sendResponse) {

  let title = await chrome.tabs.executeScript({
    code: 'document.querySelector("title").innerText'
  });



  let url = await chrome.tabs.executeScript({
    code: "document.URL"
  });


  let data = await FlowerAPI.getTags(url[0], title[0]);
  sendResponse({ tags: data });

}

chrome.runtime.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  if (request.message == "nlp") {
    test(sendResponse);
    return true;
  }
  // let result = [];
  // if (data) {
  //   for (let i = 0; i < data.length; i++) {
  //     result.push({ id: data[i], text: data[i] });
  //   }
  // }

}
);