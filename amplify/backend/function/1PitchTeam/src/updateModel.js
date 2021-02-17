const aws = require('aws-sdk')
const ddb = new aws.DynamoDB.DocumentClient()

const updateModel = async (model, table) => {
  const params = {
    TableName: table,
    Key: {
      id: model.id
    },
    UpdateExpression: '',
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
    ReturnValues: 'ALL_NEW'
  }
  let prefix = 'set '
  const attributes = Object.keys(model)

  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i]

    if (attribute !== 'id') {
      params.UpdateExpression += prefix + '#' + attribute + ' = :' + attribute
      params.ExpressionAttributeValues[':' + attribute] = model[attribute]
      params.ExpressionAttributeNames['#' + attribute] = attribute
      prefix = ', '
    }
  }
  try {
    const updatedItem = await ddb.update(params).promise()
    return { ...updatedItem.Attributes }
  } catch (error) {
    console.log('DynamoDB error: ', error)
    return null
  }
}

module.exports = updateModel
