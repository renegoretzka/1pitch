const aws = require('aws-sdk')
const ddb = new aws.DynamoDB.DocumentClient()
const { v4: uuid } = require('uuid')

const createModel = async (model, table, typeName) => {
  let timestamp = new Date()
  timestamp = timestamp.toISOString()
  model = {
    ...model,
    id: uuid(),
    createdAt: timestamp,
    updatedAt: timestamp,
    __typename: typeName
  }
  const params = {
    TableName: table,
    Item: model
  }
  try {
    await ddb.put(params).promise()
    return model
  } catch (error) {
    console.log('DynamoDB Error: ', error)
    return null
  }
}
module.exports = createModel
