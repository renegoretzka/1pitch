const readModel = require('../helpers/readModel')
const deleteModel = require('../helpers/deleteModel')
const updateModel = require('../helpers/updateModel')

const deleteTeamUserLink = async (input) => {
  const deletedLink = await deleteModel(
    input,
    process.env.API_1PITCH_TEAMUSERLINKTABLE_NAME
  )

  const team = await readModel(
    deletedLink.teamID,
    process.env.API_1PITCH_TEAMTABLE_NAME
  )

  const GetLinkedChannels = async (team) => {
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
  const GetLinkedMessages = async (channel) => {
    return await readModel(
      channel.id,
      process.env.API_1PITCH_MESSAGETABLE_NAME,
      'channelID',
      'messagesByChannel'
    )
  }
  const linkedChannels = await GetLinkedChannels(team[0])
  let linkedMessages = []

  for (let channel of linkedChannels) {
    const i = channel.users.findIndex((user) => user === deletedLink.userID)
    channel.users.splice(i, 1)
    await updateModel(channel, process.env.API_1PITCH_CHANNELTABLE_NAME)
    linkedMessages = [...linkedMessages, ...(await GetLinkedMessages(channel))]
  }
  for (let message of linkedMessages) {
    const i = message.users.findIndex((user) => user === deletedLink.userID)
    message.users.splice(i, 1)
    await updateModel(message, process.env.API_1PITCH_MESSAGETABLE_NAME)
  }

  return deletedLink
}

module.exports = deleteTeamUserLink
