const readModel = require('../helpers/readModel')
const deleteModel = require('../helpers/deleteModel')

const deleteIndustryInvestorLink = async (input) => {
  const linkedIndustries = await readModel(
    input.investorID,
    process.env.API_1PITCH_INDUSTRYINVESTORLINKTABLE_NAME,
    'investorID',
    'industriesByInvestor'
  )
  const industry = linkedIndustries.find(
    (industry) => industry.industryID === input.industryID
  )
  return await deleteModel(
    {
      id: industry.id
    },
    process.env.API_1PITCH_INDUSTRYINVESTORLINKTABLE_NAME
  )
}

module.exports = deleteIndustryInvestorLink
