const createModel = require('../helpers/createModel')
const updateModel = require('../helpers/updateModel')

const createStartup = async (input, identity) => {
  const createdStartup = await createModel(
    input,
    process.env.API_1PITCH_STARTUPTABLE_NAME,
    'Startup'
  )
  const createdTeam = await createModel(
    {
      startupID: createdStartup.id
    },
    process.env.API_1PITCH_TEAMTABLE_NAME,
    'Team'
  )
  await updateModel(
    {
      id: createdStartup.id,
      teamID: createdTeam.id
    },
    process.env.API_1PITCH_STARTUPTABLE_NAME
  )
  await createModel(
    {
      teamID: createdTeam.id,
      userID: identity.sub,
      admin: true
    },
    process.env.API_1PITCH_TEAMUSERLINKTABLE_NAME,
    'TeamUserLink'
  )
  return createdStartup
}

module.exports = createStartup
