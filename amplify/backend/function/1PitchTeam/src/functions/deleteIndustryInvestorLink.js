const aws = require('aws-sdk')
const ddb = new aws.DynamoDB.DocumentClient()

const readModel = require('../helpers/readModel')
const deleteModel = require('../helpers/deleteModel')

const deleteIndustryInvestorLink = async (input) => {
  const linkedIndustries = await readModel(
    input.investorID,
    process.env.API_1PITCH_INDUSTRYINVESTORLINKTABLE_NAME,
    'investorID',
    'industriesByInvestor'
  )
  const industry = linkedIndustries.find(
    (industry) => industry.industryID === input.industryID
  )

  const params = {
    TableName: process.env.API_1PITCH_INVESTORTABLE_NAME,
    Key: {
      id: input.investorID
    },
    UpdateExpression: `REMOVE industriesID[${industry.industryIndex}]`,
    ReturnValues: 'ALL_NEW'
  }
  await ddb.update(params).promise()

  return await deleteModel(
    {
      id: industry.id
    },
    process.env.API_1PITCH_INDUSTRYINVESTORLINKTABLE_NAME
  )
}

module.exports = deleteIndustryInvestorLink
