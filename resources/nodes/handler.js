'use strict';
let uniqid = require('uniqid');
let AWS = require('aws-sdk');
let documentClient = new AWS.DynamoDB.DocumentClient();
let table = 'Nodes'


module.exports.read = async event => {
  let pathParameters = event.pathParameters;
  let projectId = pathParameters.projectId;
  
  let params = {
    TableName : 'NodesTest',
    FilterExpression : 'projectId = :projectId',
    ExpressionAttributeValues : {':projectId' : projectId}
  };
  
  let result = await documentClient.scan(params).promise();
  
  return {
    statusCode: 200,
    body:JSON.stringify(result)
      
    };
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
      node["id"] = uniqid();
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
  
  async function getNodeInfo(userId, id) {
  let params = {
    TableName: 'NodesTest',
    ScanFilter: {
      'nodeId': {
        ComparisonOperator: "EQ",
        AttributeValueList: [
          id,
        ]
      },
      'userId': {
        ComparisonOperator: "EQ",
        AttributeValueList: [
          userId,
        ]
      }
    }
  };
  let result = await documentClient.scan(params).promise();
  return result.Items[0];
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
    let params = await convertToBatchWriteFormat(data.nodes,projectId, userId);
    
    for(let i=0;i<params.length;i++){
      await documentClient.batchWrite(params[i]).promise();
    };
    
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