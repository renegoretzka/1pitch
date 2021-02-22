const aws = require('aws-sdk')
const ddb = new aws.DynamoDB.DocumentClient()

const readModel = require('../helpers/readModel')
const deleteModel = require('../helpers/deleteModel')

const deleteIndustryStartupLink = async (input) => {
  const linkedIndustries = await readModel(
    input.startupID,
    process.env.API_1PITCH_INDUSTRYSTARTUPLINKTABLE_NAME,
    'startupID',
    'industriesByStartup'
  )
  const industry = linkedIndustries.find(
    (industry) => industry.industryID === input.industryID
  )

  const params = {
    TableName: process.env.API_1PITCH_STARTUPTABLE_NAME,
    Key: {
      id: input.startupID
    },
    UpdateExpression: `REMOVE industriesID[${industry.industryIndex}]`,
    ReturnValues: 'ALL_NEW'
  }
  await ddb.update(params).promise()

  return await deleteModel(
    {
      id: industry.id
    },
    process.env.API_1PITCH_INDUSTRYSTARTUPLINKTABLE_NAME
  )
}

module.exports = deleteIndustryStartupLink
