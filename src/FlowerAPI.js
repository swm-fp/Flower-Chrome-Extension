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
export async function API1(){
    let token = await getToken();
    let request = makeRequest(token);

    let result = await axios.get(' https://oc07otgs25.execute-api.ap-northeast-2.amazonaws.com/beta/users/1', request);
      console.log(result);
 }
 