const createModel = require('../helpers/createModel')

const createTeamUserLink = async (input) => {
  return await createModel(
    input,
    process.env.API_1PITCH_TEAMUSERLINKTABLE_NAME,
    'TeamUserLink'
  )
}

module.exports = createTeamUserLink
