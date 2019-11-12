import tokenDecoder from "../utils/tokenDecoder"

const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

async function getTagsfromUserTag(userId, url){
    let params = {
        TableName : 'UserTag',
        ScanFilter: {
          'userId': {
            ComparisonOperator: "EQ",
            AttributeValueList: [
              userId,
             ]
          },
          'url':{
            ComparisonOperator: "EQ",
            AttributeValueList: [
              url,
             ]
          }
        }
    };

    let result = await documentClient.scan(params).promise();
    return result;
}

async function getTagsfromUrlTag(url){
    let params = {
        TableName : 'UrlTag',
        ScanFilter: {
          'url': {
            ComparisonOperator: "EQ",
            AttributeValueList: [
              url,
             ]
          }
        }
    };

    let result = await documentClient.scan(params).promise();
    return result;
}

async function getFqfromtags(words){
    let params = {
        TableName : 'tags',
        ScanFilter: {
          'words': {
            ComparisonOperator: "EQ",
            AttributeValueList: [
              words,
             ]
          }
        }
    };

    let result = await documentClient.scan(params).promise();

    if(result.Items[0] == undefined){
        return 0;
    }else{
        return result.Items[0].fq;
    }
}

async function updateTagsinUserTag(userId, url, tagList){
    let params = {
        TableName: 'UserTag',
        Key:{
          userId: userId,
          url: url
        },
        UpdateExpression: "set tags=:c",
        ExpressionAttributeValues:{
          ":c":tagList
        }
      };
      
      let result = await documentClient.update(params).promise();
      return result;
}

async function updateTagsintags(tag){
    let val = await getFqfromtags(tag);
    let params = {
        TableName: 'tags',
        Key:{
          words: tag,
        },
        UpdateExpression: "set fq=:c",
        ExpressionAttributeValues:{
          ":c": val+1
        }
      };
      
      let result = await documentClient.update(params).promise();
      return result;
}

export async function getTags(event) {
    const accessToken = event.headers.Authorization;
    const userId = tokenDecoder.decode(accessToken)[1].identities[0]["userId"];
    const data = event.queryStringParameters;
    const url = data.tagUrl;

    //let userId = "1111";
    //let url = "www.naveer.com";

    let res = {}

    let response = await getTagsfromUserTag(userId, url);
    let userTagList = response.Items[0];
    if (userTagList != undefined) {
      res["tagList"] = userTagList.tags;

      return {
        statusCode: 200,
        body: JSON.stringify(res)
      };
    }

    response = await getTagsfromUrlTag(url);
    let tagList = response.Items[0];
    if (tagList != undefined) {
      
      res["tagList"]= tagList.tags;

      return {
        statusCode: 200,
        body: JSON.stringify(res)
      };
    }

    res["tagList"] = [];
    return {
      statusCode: 200,
      body: JSON.stringify(res)
    };
}

export async function postTags(event) {
    const accessToken = event.headers.Authorization;
    const userId = tokenDecoder.decode(accessToken)[1].identities[0]["userId"];
    const data = JSON.parse(event.body);
    const url = data.url;
    const tagList = data.tags;

    //let userId = "11111";
    //let url = "www.naver.com";
    //let tagList = ["H", "G"];

    let response = updateTagsinUserTag(userId, url, tagList);

    return response;
}

async function calFrequency(event){
    let tagList = [];
    for(let t in tagList){
        await updateTagsintags(tagList[t]);
    }
}