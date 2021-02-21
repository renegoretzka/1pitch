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

  const GetLinkedChannels = async (startup) => {
    return await readModel(
      startup.id,
      process.env.API_1PITCH_CHANNELTABLE_NAME,
      'startupID',
      'channelsByStartup'
    )
  }
  const GetLinkedMessages = async (channel) => {
    return await readModel(
      channel.id,
      process.env.API_1PITCH_MESSAGETABLE_NAME,
      'channelID',
      'messagesByChannel'
    )
  }
  const linkedChannels = await GetLinkedChannels(deletedStartup[0])
  let linkedMessages = []

  for (let channel of linkedChannels) {
    await deleteModel(channel, process.env.API_1PITCH_CHANNELTABLE_NAME)
    linkedMessages = [...linkedMessages, ...(await GetLinkedMessages(channel))]
  }
  for (let message of linkedMessages) {
    await deleteModel(message, process.env.API_1PITCH_MESSAGETABLE_NAME)
  }

  return deletedStartup
}

module.exports = deleteStartup
