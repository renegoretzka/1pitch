const deleteModel = require('../helpers/deleteModel')

const deleteTeamUserLink = async (input) => {
  return await deleteModel(input, process.env.API_1PITCH_TEAMUSERLINKTABLE_NAME)
}

module.exports = deleteTeamUserLink
