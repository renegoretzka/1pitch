const createModel = require('../helpers/createModel')

const createIndustryStartupLink = async (input) => {
  return await createModel(
    input,
    process.env.API_1PITCH_INDUSTRYSTARTUPLINKTABLE_NAME,
    'IndustryStartupLink'
  )
}

module.exports = createIndustryStartupLink
