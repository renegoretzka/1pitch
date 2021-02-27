const { Auth } = require('aws-amplify')

const signIn = async ({ username, password }) => {
  try {
    const user = await Auth.signIn(username, password)
    return user
  } catch (error) {
    if (error.code === 'UserNotConfirmedException') {
      throw new Error('USER_NOT_CONFIRMED')
    } else if (error.code === 'NotAuthorizedException') {
      throw new Error('AUTHORIZATION_ERROR')
    } else {
      throw new Error('Error from signIn', error)
    }
  }
}

export default signIn
