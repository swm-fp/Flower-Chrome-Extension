/* global chrome */
import axios from "axios";
import config from "./api-config";
const apiUrl = config.projectApiUrl;

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

const ProjectAPI= {
    postProject : async (token,projectName,memoIdList)=>{
        const url = apiUrl;
        const method = "post";
        const data = {name : projectName,memoIdList : memoIdList};
        const response = await sendRequest(token,url,method,JSON.stringify(data));
        console.log(response);
        return response;
    }
};
export default ProjectAPI;
