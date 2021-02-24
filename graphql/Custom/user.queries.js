export const getUserByEmail = /* GraphQL */ `
  query GetUserByEmail($email: AWSEmail!) {
    getUserByEmail(email: $email) {
      id
      email
      firstname
      avatar {
        bucket
        region
        key
      }
      createdAt
    }
  }
`

export const getUserAuthenticated = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      avatar {
        bucket
        key
        region
      }
      bio
      firstname
      email
      createdAt
      id
      lastname
      phone
      teams {
        items {
          role
          admin
          team {
            startup {
              capitalDemand
              name
              industries {
                items {
                  industry {
                    name
                  }
                }
              }
              stage
              summary
              lookingForFunding
              id
              pitch {
                bucket
                key
                region
              }
              members {
                items {
                  admin
                  role
                  user {
                    bio
                    avatar {
                      bucket
                      key
                      region
                    }
                    firstname
                    lastname
                    linkedIn
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
