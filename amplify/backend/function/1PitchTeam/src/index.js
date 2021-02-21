/* Amplify Params - DO NOT EDIT
	API_1PITCH_BOOKMARKTABLE_ARN
	API_1PITCH_BOOKMARKTABLE_NAME
	API_1PITCH_CHANNELTABLE_ARN
	API_1PITCH_CHANNELTABLE_NAME
	API_1PITCH_GRAPHQLAPIIDOUTPUT
	API_1PITCH_INDUSTRYINVESTORLINKTABLE_ARN
	API_1PITCH_INDUSTRYINVESTORLINKTABLE_NAME
	API_1PITCH_INDUSTRYSTARTUPLINKTABLE_ARN
	API_1PITCH_INDUSTRYSTARTUPLINKTABLE_NAME
	API_1PITCH_INDUSTRYTABLE_ARN
	API_1PITCH_INDUSTRYTABLE_NAME
	API_1PITCH_INVESTORTABLE_ARN
	API_1PITCH_INVESTORTABLE_NAME
	API_1PITCH_MESSAGETABLE_ARN
	API_1PITCH_MESSAGETABLE_NAME
	API_1PITCH_STARTUPTABLE_ARN
	API_1PITCH_STARTUPTABLE_NAME
	API_1PITCH_TEAMTABLE_ARN
	API_1PITCH_TEAMTABLE_NAME
	API_1PITCH_TEAMUSERLINKTABLE_ARN
	API_1PITCH_TEAMUSERLINKTABLE_NAME
	API_1PITCH_USERTABLE_ARN
	API_1PITCH_USERTABLE_NAME
	ENV
	REGION
  Amplify Params - DO NOT EDIT */

const readModel = require('./helpers/readModel')
const updateModel = require('./helpers/updateModel')
const deleteModel = require('./helpers/deleteModel')

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

const createChannel = require('./functions/createChannel')
const createMessage = require('./functions/createMessage')

const createBookmark = require('./functions/createBookmark')

const authorizerStartup = require('./authorization/authorizerStartup')
const authorizerInvestor = require('./authorization/authorizerInvestor')
const authorizerTeam = require('./authorization/authorizerTeam')
const authorizerTeamLink = require('./authorization/authorizerTeamLink')
const authorizerBookmark = require('./authorization/authorizerBookmark')
const getNextStartup = require('./functions/getNextStartup')

exports.handler = async (event, _, callback) => {
  const {
    fieldName,
    identity,
    arguments: { input }
  } = event

  console.log('Received request for Lambda:', fieldName)
  switch (fieldName) {
    case 'me':
      const user = await readModel(
        identity.sub,
        process.env.API_1PITCH_USERTABLE_NAME
      )
      return user[0]

    case 'getNextStartup':
      if (!(await authorizerInvestor(input.investorID, identity, callback)))
        break
      else return getNextStartup(input.investorID)
    case 'createBookmark':
      if (!(await authorizerInvestor(input.investorID, identity, callback)))
        break
      else return createBookmark(input)
    case 'updateBookmark':
      if (!(await authorizerBookmark(input.id, identity, callback))) break
      else return updateModel(input, process.env.API_1PITCH_BOOKMARKTABLE_NAME)
    case 'deleteBookmark':
      if (!(await authorizerBookmark(input.id, identity, callback))) break
      else return deleteModel(input, process.env.API_1PITCH_BOOKMARKTABLE_NAME)

    case 'createStartup':
      return createStartup(input, identity)
    case 'updateStartup':
      if (!(await authorizerStartup(input.id, identity, callback))) break
      else return updateModel(input, process.env.API_1PITCH_STARTUPTABLE_NAME)
    case 'deleteStartup':
      if (!(await authorizerStartup(input.id, identity, callback))) break
      else return deleteStartup(input)
    case 'createIndustryStartupLink':
      if (!(await authorizerStartup(input.startupID, identity, callback))) break
      else return createIndustryStartupLink(input)
    case 'deleteIndustryStartupLink':
      if (!(await authorizerStartup(input.startupID, identity, callback))) break
      else return deleteIndustryStartupLink(input)

    case 'createInvestor':
      return createInvestor(input, identity)
    case 'updateInvestor':
      if (!(await authorizerInvestor(input.id, identity, callback))) break
      else return updateModel(input, process.env.API_1PITCH_INVESTORTABLE_NAME)
    case 'deleteInvestor':
      if (!(await authorizerInvestor(input.id, identity, callback))) break
      else return deleteInvestor(input)
    case 'createIndustryInvestorLink':
      if (!(await authorizerInvestor(input.investorID, identity, callback)))
        break
      else return createIndustryInvestorLink(input)
    case 'deleteIndustryInvestorLink':
      if (!(await authorizerInvestor(input.investorID, identity, callback)))
        break
      else return deleteIndustryInvestorLink(input)

    case 'createTeamUserLink':
      if (!(await authorizerTeam(input.teamID, identity, callback))) break
      else return createTeamUserLink(input)
    case 'updateTeamUserLink':
      if (!(await authorizerTeamLink(input.id, identity, callback))) break
      else
        return updateModel(input, process.env.API_1PITCH_TEAMUSERLINKTABLE_NAME)
    case 'deleteTeamUserLink':
      if (!(await authorizerTeamLink(input.id, identity, callback))) break
      else return deleteTeamUserLink(input)

    case 'createChannel':
      // authorize user of startup or investor team
      return createChannel(input)
    case 'createMessage':
      // authorize user of startup or investor team
      return createMessage(input, identity)
  }
}
