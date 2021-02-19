const readModel = require('../helpers/readModel')
const deleteModel = require('../helpers/deleteModel')

const deleteStartup = async (input) => {
  const deletedStartup = await deleteModel(
    input,
    process.env.API_1PITCH_STARTUPTABLE_NAME
  )
  const deletedTeam = await deleteModel(
    {
      id: deletedStartup.teamID
    },
    process.env.API_1PITCH_TEAMTABLE_NAME
  )
  const linkedMembers = await readModel(
    deletedTeam.id,
    process.env.API_1PITCH_TEAMUSERLINKTABLE_NAME,
    'teamID',
    'usersByTeam'
  )
  await Promise.all(
    linkedMembers.map((member) => {
      return deleteModel(member, process.env.API_1PITCH_TEAMUSERLINKTABLE_NAME)
    })
  )
  const linkedIndustries = await readModel(
    deletedStartup.id,
    process.env.API_1PITCH_INDUSTRYSTARTUPLINKTABLE_NAME,
    'startupID',
    'industriesByStartup'
  )
  await Promise.all(
    linkedIndustries.map((industry) => {
      return deleteModel(
        industry,
        process.env.API_1PITCH_INDUSTRYSTARTUPLINKTABLE_NAME
      )
    })
  )
  return deletedStartup
}

module.exports = deleteStartup
