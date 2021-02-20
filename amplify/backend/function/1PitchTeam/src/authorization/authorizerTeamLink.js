const readModel = require('../helpers/readModel')

const authorizerTeamLink = async (id, identity, callback) => {
  try {
    const team = await readModel(
      id,
      process.env.API_1PITCH_TEAMUSERLINKTABLE_NAME
    )
    const teamID = team[0].teamID

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

module.exports = authorizerTeamLink
