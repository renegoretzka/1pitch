const createModel = require('../helpers/createModel')

const createBookmark = async (input) => {
  return await createModel(
    input,
    process.env.API_1PITCH_BOOKMARKTABLE_NAME,
    'Bookmark'
  )
}

module.exports = createBookmark
