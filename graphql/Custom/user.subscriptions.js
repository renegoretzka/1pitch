export const updatedUserAuthenticated = /* GraphQL */ `
  subscription UpdatedUser($id: ID!) {
    updatedUser(id: $id) {
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
            }
          }
        }
      }
    }
  }
`
