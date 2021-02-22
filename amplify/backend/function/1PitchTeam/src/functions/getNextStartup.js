const aws = require('aws-sdk')
const ddb = new aws.DynamoDB.DocumentClient()
const readModel = require('../helpers/readModel')

const getNextStartup = async (investorID) => {
  const investor = await readModel(
    investorID,
    process.env.API_1PITCH_INVESTORTABLE_NAME
  )

  const bookmarks = await readModel(
    investorID,
    process.env.API_1PITCH_BOOKMARKTABLE_NAME,
    'investorID',
    'bookmarksByInvestor'
  )
  let FilterExpression = ''
  let ExpressionAttributeValues = {}

  FilterExpression += 'attribute_exists(pitch) '

  let bookmarkFilterExpression = ''
  let i = 1
  for (let bookmark of bookmarks) {
    const expression = `:bookmark${i++}`
    bookmarkFilterExpression += `${expression}${
      i <= bookmarks.length ? ', ' : ''
    }`
    ExpressionAttributeValues[expression] = bookmark.startupID
  }
  if (bookmarks.length > 0) {
    FilterExpression += `and NOT (id IN (${bookmarkFilterExpression})) `
  }

  let stageFilterExpression = ''
  i = 1
  for (let stage of investor[0].stages) {
    const expression = `:stage${i++}`
    stageFilterExpression += `${expression}${
      i <= investor[0].stages.length ? ', ' : ''
    }`
    ExpressionAttributeValues[expression] = stage
  }
  if (investor[0].stages.length > 0) {
    FilterExpression += `and stage IN (${stageFilterExpression}) `
  }

  let industryFilterExpression = ''
  i = 1
  for (let industryID of investor[0].industriesID) {
    const expression = `:industry${i++}`
    industryFilterExpression += `contains(industriesID, ${expression})${
      i <= investor[0].industriesID.length ? ' or ' : ''
    }`
    ExpressionAttributeValues[expression] = industryID
  }
  if (investor[0].industriesID.length > 0) {
    FilterExpression += `and (${industryFilterExpression}) `
  }

  ExpressionAttributeValues[':investMin'] = investor[0].capitalInvestMin
  FilterExpression += 'and capitalDemand >= :investMin '

  ExpressionAttributeValues[':investMax'] = investor[0].capitalInvestMax
  FilterExpression += 'and capitalDemand <= :investMax '

  ExpressionAttributeValues[':lookingForFunding'] = 'YES'

  const params = {
    TableName: process.env.API_1PITCH_STARTUPTABLE_NAME,
    IndexName: 'startupsLookingForFunding',
    KeyConditionExpression: 'lookingForFunding = :lookingForFunding',
    FilterExpression: FilterExpression,
    ExpressionAttributeValues: ExpressionAttributeValues,
    Limit: 1
  }

  const result = await ddb.query(params).promise()
  return result.Items[0]
}

module.exports = getNextStartup
