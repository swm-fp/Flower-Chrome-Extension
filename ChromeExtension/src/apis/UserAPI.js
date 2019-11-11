/* global chrome */
import axios from "axios";
import config from "./api-config";
const apiUrl = config.userApiUrl;

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

const UserAPI= {
    postUser : async (token)=>{
        let url = apiUrl;
        let method = "post";
        sendRequest(token,url,method);
    }
};
export default UserAPI;
