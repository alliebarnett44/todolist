const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    "accept": "*",
    "Access-Control-Allow-Origin": "*",
    "access-Control-Allow-Headers": "*"
  };
  const requestHeader = {
    "Content-Type": "application/json",
    "Accept": "*/*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*"
  }

  try {
    switch (event.routeKey) {
      case "DELETE /items/{id}":
        await dynamo
          .delete({
            requestHeader,
            TableName: "http-crud-to-do-list",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        body = `Deleted item ${event.pathParameters.id}`;
        break;
        
        case "PUT /task":
        var data = JSON.parse(event.body);
        var recordID = data.id;
        var taskId = data.taskId;
        
      
        // Get the current list
        var listParams = {
            TableName: 'http-crud-to-do-list',
            Key: {
                'id': recordID
            }
        };
        var records = await dynamo.get(listParams).promise();
        console.log(JSON.stringify(records));
        var list = records.Item.task;
        console.log(JSON.stringify(list));
        
        var newArray = list.filter(function (el)
          {
            return el.taskId !== taskId;
          }
          );
        console.log(JSON.stringify(newArray));
        var paramys = {
            TableName: "http-crud-to-do-list",
            Key: {
              "id": data.id
            },
            UpdateExpression: "SET task = :vals",
            ExpressionAttributeValues: {
              ":vals": newArray
            },
            ReturnValues: "UPDATED_NEW"
          };
        body = await dynamo.update(paramys).promise();
        break;
      
        case "GET /items/{id}":
          body = await dynamo
            .get({
              requestHeader,
              TableName: "http-crud-to-do-list",
              Key: {
                id: event.pathParameters.id
              }
            })
            .promise();
          break;
        case "GET /item/{id}":
          body = await dynamo
            .get({
              requestHeader,
              TableName: "http-crud-to-do-list",
              Key: {
                id: event.pathParameters.id
              }
            })
            .promise();
          break;
        
        case "GET /items":
          body = await dynamo.scan({ TableName: "http-crud-to-do-list" }).promise();
          break;
        
        case "PUT /items":
          let request = JSON.parse(event.body);
          console.log(request);
          var paramaters = {
            TableName: "http-crud-to-do-list",
            Key: {
              "id": request.id
            },
            UpdateExpression: "SET task[10] = :vals",
            ExpressionAttributeValues: {
              ":vals": {id: request.taskId, task: request.task, day: request.day, time: request.time}
            },
            ReturnValues: "UPDATED_NEW"
          };
          await dynamo
            .update(paramaters).promise();
          body = `Put item in ${request.id}`;
          
          break;
        case "PUT /tasks":
          let requestJSON = JSON.parse(event.body);
          await dynamo
            .put({
              requestHeader,
              TableName: "http-crud-to-do-list",
              Item: {
                id: requestJSON.id,
                task: requestJSON.task,
            
              }
            })
            .promise();
          body = `Put item ${requestJSON.id}`;
          break;  
        default:
          throw new Error(`Unsupported route: "${event.routeKey}"`);
      }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    headers,
    body
  };
};




// var item = data.task.taskId;
// Remove the selected item from the list
        // var indexToRemove = list.findIndex(i => i === item);
        // console.log("hello dis abby");
        // console.log(indexToRemove);
        // var removeListItemParams = {
        //     TableName: 'http-crud-to-do-list',
        //     Key: {
        //         'id': recordID
        //     },
        //     UpdateExpression: `REMOVE task[`+indexToRemove+`]`
        // };

        // body = await dynamo.update(removeListItemParams).promise();