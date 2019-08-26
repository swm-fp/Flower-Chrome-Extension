'use strict';
let AWS = require('aws-sdk');
let documentClient = new AWS.DynamoDB.DocumentClient();


module.export.readTable = async function readTable(tableName,parameters = {}){

  let filterExpression = "";
  let expressionAttributeValues = {};
  
  let parameterList = Object.keys(parameters);
  let numOfParameter = parameterList.length;

  let count = 0;
  for(let attribute in parameters){
    count += 1;
    filterExpression += attribute + "=:" + attribute;
    expressionAttributeValues[":"+attribute] = parameters[attribute];

    //has next?
    if(count != numOfParameter){
      filterExpression += " and ";
    }
  }

  let params = {
    TableName : tableName,
    FilterExpression : filterExpression,
    ExpressionAttributeValues : expressionAttributeValues
  };
  
  let result = await documentClient.scan(params).promise();
  return result;

  /*
  result :
  {
    Items : [],
    Count : number,
    ScannedCount : number
  }
   */

}