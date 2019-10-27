"use strict";
const uuidv1 = require("uuid/v1");
const DbManager = require("./dbManager");
const myDbManager=  new DbManager();
const Response = require("./responseManager");

module.exports.createDevice = async event => {
  const data = JSON.parse(event.body);
  var params = {
    TableName: "devices",
    Item: {
      deviceID: uuidv1(),
      deviceName: data.deviceName,
      created: new Date().toISOString(),
      firmwareVersion: data.firmwareVersion,
      firmwareRevision: data.firmwareRevision,
      deviceData: data.deviceData
    }
  };
  let response = new Response();
  await new Promise(resolve => {
    myDbManager.create(params, function(err, data) {
      if (err) {
        console.log("Unable to add device . Error JSON:",JSON.stringify(err, null, 2));
        response.addError(response,"Unable to add device . Error JSON:"+JSON.stringify(err, null, 2));
        resolve();
      } else {
        response.addMsg(JSON.stringify(params.Item))
        resolve();
      }
    });
  });
  return response.getResponse();
};

module.exports.getDevice = async event => {
  var params = {
    TableName: "devices",
    Key: {
      deviceID: event.pathParameters.id
    }
  };
  let response = new Response();
  await new Promise(resolve => {
    myDbManager.getItem(params, function(err, data) {
      if (err) {
        console.log("Unable to get device . Error JSON:",JSON.stringify(err, null, 2));
        response.addError("Unable to get device . Error JSON:"+JSON.stringify(err, null, 2))
        resolve();
      } else {
        response.addMsg(JSON.stringify(data));
        resolve();
      }
    });
  });
  return response.getResponse();
};

module.exports.updateDevice = async event => {
  const data = JSON.parse(event.body);
  console.log(data)
  var params = {
    TableName: "devices",
    Key: {
      deviceID: data.deviceID
    },
    UpdateExpression:
      "set deviceName = :n, deviceData = :d, firmwareVersion = :fv, firmwareRevision = :fr, modified = :m, created = created",
    ExpressionAttributeValues: {
      ":n": data.deviceName,
      ":d": data.deviceData,
      ":fv": data.firmwareVersion,
      ":fr": data.firmwareRevision,
      ":m": new Date().toISOString()
    },
    ReturnValues: "UPDATED_NEW"
  };
  let response = new Response();
  await new Promise(resolve => {
    myDbManager.update(params, function(err, data) {
      if (err) {
        console.log("Unable to update device . Error JSON:",JSON.stringify(err, null, 2));
        response.addError("Unable to update device . Error JSON:"+JSON.stringify(err, null, 2));
        resolve();
      } else {
        response.addMsg(JSON.stringify(data))
        resolve();
      }
    });
  });
  return response.getResponse();
};

module.exports.deleteDevice = async event => {
  var params = {
    TableName: "devices",
    Key: {
      deviceID: event.pathParameters.id
    },
    ConditionExpression: "deviceID = :val",
    ExpressionAttributeValues: {
      ":val": event.pathParameters.id
    }
  };
  let response = new Response();
  if(event.pathParameters.id==null || event.pathParameters.id ==undefined){
    response.addError("No id is beeing sent");
    return response.getResponse();
  }
  await new Promise(resolve => {
    myDbManager.delete(params, function(err, data) {
      if (err) {
        console.log("Unable to delete device . Error JSON:",JSON.stringify(err, null, 2));
        response.addError("Unable to delete device . Error JSON:",JSON.stringify(err, null, 2));
        resolve();
      } else {
        response.addMsg("deleted: "+event.pathParameters.id);
        resolve();
      }
    });
  });
  return response.getResponse();
};

module.exports.getHundredDevices = async event => {
  var params = {
    TableName: "devices",
    Limit: 100
  };
  let response = new Response();
  await new Promise(resolve => {
    myDbManager.getHundred(params, function(err, data) {
      if (err) {
        console.log("Unable to get all devies",JSON.stringify(err, null, 2));
        response.addError("Unable to get all devies",JSON.stringify(err, null, 2));
        resolve();
      } else {
        response.addMsg(JSON.stringify(data));
        resolve();
      }
    });
  });
  return response.getResponse();
};