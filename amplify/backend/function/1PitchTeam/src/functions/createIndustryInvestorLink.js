const createModel = require('../helpers/createModel')

const createIndustryInvestorLink = async (input) => {
  return await createModel(
    input,
    process.env.API_1PITCH_INDUSTRYINVESTORLINKTABLE_NAME,
    'IndustryInvestorLink'
  )
}

module.exports = createIndustryInvestorLink
