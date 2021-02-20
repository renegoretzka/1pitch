const createModel = require('../helpers/createModel')
const readModel = require('../helpers/readModel')

const createMessage = async (input, identity) => {
  const channel = await readModel(
    input.channelID,
    process.env.API_1PITCH_CHANNELTABLE_NAME
  )

  const createdMessage = await createModel(
    {
      ...input,
      senderID: identity.sub,
      users: channel[0].users
    },
    process.env.API_1PITCH_MESSAGETABLE_NAME,
    'Message'
  )
  return createdMessage
}

module.exports = createMessage
