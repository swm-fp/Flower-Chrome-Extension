/* global chrome */
import axios from "axios";
import config from "./api-config";
const apiUrl = config.projectApiUrl;

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

const ProjectAPI = {
    postProject: async (token, projectName) => {
        const url = apiUrl;
        const method = "post";
        const data = { name: projectName };
        const response = await sendRequest(token, url, method, JSON.stringify(data));
        console.log(response);
        return response;
    },
    addMemoToProject: async (token, projectId, memoIdList) => {
        const url = apiUrl + "/" + projectId;
        const method = "post";
        const data = { memoIdList: memoIdList };
        const response = await sendRequest(token, url, method, JSON.stringify(data));
        console.log(response);
        return response;
    },
    postShareLink: async (token, projectId) => {
        const url = apiUrl + "/" + projectId + "/share";
        const method = "post";
        const data = { projectId: projectId }
        const response = await sendRequest(token, url, method, JSON.stringify(data));
        console.log(response);
        return response;
    },
    followProject: async (token, key) => {
        const url = config.baseUrl + "/share";
        const method = "get";
        const response = await sendRequest(token, url, method, {}, { shareKey: key });
        console.log(response);
        return response;
    },
    getProject: async (token) => {
        const url = apiUrl
        const method = "get";
        const response = await sendRequest(token, url, method);
        console.log(response);
        return response;
    },

};
export default ProjectAPI;
