const readModel = require('../helpers/readModel')

const authorizerStartup = async (startupID, identity, callback) => {
  try {
    const startup = await readModel(
      startupID,
      process.env.API_1PITCH_STARTUPTABLE_NAME
    )
    const teamID = startup[0].teamID

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

module.exports = authorizerStartup
