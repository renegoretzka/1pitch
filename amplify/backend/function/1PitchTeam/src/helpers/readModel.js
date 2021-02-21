const aws = require('aws-sdk')
const ddb = new aws.DynamoDB.DocumentClient()

const readModel = async (
  key,
  tableName,
  keyName = 'id',
  indexName = undefined
) => {
  let params = {
    TableName: tableName,
    KeyConditionExpression: `${keyName} = :key`,
    ExpressionAttributeValues: {
      ':key': key
    }
  }
  if (indexName) {
    params.IndexName = indexName
  }
  try {
    const { Items } = await ddb.query(params).promise()
    return Items
  } catch (error) {
    console.log('DynamoDB Error: ', error)
    return null
  }
}
module.exports = readModel
