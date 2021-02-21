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
  let bookmarkFilter = []
  bookmarks.map((bookmark) => {
    bookmarkFilter = [...bookmarkFilter, bookmark.startupID]
  })

  const params = {
    TableName: process.env.API_1PITCH_STARTUPTABLE_NAME,
    FilterExpression: 'attribute_exists(pitch) and stage IN (:stages)',
    ExpressionAttributeValues: {
      ':stages': investor[0].stages.toString()
    },
    /*
 and NOT (id IN (:bookmarks))
       ':bookmarks': bookmarkFilter.join()
    */

    Limit: 10
  }
  console.log(params)
  const result = await ddb.scan(params).promise()
  console.log(result)
}

module.exports = getNextStartup
