export const updatedUserAuthenticated = /* GraphQL */ `
  subscription UpdatedUser($id: ID!) {
    updatedUser(id: $id) {
      id
      email
      phone
      firstname
      lastname
      avatar {
        bucket
        region
        key
      }
      bio
      linkedIn
    }
  }
`
