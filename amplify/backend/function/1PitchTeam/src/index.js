/* Amplify Params - DO NOT EDIT
  API_1PITCH_GRAPHQLAPIIDOUTPUT
  API_1PITCH_TEAMTABLE_ARN
  API_1PITCH_TEAMTABLE_NAME
  ENV
  REGION
Amplify Params - DO NOT EDIT */

const updateModel = require('./updateModel')
const deleteModel = require('./deleteModel')

const TableName = process.env.API_1PITCH_TEAMTABLE_NAME
const team = {
  updateTeam: updateModel,
  deleteTeam: deleteModel
}

exports.handler = async (
  { fieldName, arguments: { input }, prev },
  { done, fail }
) => {
  try {
    if (prev.result.authorized) {
      await team[fieldName](input, TableName)
      done(null, input)
    } else {
      fail(null, 'Unauthorized')
    }
  } catch (error) {
    fail(null, error)
  }
}
