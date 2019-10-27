class DbManager {
    
    constructor(){
        this._client = {}   
    }
    getClient(){
        return this._client;
    }
    getItem(params,cb){
        if(params.Key.deviceID==1){
            cb(false,{item:"200"})
        }else{
            cb('item does not exist');
        }
    }
    create(params,cb){
        if(params.Item.deviceName=="fail"){
            cb('database error')
        }else{
            cb(false,params.Item.deviceID)
        }
    }
    update(params,cb){
        if(params.ExpressionAttributeValues[":n"]=="fail"){
            cb('database error')
        }else{
            cb(false,params.ExpressionAttributeValues)
        }
    }
    delete(params,cb){
        cb(false,params.Key.deviceID);
    }
    getHundred(params,cb){
        cb(false,{})
    }
}
module.exports = DbManager;