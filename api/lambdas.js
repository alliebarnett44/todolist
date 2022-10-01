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
      
      //Delete a user record
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
        
        //Add a task to existing tasks
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
        
        //VALIDATE USER 
        case "POST /validate":
        var validateData = JSON.parse(event.body);
        console.log(validateData.email);
        console.log(validateData.password);
        let validateParams = {
        "TableName": "http-crud-to-do-list",
        "FilterExpression": "email = :email AND password = :password",
        "ExpressionAttributeValues": {
          ":email": validateData.email,
          ":password": validateData.password
        }
        };
        body = await dynamo.scan(validateParams).promise();
        console.log(body.Items);
        
        if (body.Items.length == 0)
          console.log('user not validated');
        else if (body.Items)
          console.log('validated user');
        else
          console.log('some error occured');
        break;
        
        
        
        //EDIT an existing TASK
        case "PUT /edittask":
        var taskData = JSON.parse(event.body);
        console.log(`tasData is ${taskData}`);
        var userRecordId = taskData.id;
        var taskIdForEditing = taskData.taskId;
        console.log(`userRecordId is ${userRecordId}`);
        // var taskIdToEdit = taskData.taskId;
        var oldTask = taskData.oldTask;
        console.log(`old Task is ${oldTask}`);
        var newTask = taskData.newTask;
        console.log(`new task is ${newTask}`);
        var oldDay = taskData.oldDay;
        console.log(`old day is ${oldDay}`);
        var newDay = taskData.newDay;
        console.log(`new day is ${newDay}`);
        var newTime = taskData.newTime;
        
      
        // Get current data for specific user
        var listParamsToEdit = {
            TableName: 'http-crud-to-do-list',
            Key: {
                'id': userRecordId
            }
        };
        var recordsToEdit = await dynamo.get(listParamsToEdit).promise();
        console.log(JSON.stringify(recordsToEdit));
        var listToEdit = recordsToEdit.Item.task;
        console.log(JSON.stringify(listToEdit));
        
        //creat updated list
        const newList = listToEdit.map(p =>
          p.taskId === taskIdForEditing
            ? { ...p, task: newTask, day: newDay, time: newTime }
            : p
        //   p.day === oldDay
        //     ? { ...p, day: newDay }
        //     : p && 
        //   p.time == oldTime
        //   ? { ...p, time: newTime }
        //     : p
        );
        console.log(JSON.stringify(newList));
        
        var editedParams = {
            TableName: "http-crud-to-do-list",
            Key: {
              "id": taskData.id
            },
            UpdateExpression: "SET task = :vals",
            ExpressionAttributeValues: {
              ":vals": newList
            },
            ReturnValues: "UPDATED_NEW"
          };
        body = await dynamo.update(editedParams).promise();
        break;
      
      // GET USER RECORD
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
        
        //GET ALL DATA
        case "GET /items":
          body = await dynamo.scan({ TableName: "http-crud-to-do-list" }).promise();
          break;
          
        //UPDATE REMINDER
        case "PUT /item":
          var reminderData = JSON.parse(event.body);
          var userIdForReminder = reminderData.id;
          console.log(userIdForReminder);
          var reminderTaskId = reminderData.taskId;
          console.log(reminderTaskId);
          var userReminder = reminderData.reminder;
          var userTask = reminderData.task;
          var userDay = reminderData.day;
          var userTime = reminderData.time;
        
        //get current list
          var listParamsReminder = {
              TableName: 'http-crud-to-do-list',
              Key: {
                  'id': userIdForReminder
              }
          };
          var userRecords = await dynamo.get(listParamsReminder).promise();
          console.log(JSON.stringify(userRecords));
          var userRecordList = userRecords.Item.task;
          // console.log(JSON.stringify());
          
          const updateReminder = userRecordList.map(p =>
            p.taskId === reminderTaskId
              ? { ...p, reminder: !userReminder, task: userTask, day: userDay, time: userTime }
              : p
          );
          console.log(JSON.stringify(updateReminder));
          
          var reminderParams = {
              TableName: "http-crud-to-do-list",
              Key: {
                "id": userIdForReminder
              },
              UpdateExpression: "SET task = :val",
              ExpressionAttributeValues: {
                ":val": updateReminder
              },
              ReturnValues: "UPDATED_NEW"
            };
          body = await dynamo.update(reminderParams).promise();
          break;

          //UPDATE DONE STATUS
          case "PUT /done":
            var doneData = JSON.parse(event.body);
            var userIdForDone = doneData.id;
            var doneTaskId = doneData.taskId;
            var taskDone = doneData.done;
            var doneTask = doneData.task;
            var doneDay = doneData.day;
            var doneTime = doneData.time;
          
          //get current list
            var listParamsDone = {
                TableName: 'http-crud-to-do-list',
                Key: {
                    'id': userIdForDone
                }
            };
            var userRecords = await dynamo.get(listParamsDone).promise();
            console.log(JSON.stringify(userRecords));
            var userRecordList = userRecords.Item.task;
            // console.log(JSON.stringify());
            
            const updateDone = userRecordList.map(p =>
              p.taskId === doneTaskId
                ? { ...p, done: !taskDone, task: doneTask, day: doneDay, time: doneTime }
                : p
            );
            console.log(JSON.stringify(updateDone));
            
            var doneParams = {
                TableName: "http-crud-to-do-list",
                Key: {
                  "id": userIdForDone
                },
                UpdateExpression: "SET task = :val",
                ExpressionAttributeValues: {
                  ":val": updateDone
                },
                ReturnValues: "UPDATED_NEW"
              };
            body = await dynamo.update(doneParams).promise();
            break;
        
        //ADD A NEW TASK
        case "PUT /items":
          let request = JSON.parse(event.body);
          console.log(request);
          await dynamo.update({
            TableName: "http-crud-to-do-list",
            Key: {
              "id": request.id
            },
            UpdateExpression: "SET task[100] = :vals",
            ExpressionAttributeValues: {
              ":vals": {taskId: request.taskId, task: request.task, day: request.day, time: request.time, reminder: request.reminder, done:request.done}
            },
            ReturnValues: "UPDATED_NEW"
          }).promise();
  
          body = `Put item in ${request.id}`;
          
          break;
        
        //Add new user
        case "PUT /user":
          let requestJSON = JSON.parse(event.body);
          var putParams = {
            requestHeader,
            TableName: "http-crud-to-do-list",
            Item: {
              id: requestJSON.id,
              firstName: requestJSON.firstName,
              lastName: requestJSON.lastName,
              email: requestJSON.email,
              password: requestJSON.password,
              task: requestJSON.task
            }
          };
          await dynamo.put(putParams).promise();
          
          var userParams = {
            TableName: 'http-crud-to-do-list',
            Key: {
                'id': requestJSON.id
            }
        };
        body= await dynamo.get(userParams).promise();
          break;  
          
        //CHANGE REMINDER STATUS
       
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



