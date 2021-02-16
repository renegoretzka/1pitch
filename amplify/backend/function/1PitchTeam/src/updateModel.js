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
    ReturnValues: 'UPDATED_NEW'
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

  await ddb.update(params).promise()
  return model
}

module.exports = updateModel
