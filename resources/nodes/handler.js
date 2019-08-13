'use strict';
let uniqid = require('uniqid');
let AWS = require('aws-sdk');
let documentClient = new AWS.DynamoDB.DocumentClient();
let table = 'Nodes'


async function readTable(tableName,parameters = {}){

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
      filterExpression += " and";
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

// return Array
module.exports.read = async event => {
  let pathParameters = event.pathParameters;
  let projectId = pathParameters.projectId;

  let tableName = "NodesTest";
  let parameters = 
  {
    "projectId" : projectId
  }
  let response = await readTable(tableName,parameters);
  
  /*
  response :
  {
    Items : [],
    Count : number,
    ScannedCount : number
  }
   */
  
   let result = response.Items;

  return {
    statusCode: 200,
    body:JSON.stringify(result)
    };

    /*
    return :
    []
     */
  };


module.exports.readNode= async event => {
  let queryStringParameters = event.queryStringParameters;
  let requestUrl = queryStringParameters.requestUrl;

  let tableName = "NodesTest";
  let parameters = {
    "requestUrl" : requestUrl
  }
  let response = await readTable(tableName,parameters);
  
  /*
  response :
  {
    Items : [],
    Count : number,
    ScannedCount : number
  }
   */

   let result;

   if(response.Count == 0){
     result = {}
   }
   else{
     result = response.Items[0];
   }

  return {
    statusCode: 200,
    body:JSON.stringify(result)
    };

    /*
    return :
    {}
     */
  };
  


  
  function convertToBatchWriteFormat(data,projectId, userId){
    let items = [];
    let params = [];
    
    for(let i in data){
      
      if(items.length >= 25){
        params.push({
          RequestItems: {
            'NodesTest' : items
          }
        });
        
        items = [];
      }
      
      let node = data[i];

      //new node
      if( !node["id"] ){
        node["id"] = uniqid();
      }
      
      node["projectId"] = projectId;
      node["userId"] = userId;
      
      let item = {
        PutRequest: {
          Item: node
        }
      };
      items.push(item);
    }
    
    if(items.length > 0){
     params.push({
          RequestItems: {
            'NodesTest' : items
          }
        }); 
    }
    
    return params;
  }
  
  async function getNodeInfo(userId, nodeId) {

  let params = {
    TableName : 'NodesTest',
    FilterExpression : 'nodeId = :nodeId and userId = :userId',
    ExpressionAttributeValues : {':nodeId' : nodeId, ':userId' : userId}
  };
  
  let result = await documentClient.scan(params).promise();

  /*
  {
    Items : [],
    Count : number,
    ScannedCount : number
  }
   */

  return result.Items[0];
}



async function addChildrenIdtoParent(parentNode, childrenId) {
  parentNode.children.push(childrenId);

  let params = {
    TableName: 'NodesTest',
    Key: {
      id: parentNode.id
    },
    UpdateExpression: "set children=:c",
    ExpressionAttributeValues: {
      ":c": parentNode.children
    }
  };

  let result = await documentClient.update(params).promise();
}
  
  module.exports.create= async event => {
    let pathParameters = event.pathParameters;
    let projectId = pathParameters.projectId;
    let userId = pathParameters.userId;
    
    let body = JSON.parse(event.body);
    let data = body;
    let params = convertToBatchWriteFormat(data.nodes,projectId, userId);
    
    for(let i=0;i<params.length;i++){
      await documentClient.batchWrite(params[i]).promise();
    };

    if(data.createOne){
      await addChildrenIdtoParent(await getNodeInfo(userId, data.nodes[0].parentId), data.nodes[0].nodeId);
    }
    
    let result = {};
    result["requestedItems"] = params;
    
    return {
      statusCode: 200,
      body: JSON.stringify(result)
      };
    };

async function deleteChildren(userId, nodeId) {
  let node = await getNodeInfo(userId, nodeId);
  for (let i = 0; i < node.children.length; i++) {
    try{
      await deleteChildren(userId, node.children[i]);
    }
    catch(err){
      ;
    }
  }
  await deleteNode(node);
}

async function deleteChildrenIdfromParent(parentNode, childrenId) {
  const idx = parentNode.children.indexOf(childrenId);
  if (idx > -1) parentNode.children.splice(idx, 1)

  let params = {
    TableName: "NodesTest",
    Key: {
      id: parentNode.id
    },
    UpdateExpression: "set children=:c",
    ExpressionAttributeValues: {
      ":c": parentNode.children
    }
  };

  let result = await documentClient.update(params).promise();
}

async function deleteNode(node) {
  let params = {
    TableName: 'NodesTest',
    Key: {
      id: node.id
    }
  };
  let result = await documentClient.delete(params).promise();
}

module.exports.delete = async event => {
  let pathParameters = event.pathParameters;
  let projectId = pathParameters.projectId;
  let userId = pathParameters.userId;

  let body = JSON.parse(event.body);
  let data = body;

  /*
  노드 삭제, 노드의 children 모두 삭제, 노드 parent의 children 삭제
  */

  let node = await getNodeInfo(userId, data.nodes[0].nodeId);
  let result = await deleteChildren(userId, data.nodes[0].nodeId);

  //parentId에서 children 삭제
  let parentNode = await getNodeInfo(userId, node.parentId);
  if (!!parentNode) {
    await deleteChildrenIdfromParent(parentNode, node.nodeId);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
};

module.exports.update = async event => {
  let pathParameters = event.pathParameters;
  let projectId = pathParameters.projectId;
  let userId = pathParameters.userId;

  let body = JSON.parse(event.body);
  let data = body;

  let node = await getNodeInfo(userId, data.nodes[0].nodeId);

  /*
  [changed] 폴더/링크 모두 이름만 바꾸면 됨
  [moved] parentId 수정, parent의 children 삭제 및 추가
  */

  let params = {
    TableName: 'NodesTest',
    Key: {
      id: node.id
    },
    UpdateExpression: "set title=:a, parentId=:b",
    ExpressionAttributeValues: {
      ":a": data.nodes[0].title,
      ":b": data.nodes[0].parentId
    }
  };

  let result = await documentClient.update(params).promise();

  if (data.moved) {
    await deleteChildrenIdfromParent(await getNodeInfo(userId, node.parentId), node.nodeId);
    await addChildrenIdtoParent(await getNodeInfo(userId, data.nodes[0].parentId), node.nodeId);
  }

  result["requestedItems"] = data;

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
};