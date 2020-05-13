## Overview
The airline requires a way to update flight information when it changes. A basic front end application will be used hosted in a S3 bucket. Airlines will be able to access this via a *virtual private gateway* set up between their private network and our aws vpc.

## Client Application
A front-end client application built in react and Typescript using `npx create-react-app airline-ui --typescript` to scaffold the application.

 The application will get all flights for the specific airline by the "_airline_" property on each flight that matches the users JWT token permissions issued by AWS cognito. This will allow the airline to only update their flights and not another airline. This security measure can be re-enforced by configuring authorizers and pre-processing to the api gateway on PUT requests to the resource. 


## Web API
 The web api will be developed based on the [contract](airline-api-spec.yml) supplied in this repo. The Contract follows an OpenAPI 3.0 Spec which serves as the consumers documention and can also be used to define the AWS API Gateway resource endpoints for which the client react application will interact with. 

 You can view the hosted contract [here](https://app.swaggerhub.com/apis/AashiqDurga/airline-api/1.0)

 ## Technology
 Given the scope of this application a we can build on the serverless architecture being used by the web-api. 

 ### API

 We would need to stand up a new api gateway specific for updating information via the react app for airlines. This would act as a BFF for this app leveraging already existing lambdas that the web api is using. View the aws-infrastructure section to see how this fits in.

  Serverless cli can be used to create the  new lambda function that will update flight information in the existng dynamo DB. The specific AWS Lambda functions will be written in NodeJS with TypeScript very similar to the example provided in the web-api folder.

  With the given approach we could use the API Gateway as an abstraction to other services we may want to build. We could also swap out our lambdas for containerized apis built on a different stack if we wish in the future.
 
 ### CICD
 An example cicd pipeline (circle ci) has been provided to automate the deploments of our API. 
 This allows us to continuously intergrate and get feedback from our system be it running unit tests or  publishing it to a staging environment for dummy apps and displays to consume.

 ### Database
 We will use the database that has been described in web-api README