const readModel = require('../helpers/readModel')
const deleteModel = require('../helpers/deleteModel')

const deleteInvestor = async (input) => {
  const deletedInvestor = await deleteModel(
    input,
    process.env.API_1PITCH_INVESTORTABLE_NAME
  )
  const deletedTeam = await deleteModel(
    {
      id: deletedInvestor.teamID
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
    deletedInvestor.id,
    process.env.API_1PITCH_INDUSTRYINVESTORLINKTABLE_NAME,
    'investorID',
    'industriesByInvestor'
  )
  await Promise.all(
    linkedIndustries.map((industry) => {
      return deleteModel(
        industry,
        process.env.API_1PITCH_INDUSTRYINVESTORLINKTABLE_NAME
      )
    })
  )
  return deletedInvestor
}

module.exports = deleteInvestor
