const { Auth } = require('aws-amplify')

const forgotPasswordConfirmation = async ({ username, code, newPassword }) => {
  try {
    await Auth.forgotPasswordSubmit(username, code, newPassword)
    return true
  } catch (error) {
    if (error.code === 'CodeMismatchException') {
      throw new Error('CODE_MISMATCH')
    } else if (error.code === 'LimitExceededException') {
      throw new Error('LIMIT_EXCEEDED')
    } else {
      console.log('Error from forgotPasswordConfirmation', error)
    }
  }
}

export default forgotPasswordConfirmation
