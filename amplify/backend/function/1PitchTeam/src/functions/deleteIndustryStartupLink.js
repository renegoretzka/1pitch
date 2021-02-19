const readModel = require('../helpers/readModel')
const deleteModel = require('../helpers/deleteModel')

const deleteIndustryStartupLink = async (input) => {
  const linkedIndustries = await readModel(
    input.startupID,
    process.env.API_1PITCH_INDUSTRYSTARTUPLINKTABLE_NAME,
    'startupID',
    'industriesByStartup'
  )
  const industry = linkedIndustries.find(
    (industry) => industry.industryID === input.industryID
  )
  return await deleteModel(
    {
      id: industry.id
    },
    process.env.API_1PITCH_INDUSTRYSTARTUPLINKTABLE_NAME
  )
}

module.exports = deleteIndustryStartupLink
