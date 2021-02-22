export const onUpdateUserAuthenticated = /* GraphQL */ `
  subscription OnUpdatedUser($id: ID!) {
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
      birthday
      location
      notifications {
        id
        type
        ad {
          id
          type
          price
          currency
          createdAt
          updatedAt
        }
        product {
          id
          name
          mainImage
          type
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
    }
  }
`;
