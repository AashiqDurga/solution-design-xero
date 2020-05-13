import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import "source-map-support/register";

const dynamoDb = new DynamoDB.DocumentClient();

export const subscribe: APIGatewayProxyHandler = (event, context, callback) => {
  const data = JSON.parse(event.body);

  // validation
  if (typeof data.text !== "string" || typeof data.checked !== "boolean") {
    console.error("Validation Failed");
    callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "text/plain" },
      body: "Couldn't update the todo item.",
    });
    return;
  }

  const flightId = event.pathParameters.id;
  const params = {
    TableName: "Subcription",
    Key: {
      id: flightId,
    },
  };

  dynamoDb.update(params, (error, result) => {
    // handle potential errors
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
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
