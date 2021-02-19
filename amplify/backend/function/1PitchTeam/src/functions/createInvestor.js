const createModel = require('../helpers/createModel')
const updateModel = require('../helpers/updateModel')

const createInvestor = async (input, identity) => {
  const createdInvestor = await createModel(
    input,
    process.env.API_1PITCH_INVESTORTABLE_NAME,
    'Investor'
  )
  const createdTeam = await createModel(
    {
      investorID: createdInvestor.id
    },
    process.env.API_1PITCH_TEAMTABLE_NAME,
    'Team'
  )
  await updateModel(
    {
      id: createdInvestor.id,
      teamID: createdTeam.id
    },
    process.env.API_1PITCH_INVESTORTABLE_NAME
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
  return createdInvestor
}

module.exports = createInvestor
