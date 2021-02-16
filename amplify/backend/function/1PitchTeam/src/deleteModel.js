const aws = require('aws-sdk')
const ddb = new aws.DynamoDB.DocumentClient()

const deleteModel = async (model, table) => {
  const params = {
    TableName: table,
    Key: {
      id: model.id
    }
  }
  try {
    await ddb.delete(params).promise()
    return model.id
  } catch (error) {
    console.log('DynamoDB Error: ', error)
  }
}
module.exports = deleteModel
