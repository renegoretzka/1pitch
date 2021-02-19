const checkAuthorization = async (authorized, callback) => {
  if (!authorized) {
    callback(null, {
      errorMessage: 'You are not authorized to perform this action',
      errorType: 'UNAUTHORIZED'
    })
  }
}
