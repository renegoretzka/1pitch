const aws = require('aws-sdk')
const ddb = new aws.DynamoDB.DocumentClient()

const createModel = require('../helpers/createModel')

const createIndustryInvestorLink = async (input) => {
  const params = {
    TableName: process.env.API_1PITCH_INVESTORTABLE_NAME,
    Key: {
      id: input.investorID
    },
    UpdateExpression:
      'SET industriesID = list_append(if_not_exists(industriesID, :emptyList), :industryID)',
    ExpressionAttributeValues: {
      ':industryID': [input.industryID],
      ':emptyList': []
    },
    ReturnValues: 'ALL_NEW'
  }
  const updatedInvestor = await ddb.update(params).promise()
  const industryIndex = updatedInvestor.Attributes.industriesID.indexOf(
    input.industryID
  )

  return await createModel(
    { ...input, industryIndex },
    process.env.API_1PITCH_INDUSTRYINVESTORLINKTABLE_NAME,
    'IndustryInvestorLink'
  )
}

module.exports = createIndustryInvestorLink
