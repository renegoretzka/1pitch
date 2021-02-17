/* Amplify Params - DO NOT EDIT
	API_1PITCH_GRAPHQLAPIIDOUTPUT
	API_1PITCH_TEAMTABLE_ARN
	API_1PITCH_TEAMTABLE_NAME
	API_1PITCH_TEAMUSERLINKTABLE_ARN
	API_1PITCH_TEAMUSERLINKTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const createModel = require('./createModel')
const readModel = require('./readModel')
const updateModel = require('./updateModel')
const deleteModel = require('./deleteModel')

class UnauthorizedError extends Error {
  constructor(message) {
    super(message)
    this.name = 'Unauthorized'
  }
}

exports.handler = async (
  { fieldName, identity, arguments: { input }, prev },
  context,
  callback
) => {
  switch (fieldName) {
    case 'createTeam':
      const createdTeam = await createModel(
        input,
        process.env.API_1PITCH_TEAMTABLE_NAME
      )
      await createModel(
        {
          teamID: createdTeam.id,
          userID: identity.sub
        },
        process.env.API_1PITCH_TEAMUSERLINKTABLE_NAME
      )
      return createdTeam
    case 'updateTeam':
      if (!prev.result.authorized) {
        callback(null, {
          errorMessage: 'You are not authorized to perform this action',
          errorType: 'UNAUTHORIZED'
        })
      }
      return await updateModel(input, process.env.API_1PITCH_TEAMTABLE_NAME)
    case 'deleteTeam':
      if (!prev.result.authorized) {
        callback(null, {
          errorMessage: 'You are not authorized to perform this action',
          errorType: 'UNAUTHORIZED'
        })
      }
      const deletedTeam = await deleteModel(
        input,
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
          return deleteModel(
            member,
            process.env.API_1PITCH_TEAMUSERLINKTABLE_NAME
          )
        })
      )

      return deletedTeam
  }
}
