'use strict';
let dynamoCRUD = require("../../dynamoCRUD");
let uniqid = require('uniqid');
let AWS = require('aws-sdk');
let documentClient = new AWS.DynamoDB.DocumentClient();
let table = 'projects';

  module.exports.createProject = async event => {
    let pathParameters = event.pathParameters;
    let userId = pathParameters.userId;
    
    let body = JSON.parse(event.body);
    let data = body;

    let projectName = data.projectName;

    let response = await dynamoCRUD.readTable(table,{"userId":userId,"projectName":projectName});
    if(response.Count!= 0){
    return {
      statusCode: 200,
      body: JSON.stringify("alreay exists")
      };
    }

    var params = {
      TableName : table,
      Item: {
         "id" : uniqid(),
         "userId" : userId,
         "projectName": projectName
      }
    };
    
    response = await documentClient.put(params).promise();

     let result = response;
    
    return {
      statusCode: 200,
      body: JSON.stringify(result)
      };
    };

  module.exports.isProjectExist = async event => {
    
    return {
      statusCode: 200,
      body: JSON.stringify("hello")
      };
    };
