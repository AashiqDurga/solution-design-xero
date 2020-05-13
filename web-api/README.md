# Web API
 The web api will be developed based on the [contract](flight-api-spec.yml) supplied in this repo. The Contract follows an OpenAPI 3.0 Spec which serves as the consumers documention and can also be used to define the AWS API Gatewaty resouce endpoints for which applications will interact with. 

 I have choosen to use one api at this point for both mobile clients and digital information boards.

 You can view the hosted contract [here](https://app.swaggerhub.com/apis/AashiqDurga/flight-api/1.0)

 ## Technology
 Given the scope of this application a simple serverless archicture can be used to leverage both low costs and scalability provided by AWS. 

 ### API
  Serverless cli was used to create the [example](flight-api) application that has been provided. The specific AWS Lambda functions are written in Node with TypeScript.

  With the given approach we could use the API Gateway as an abstraction to other services we may want to build. We could also swap out our lambdas for containerized apis built on a different stack if we wish.
 
 ### CICD
 An example cicd pipeline (circle ci) has been provided to automate the deploments of our API. 
 This allows us to contiuously intergrate and get feedback from our system be it running unit tests or  publishing it to a staging environment for dummy apps and displays to consume.

 ### Database
 DynamoDB will be used as our datastore to keep things simple by leverageing managed services in AWS.
 We could also use an RDS (MS Sql Server) as I have provided an example data structure. 

 #### Data Model
The data model can be represented simple as a json object given a NoSql database will be used in this design.

Flight
```
 {
    "id":"1b22455e-20f7-4e9e-a48b-6505dcfe3539",
    "airline":"Air New Zealand",
    "flightNumber": "NZ06",
    "destination":"Melbourne",
    "scheduledDepartureTime":"2020-01-13T17:30:00.000Z",
    "estimateDepartureTime":"2020-01-13T17:30:00.000Z",
    "actualDepartureTime":"2020-01-13T17:30:00.000Z",
    "status":"On Time",
    "depatureGate":"G6"

} 
```
Subcription
```
{
    "id":"ff23afac-81c8-4395-9f4b-bdb1236d0b38",
    "userId": "03189378-6502-47d0-988d-344213ea453f",
    "flights":["ceab8c3d-07f3-49e2-ac30-ccf85d971151"]
}
```

Alterantive Design for a SQL database
![sql-db-design](sql-db-design.png)