'use strict';
let uniqid = require('uniqid');
let AWS = require('aws-sdk');
let documentClient = new AWS.DynamoDB.DocumentClient();



module.exports.read = async event => {
  let pathParameters = event.pathParameters;
  let projectId = pathParameters.projectId;
  
  let params = {
    TableName : 'Nodes',
    FilterExpression : 'projectId = :projectId',
    ExpressionAttributeValues : {':projectId' : projectId}
  };
  
  let result = await documentClient.scan(params).promise();
  
  return {
    statusCode: 200,
    body:JSON.stringify(result)
      
    };
  };
  
  
  
  function convertToBatchWriteFormat(data,projectId){
    let items = [];
    
    for(let i in data){
      let node = data[i];
      node["id"] = uniqid();
      node["projectId"] = projectId;
      
      let item = {
        PutRequest: {
          Item: node
        }
      };
      items.push(item);
    }
    
    
    let params = {
      RequestItems: {
        'Nodes' : items
      }
    };
    
    return params;
  }
  
  module.exports.create= async event => {
    let pathParameters = event.pathParameters;
    let projectId = pathParameters.projectId;
    
    let body = JSON.parse(event.body);
    let data = body;
    let params = convertToBatchWriteFormat(data,projectId);
    let result = await documentClient.batchWrite(params).promise();

    result["requestedItems"] = data;
    
    return {
      statusCode: 200,
      body: JSON.stringify(result)
      };
    };
