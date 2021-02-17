const aws = require('aws-sdk')
const ddb = new aws.DynamoDB.DocumentClient()
const { v4: uuid } = require('uuid')

const createModel = async (model, table) => {
  model.id = uuid()
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
