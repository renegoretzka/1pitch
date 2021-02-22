const aws = require('aws-sdk')
const ddb = new aws.DynamoDB.DocumentClient()

const createModel = require('../helpers/createModel')

const createIndustryStartupLink = async (input) => {
  const params = {
    TableName: process.env.API_1PITCH_STARTUPTABLE_NAME,
    Key: {
      id: input.startupID
    },
    UpdateExpression:
      'SET industriesID = list_append(if_not_exists(industriesID, :emptyList), :industryID)',
    ExpressionAttributeValues: {
      ':industryID': [input.industryID],
      ':emptyList': []
    },
    ReturnValues: 'ALL_NEW'
  }
  const updatedStartup = await ddb.update(params).promise()
  const industryIndex = updatedStartup.Attributes.industriesID.indexOf(
    input.industryID
  )
  return await createModel(
    { ...input, industryIndex },
    process.env.API_1PITCH_INDUSTRYSTARTUPLINKTABLE_NAME,
    'IndustryStartupLink'
  )
}

module.exports = createIndustryStartupLink
