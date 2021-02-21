const readModel = require('../helpers/readModel')

const authorizerBookmark = async (bookmarkID, identity, callback) => {
  try {
    const bookmark = await readModel(
      bookmarkID,
      process.env.API_1PITCH_BOOKMARKTABLE_NAME
    )
    const investor = await readModel(
      bookmark[0].investorID,
      process.env.API_1PITCH_INVESTORTABLE_NAME
    )
    const members = await readModel(
      investor[0].teamID,
      process.env.API_1PITCH_TEAMUSERLINKTABLE_NAME,
      'teamID',
      'usersByTeam'
    )

    const isAuthorized = members.some(
      ({ userID, admin }) => userID === identity.sub && admin
    )
    if (!isAuthorized) {
      callback(null, {
        errorMessage: 'You are not authorized to perform this action',
        errorType: 'UNAUTHORIZED'
      })
      return false
    }
    return true
  } catch (error) {
    console.log('DynamoDB Error: ', error)
    return null
  }
}

module.exports = authorizerBookmark
