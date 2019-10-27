const Response = require("./responseManager");
test('RESPONSE test cors headers on default response',()=>{
    let response = new Response();
    expect(response.getResponse().headers['Access-Control-Allow-Origin']).toBe('*');
    expect(response.getResponse().headers['Access-Control-Allow-Credentials']).toBe(true);
})
test('RESPONSE statuscode 200 default response',()=>{
    let response = new Response();
    expect(response.getResponse().statusCode).toBe(200);
})
test('RESPONSE statuscode 500 after addError()',()=>{
    let response = new Response();
    response.addError('error');
    expect(response.getResponse().statusCode).toBe(500);
})