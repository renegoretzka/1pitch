export const getUserByEmail = /* GraphQL */ `
  query GetUserByEmail($email: AWSEmail!) {
    getUserByEmail(email: $email) {
      id
      email
      firstname
      lastname
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
      email
      createdAt
      bio
      avatar {
        bucket
        key
        region
      }
      firstname
      id
      lastname
      linkedIn
      location
      phone
      teams {
        items {
          id
          admin
          role
          team {
            investor {
              capitalInvestMax
              capitalInvestMin
              createdAt
              id
              industries {
                items {
                  industry {
                    id
                    name
                  }
                }
              }
              logo {
                bucket
                key
                region
              }
              members {
                items {
                  role
                  admin
                  user {
                    id
                    email
                    firstname
                    lastname
                    avatar {
                      bucket
                      key
                      region
                    }
                    linkedIn
                  }
                }
              }
              name
              stages
              summary
              teamID
            }
            startup {
              capitalDemand
              createdAt
              id
              industries {
                items {
                  industry {
                    id
                    name
                  }
                }
              }
              logo {
                bucket
                key
                region
              }
              lookingForFunding
              members {
                items {
                  id
                  role
                  admin
                  user {
                    id
                    email
                    firstname
                    lastname
                    avatar {
                      bucket
                      key
                      region
                    }
                    linkedIn
                  }
                }
              }
              name
              pitch {
                bucket
                key
                region
              }
              stage
              summary
              teamID
            }
          }
        }
      }
    }
  }
`
