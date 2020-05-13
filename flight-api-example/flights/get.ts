import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import "source-map-support/register";
import { GetItemOutput } from "aws-sdk/clients/dynamodb";
const dynamoDb = new DynamoDB.DocumentClient();

export const get: APIGatewayProxyHandler = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id, 
    },
  };
  dynamoDb.get(params, (error, result: GetItemOutput) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { "Content-Type": "text/plain" },
        body: "Couldn't fetch the todo item.",
      });
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };

    callback(null, response);
  });
};
