export const getUserByEmail = /* GraphQL */ `
  query GetUserByEmail($email: AWSEmail) {
    getUserByEmail(email: $email) {
      id
      email
      firstname
      avatar
      createdAt
    }
  }
`;

export const getUserAuthenticated = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstname
      lastname
      email
      phone
      avatar {
        bucket
        region
        key
      }
      bio
      birthday
      location
      createdAt
      updatedAt
    }
  }
`;
