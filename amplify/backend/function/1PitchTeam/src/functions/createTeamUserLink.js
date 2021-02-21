const createModel = require('../helpers/createModel')
const readModel = require('../helpers/readModel')
const updateModel = require('../helpers/updateModel')

const createTeamUserLink = async (input) => {
  const createdLink = await createModel(
    input,
    process.env.API_1PITCH_TEAMUSERLINKTABLE_NAME,
    'TeamUserLink'
  )
  const team = await readModel(
    createdLink.teamID,
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
    channel.users = [...channel.users, createdLink.userID]
    await updateModel(channel, process.env.API_1PITCH_CHANNELTABLE_NAME)
    linkedMessages = [...linkedMessages, ...(await GetLinkedMessages(channel))]
  }
  for (let message of linkedMessages) {
    message.users = [...message.users, createdLink.userID]
    await updateModel(message, process.env.API_1PITCH_MESSAGETABLE_NAME)
  }

  return createdLink
}

module.exports = createTeamUserLink
