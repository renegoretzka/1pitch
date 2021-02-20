const readModel = require('../helpers/readModel')

const authorizerTeam = async (teamID, identity, callback) => {
  try {
    const members = await readModel(
      teamID,
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

module.exports = authorizerTeam
