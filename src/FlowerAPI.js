/* global chrome */
import axios from 'axios'
function getToken(){
  return chrome.storage.local.get(["token"]);
}

function makeRequest(token){
    return {
        /*
        params: { // query string
          title: 'NEXT JS'
        },
        */
        headers: { // 요청 헤더
          "Authorization" : token
        },
        //timeout: 3000 // 1초 이내에 응답이 오지 않으면 에러로 간주
      }
}

function makeRequest_bookmark(token){
  return {
      /*
      params: { // query string
        title: 'NEXT JS'
      },
      */
      headers: { // 요청 헤더
        "bookmarks" : token
      },
      //timeout: 3000 // 1초 이내에 응답이 오지 않으면 에러로 간주
    }
}

export async function getBookmarkTest() {
  let response = await chrome.runtime.sendMessage({
    greeting: "hello"
  }, function (response) {
    console.log(`message from background: ${response}`);

    return response;
  });

  let result = await axios.post('https://lh5z9ce6yc.execute-api.ap-northeast-2.amazonaws.com/test/bookmark', response);
  console.log(result);

  return result;
}

export async function getSampleNodes(){
    let token = await getToken();
    let request = makeRequest(token);

<<<<<<< HEAD
    let result = await axios.get('https://2i0zlhluc1.execute-api.ap-northeast-2.amazonaws.com/beta', request);
    console.log(result.data.data);
    return result.data.data;
      
=======
    let result = await axios.get('https://2i0zlhluc1.execute-api.ap-northeast-2.amazonaws.com/beta/users/10/projects/10/nodes', request);
    console.log(result);
>>>>>>> add bookmark part
 }
 
 