/* Amplify Params - DO NOT EDIT
  API_1PITCH_GRAPHQLAPIIDOUTPUT
  API_1PITCH_USERTABLE_ARN
  API_1PITCH_USERTABLE_NAME
  AUTH_1PITCH_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const aws = require("aws-sdk");
const ddb = new aws.DynamoDB();

exports.handler = async (event, context) => {
  let date = new Date().toISOString();

  if (event.request.userAttributes.sub) {
    let params = {
      Item: {
        id: { S: event.request.userAttributes.sub },
        email: { S: event.request.userAttributes.email },
        createdAt: { S: date },
        updatedAt: { S: date },
      },
      TableName: process.env.API_1PITCH_USERTABLE_NAME,
    };
    try {
      await ddb.putItem(params).promise();
      console.log(
        "Successfully created new User from processUserSignUp Lambda function."
      );
    } catch (error) {
      console.log("Error from processUserSignUp Lambda function: ", error);
    }
    console.log(
      "processUserSignUp Lambda function: Everything executed correctly."
    );
    context.done(null, event);
  } else {
    console.log(
      "processUserSignUp Lambda function: Nothing was written to DynamoDB"
    );
    context.done(null, event);
  }
};
