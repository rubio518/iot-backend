# Tyke
## Project - REST API - Backend
### To create the backend service I used the framework: ​ Serverless ​, which automates the
creation of the lambdas, api gateways and all the permissions needed inside an aws
account, I started with the plan to upload everything by myself using gulp but eventually I
### realized was taking too long so I decided to go with ​ Serverless, ​it was my first time using this
framework but it is pretty straightforward, and turned out to be very easy to use.
I created a single lambda function for every endpoint. Which are:
POST - https://5o089j87la.execute-api.us-east-1.amazonaws.com/dev/devices
GET - https://5o089j87la.execute-api.us-east-1.amazonaws.com/dev/devices/{id}
PUT - https://5o089j87la.execute-api.us-east-1.amazonaws.com/dev/devices
DELETE - https://5o089j87la.execute-api.us-east-1.amazonaws.com/dev/devices/{id}
GET - https://5o089j87la.execute-api.us-east-1.amazonaws.com/dev/devices
The POST to create a new device, GET to get a device by id, PUT to update a device,
DELETE to delete one device receiving the id, and a GET method that doesn't receive an id
and returns the latest 100 items in the database.
The device structure in the database is something like this:
{"created":"2019-10-27T19:57:22.617Z",
"deviceID":"fd8da290-f8f3-11e9-ac42-354c5c85c937",
"deviceName":"device 1test", "deviceData":{"sensors":5},
"firmwareRevision":"2",
"firmwareVersion":"1"}
I used DynamoDB since it integrates pretty well with the Lambdas, it is also used a lot in the
IOT industry.
**Tests**
For the tests I used the framework Jest, the project doesn't have too much business logic to
be able to add a lot of unit tests but I added some tests (kind of integration tests) that test all
the handlers, I also had to mock the databaseManager to be able to run the tests without
external connectivity.
to run the tests you only need to run the command:
$ npm test
The repository is:
https://github.com/len518/tyke-backend
## Frontend
Even though the frontend was not required, I created a simple frontend to test more easily
my application, I created it using bootstrap and vanilla javascript.
To create the frontend I used an s3 bucket configured as a static server and a cloudfront
CDN in front.
The endpoint is this:
[http://d74y12nrgydd1.cloudfront.net/](http://d74y12nrgydd1.cloudfront.net/)
The repository in gitlab is:
https://github.com/len518/tyke-frontend
## Assumptions
-AWS credentials,Serverless framework helps with the credentials by saving a file inside the
machine that uploads all the AWS resources.
To use different credentials you can execute the command:
serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE
--secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Or you can use environment variables since the framework checks if those are configured.
- I assumed the data storage is already created and managed, that's why I chose to use a
fully manage database DynamoDB, and I didn't automate the creation of this resource.
- You can execute and upload the stack by using the command:
serverless deploy
But before that you have to use:
npm install
- I created the application using node version: 10
