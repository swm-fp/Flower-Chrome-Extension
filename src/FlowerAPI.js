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

    let result = await axios.get('https://2i0zlhluc1.execute-api.ap-northeast-2.amazonaws.com/beta/users/10/projects/10/nodes', request);
      console.log(result);
 }
 
 