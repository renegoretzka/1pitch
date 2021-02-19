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

exports.handler = async (event, _, callback) => {
  const {
    fieldName,
    identity,
    arguments: { input }
  } = event

  console.log(event)

  switch (fieldName) {
    case 'createStartup':
      return createStartup(input, identity)
    case 'updateStartup':
      //checkAuthorization(authorized, callback)
      return updateModel(input, process.env.API_1PITCH_STARTUPTABLE_NAME)
    case 'deleteStartup':
      //checkAuthorization(authorized, callback)
      return deleteStartup(input)
    case 'createIndustryStartupLink':
      return createIndustryStartupLink(input)
    case 'deleteIndustryStartupLink':
      return deleteIndustryStartupLink(input)

    case 'createInvestor':
      return createInvestor(input, identity)
    case 'updateInvestor':
      //checkAuthorization(authorized, callback)
      return updateModel(input, process.env.API_1PITCH_INVESTORTABLE_NAME)
    case 'deleteInvestor':
      //checkAuthorization(authorized, callback)
      return deleteInvestor(input)
    case 'createIndustryInvestorLink':
      //checkAuthorization(authorized, callback)
      return createIndustryInvestorLink(input)
    case 'deleteIndustryInvestorLink':
      //checkAuthorization(authorized, callback)
      return deleteIndustryInvestorLink(input)

    case 'createTeamUserLink':
      //checkAuthorization(authorized, callback)
      return createTeamUserLink(input)
    case 'updateTeamUserLink':
      //checkAuthorization(authorized, callback)
      return updateModel(input, process.env.API_1PITCH_TEAMUSERLINKTABLE_NAME)
    case 'deleteTeamUserLink':
      //checkAuthorization(authorized, callback)
      return deleteTeamUserLink(input)
  }
}
