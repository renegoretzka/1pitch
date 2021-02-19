const aws = require('aws-sdk')
const ddb = new aws.DynamoDB.DocumentClient()

const deleteModel = async (model, table) => {
  const params = {
    TableName: table,
    Key: {
      id: model.id
    },
    Exists: true,
    ReturnValues: 'ALL_OLD'
  }
  try {
    const deletedItem = await ddb.delete(params).promise()
    return deletedItem.Attributes
  } catch (error) {
    console.log('DynamoDB Error: ', error)
    return null
  }
}
module.exports = deleteModel
