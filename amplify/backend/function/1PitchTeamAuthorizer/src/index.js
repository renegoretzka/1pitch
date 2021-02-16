/* Amplify Params - DO NOT EDIT
  API_1PITCH_GRAPHQLAPIIDOUTPUT
  API_1PITCH_TEAMUSERLINKTABLE_ARN
  API_1PITCH_TEAMUSERLINKTABLE_NAME
  ENV
  REGION
Amplify Params - DO NOT EDIT */

const aws = require('aws-sdk')
const ddb = new aws.DynamoDB()

exports.handler = async (event) => {
  try {
    const params = {
      ExpressionAttributeValues: {
        ':teamId': {
          S: event.arguments.input.id
        }
      },
      KeyConditionExpression: 'teamID = :teamId',
      ProjectionExpression: 'userID',
      IndexName: 'usersByTeam',
      TableName: process.env.API_1PITCH_TEAMUSERLINKTABLE_NAME
    }
    const members = await ddb.query(params).promise()

    const isAuthorized = members.Items.some(
      ({ userID }) => userID.S === event.identity.sub
    )
    console.log('user authorized:', isAuthorized)
    return {
      authorized: isAuthorized
    }
  } catch (error) {
    console.log(error)
    return error
  }
}
