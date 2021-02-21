const aws = require('aws-sdk')
const ddb = new aws.DynamoDB.DocumentClient()

const deleteModel = async (model, tableName) => {
  const params = {
    TableName: tableName,
    Key: {
      id: model.id
    },
    Exists: true,
    ReturnValues: 'ALL_OLD'
  }
  try {
    const { Attributes } = await ddb.delete(params).promise()
    return Attributes
  } catch (error) {
    console.log('DynamoDB Error: ', error)
    return null
  }
}
module.exports = deleteModel
