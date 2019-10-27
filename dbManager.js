var AWS = require("aws-sdk");

class DbManager {
    
    constructor(){
        this._client = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
    }
    getClient(){
        return this._client;
    }
    getItem(params,cb){
        this._client.get(params,cb);
    }
    create(params,cb){
        this._client.put(params,cb);
    }
    update(params,cb){
        this._client.update(params,cb);
    }
    delete(params,cb){
        this._client.delete(params,cb);
    }
    getHundred(params,cb){
        this._client.scan(params,cb);
    }
}
module.exports = DbManager;