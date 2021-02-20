const readModel = require('../helpers/readModel')
const deleteModel = require('../helpers/deleteModel')
const updateModel = require('../helpers/updateModel')

const deleteTeamUserLink = async (input) => {
  const deletedLink = await readModel(
    input.id, //change back to input
    process.env.API_1PITCH_TEAMUSERLINKTABLE_NAME
  )

  const team = await readModel(
    deletedLink[0].teamID,
    process.env.API_1PITCH_TEAMTABLE_NAME
  )

  const GetLinkedChannels = async (team) => {
    // is working
    if (team.startupID) {
      return await readModel(
        team.startupID,
        process.env.API_1PITCH_CHANNELTABLE_NAME,
        'startupID',
        'channelsByStartup'
      )
    } else {
      return await readModel(
        team.investorID,
        process.env.API_1PITCH_CHANNELTABLE_NAME,
        'investorID',
        'channelsByInvestor'
      )
    }
  }
  const linkedChannels = await GetLinkedChannels(team[0])
  console.log(linkedChannels)
  /*
  linkedChannels.map(async (channel) => {
    console.log({ channel })
    const channelInfo = await readModel(
      channel.id,
      process.env.API_1PITCH_CHANNELTABLE_NAME
    )
    console.log({ channelInfo })
    const i = channelInfo[0].users.findIndex(user === deletedLink.userID)
    const newUserList = channelInfo[0].users.splice(i, 1)
    await updateModel(
      {
        ...channelInfo[0],
        users: newUserList
      },
      process.env.API_1PITCH_CHANNELTABLE_NAME
    )
  })
  */
  return deletedLink
}

module.exports = deleteTeamUserLink
