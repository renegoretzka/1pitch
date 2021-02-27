const { Auth } = require('aws-amplify')

const userExists = async ({ username }) => {
  // TODO: Change logic to a lambda function (https://dev.to/andthensumm/enforcing-attribute-uniqueness-in-cognito-with-aws-amplify-and-react-263f)
  try {
    const code = '000000'
    await Auth.confirmSignUp(username, code, {
      forceAliasCreation: false
    })
  } catch (error) {
    switch (error.code) {
      case 'UserNotFoundException':
        return { status: false, code: error.code }
      case 'NotAuthorizedException':
      case 'AliasExistsException':
      case 'CodeMismatchException':
      case 'ExpiredCodeException':
      case 'LimitExceededException':
        return { status: true, code: error.code }
      default:
        console.log('Error from userExists', error)
        return false
    }
  }
}

export default userExists
