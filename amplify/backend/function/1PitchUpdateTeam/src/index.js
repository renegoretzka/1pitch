/* Amplify Params - DO NOT EDIT
	API_1PITCH_GRAPHQLAPIIDOUTPUT
	API_1PITCH_TEAMTABLE_ARN
	API_1PITCH_TEAMTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const aws = require("aws-sdk");
const ddb = new aws.DynamoDB();

exports.handler = async (event) => {
  try {
    if (event.prev.result.authorized) {
      const params = {};
    }
    console.log(event);
    return {
      authorized: isAuthorized,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};
