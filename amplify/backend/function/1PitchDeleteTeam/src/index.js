/* Amplify Params - DO NOT EDIT
  API_1PITCH_GRAPHQLAPIIDOUTPUT
  API_1PITCH_TEAMTABLE_ARN
  API_1PITCH_TEAMTABLE_NAME
  ENV
  REGION
Amplify Params - DO NOT EDIT */

const aws = require('aws-sdk')
const ddb = new aws.DynamoDB.DocumentClient()

// Edit table name here from your environment variable
const TableName = process.env.API_1PITCH_TEAMTABLE_NAME

exports.handler = async (event, { done, fail }) => {
  try {
    const args = event.arguments.input
    if (event.prev.result.authorized) {
      const params = {
        TableName: TableName,
        Key: {
          id: args.id
        }
      }
      await ddb.delete(params).promise()
      done(null, args)
    } else {
      fail(null, 'Unauthorized')
    }
  } catch (error) {
    console.log(error)
    fail(null, error)
  }
}
