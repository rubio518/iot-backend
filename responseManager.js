class ResponseManager {
    constructor(){
        this._response = {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
            statusCode: 200,
            body: JSON.stringify("default")
          };;
    }
    getResponse(){
        return this._response;
    }
    addError(msg){
        this._response.statusCode = 500;
        this._response.body = msg;
    }
    addMsg(msg){
        this._response.body= msg;
    }
}
module.exports = ResponseManager;