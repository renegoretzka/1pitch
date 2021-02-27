const { Auth } = require('aws-amplify')

const resendConfirmation = async ({ username }) => {
  try {
    await Auth.resendSignUp(username)
    return true
  } catch (error) {
    console.log('Error from resendConfirmation', error)
  }
}

export default resendConfirmation
