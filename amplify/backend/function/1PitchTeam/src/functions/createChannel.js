const createModel = require('../helpers/createModel')
const readModel = require('../helpers/readModel')

const createChannel = async (input) => {
  const startup = await readModel(
    input.startupID,
    process.env.API_1PITCH_STARTUPTABLE_NAME
  )
  const investor = await readModel(
    input.investorID,
    process.env.API_1PITCH_INVESTORTABLE_NAME
  )
  const startupMembers = await readModel(
    startup[0].teamID,
    process.env.API_1PITCH_TEAMUSERLINKTABLE_NAME,
    'teamID',
    'usersByTeam'
  )
  const investorMembers = await readModel(
    investor[0].teamID,
    process.env.API_1PITCH_TEAMUSERLINKTABLE_NAME,
    'teamID',
    'usersByTeam'
  )
  const combinedMembers = [...startupMembers, ...investorMembers]

  let members = []
  combinedMembers.map((member) => {
    members.push(member.userID)
  })
  const uniqueMembers = [...new Set(members)]

  const createdChannel = await createModel(
    {
      ...input,
      users: uniqueMembers
    },
    process.env.API_1PITCH_CHANNELTABLE_NAME,
    'Channel'
  )
  return createdChannel
}

module.exports = createChannel
