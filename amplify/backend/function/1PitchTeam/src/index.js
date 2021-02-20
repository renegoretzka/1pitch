/* Amplify Params - DO NOT EDIT
	API_1PITCH_GRAPHQLAPIIDOUTPUT
	API_1PITCH_INDUSTRYINVESTORLINKTABLE_ARN
	API_1PITCH_INDUSTRYINVESTORLINKTABLE_NAME
	API_1PITCH_INDUSTRYSTARTUPLINKTABLE_ARN
	API_1PITCH_INDUSTRYSTARTUPLINKTABLE_NAME
	API_1PITCH_INDUSTRYTABLE_ARN
	API_1PITCH_INDUSTRYTABLE_NAME
	API_1PITCH_INVESTORTABLE_ARN
	API_1PITCH_INVESTORTABLE_NAME
	API_1PITCH_STARTUPTABLE_ARN
	API_1PITCH_STARTUPTABLE_NAME
	API_1PITCH_TEAMTABLE_ARN
	API_1PITCH_TEAMTABLE_NAME
	API_1PITCH_TEAMUSERLINKTABLE_ARN
	API_1PITCH_TEAMUSERLINKTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const updateModel = require('./helpers/updateModel')

const createStartup = require('./functions/createStartup')
const deleteStartup = require('./functions/deleteStartup')
const createIndustryStartupLink = require('./functions/createIndustryStartupLink')
const deleteIndustryStartupLink = require('./functions/deleteIndustryStartupLink')

const createInvestor = require('./functions/createInvestor')
const deleteInvestor = require('./functions/deleteInvestor')
const createIndustryInvestorLink = require('./functions/createIndustryInvestorLink')
const deleteIndustryInvestorLink = require('./functions/deleteIndustryInvestorLink')

const createTeamUserLink = require('./functions/createTeamUserLink')
const deleteTeamUserLink = require('./functions/deleteTeamUserLink')

const authorizerStartup = require('./authorization/authorizerStartup')
const authorizerInvestor = require('./authorization/authorizerInvestor')
const authorizerTeam = require('./authorization/authorizerTeam')
const authorizerTeamLink = require('./authorization/authorizerTeamLink')

exports.handler = async (event, _, callback) => {
  const {
    fieldName,
    identity,
    arguments: { input }
  } = event

  switch (fieldName) {
    case 'createStartup':
      return createStartup(input, identity)
    case 'updateStartup':
      if (!(await authorizerStartup(input.id, identity, callback))) break
      else updateModel(input, process.env.API_1PITCH_STARTUPTABLE_NAME)
    case 'deleteStartup':
      if (!(await authorizerStartup(input.id, identity, callback))) break
      else deleteStartup(input)
    case 'createIndustryStartupLink':
      if (!(await authorizerStartup(input.startupID, identity, callback))) break
      else createIndustryStartupLink(input)
    case 'deleteIndustryStartupLink':
      if (!(await authorizerStartup(input.startupID, identity, callback))) break
      else deleteIndustryStartupLink(input)

    case 'createInvestor':
      return createInvestor(input, identity)
    case 'updateInvestor':
      if (!(await authorizerInvestor(input.id, identity, callback))) break
      else updateModel(input, process.env.API_1PITCH_INVESTORTABLE_NAME)
    case 'deleteInvestor':
      if (!(await authorizerInvestor(input.id, identity, callback))) break
      else deleteInvestor(input)
    case 'createIndustryInvestorLink':
      if (!(await authorizerInvestor(input.investorID, identity, callback)))
        break
      else createIndustryInvestorLink(input)
    case 'deleteIndustryInvestorLink':
      if (!(await authorizerInvestor(input.investorID, identity, callback)))
        break
      else deleteIndustryInvestorLink(input)

    case 'createTeamUserLink':
      if (!(await authorizerTeam(input.teamID, identity, callback))) break
      else createTeamUserLink(input)
    case 'updateTeamUserLink':
      if (!(await authorizerTeamLink(input.id, identity, callback))) break
      else updateModel(input, process.env.API_1PITCH_TEAMUSERLINKTABLE_NAME)
    case 'deleteTeamUserLink':
      if (!(await authorizerTeamLink(input.id, identity, callback))) break
      else deleteTeamUserLink(input)
  }
}
