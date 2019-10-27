
const Handler = require("./handler");
jest.mock("./dbManager");
test('POST test statuscode 200 all parameters',()=>{
    return Handler.createDevice({body:JSON.stringify({"deviceName":"test device","deviceData":{"data":"data from app test"}})}).then(data=> {
      expect(data.statusCode).toBe(200)  
    })
})
test('POST test new UUID is generated',()=>{
    return Handler.createDevice({body:JSON.stringify({"deviceName":"test device","deviceData":{"data":"data from app test"}})}).then(data=> {
        expect(data.statusCode).toBe(200) 
        expect(data.body.length).toBe(38)  
    })
})
test('POST test statuscode 500 when database fails',()=>{
    return Handler.createDevice({body:JSON.stringify({"deviceName":"fail","deviceData":{"data":"data from app test"}})}).then(data=> {
        expect(data.statusCode).toBe(500) 
    })
})
test('GET test statuscode 200 existing item',()=>{
    return Handler.getDevice({pathParameters:{id:"1"}}).then(data=> {
      expect(data.statusCode).toBe(200)  
    })
})
test('GET test statuscode 500 no item exists',()=>{
    return Handler.getDevice({pathParameters:{id:"-1"}}).then(data=> {
      expect(data.statusCode).toBe(500)  
    })
})
test('GET test statuscode 500 no id is sent',()=>{
    return Handler.getDevice({pathParameters:{}}).then(data=> {
      expect(data.statusCode).toBe(500)  
    })
})
test('PUT test statuscode 200 all parameters',()=>{
    return Handler.updateDevice({body:JSON.stringify({"deviceName":"ok","deviceData":{"data":"data from app test"}})}).then(data=> {
        expect(data.statusCode).toBe(200) 
    })
})
test('PUT test statuscode 500 database fails',()=>{
    return Handler.updateDevice({body:JSON.stringify({"deviceName":"fail","deviceData":{"data":"data from app test"}})}).then(data=> {
        expect(data.statusCode).toBe(500) 
    })
})
test('DELETE test statuscode 200 id is passed',()=>{
    return Handler.deleteDevice({pathParameters:{id:1}}).then(data=> {
        expect(data.statusCode).toBe(200);
    })
})
test('DELETE test statuscode 500 no id is passed',()=>{
    return Handler.deleteDevice({pathParameters:{}}).then(data=> {
        expect(data.statusCode).toBe(500);
    })
})

test('GET100 test statuscode 200 successful request',()=>{
    return Handler.getHundredDevices({}).then(data=> {
        expect(data.statusCode).toBe(200);
    })
})




