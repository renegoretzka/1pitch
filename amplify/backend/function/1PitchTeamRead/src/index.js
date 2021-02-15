/* Amplify Params - DO NOT EDIT
	API_1PITCH_GRAPHQLAPIENDPOINTOUTPUT
	API_1PITCH_GRAPHQLAPIIDOUTPUT
	API_1PITCH_TEAMTABLE_ARN
	API_1PITCH_TEAMTABLE_NAME
	API_1PITCH_TEAMUSERLINKTABLE_ARN
	API_1PITCH_TEAMUSERLINKTABLE_NAME
	API_1PITCH_USERTABLE_ARN
	API_1PITCH_USERTABLE_NAME
	AUTH_1PITCH_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const aws = require("aws-sdk");
const ddb = new aws.DynamoDB();

let response;

exports.handler = async (event) => {
  try {
    console.log(event);
    const params = {
      ExpressionAttributeValues: {
        ":teamId": {
          S: event.source.id,
        },
      },
      KeyConditionExpression: "teamID = :teamId",
      ProjectionExpression: "userID",
      IndexName: "usersByTeam",
      TableName: process.env.API_1PITCH_TEAMUSERLINKTABLE_NAME,
    };
    const members = await ddb.query(params).promise();

    const isAuthorized = members.Items.some(
      ({ userID }) => userID.S === event.identity.sub
    );
    return {
      authorized: isAuthorized,
      response: event.source[event.info.fieldName],
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};
