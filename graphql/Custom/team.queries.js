export const myTeams = /* GraphQL */ `
  query MyTeams {
    me {
      teams {
        items {
          team {
            id
            investor {
              createdAt
              id
              name
              stages
              summary
              capitalInvestMax
              capitalInvestMin
              members {
                items {
                  id
                  admin
                  role
                  user {
                    firstname
                    lastname
                    id
                    bio
                  }
                  createdAt
                }
              }
              logo {
                bucket
                key
                region
              }
            }
            startup {
              capitalDemand
              createdAt
              id
              logo {
                bucket
                key
                region
              }
              lookingForFunding
              name
              stage
              pitch {
                bucket
                key
                region
              }
              summary
              members {
                items {
                  admin
                  role
                  createdAt
                  user {
                    lastname
                    id
                    bio
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
export const getNextStartup = /* GraphQL */ `
  query GetNextStartup($input: GetNextStartupInput!) {
    getNextStartup(input: $input) {
      id
      name
      logo {
        bucket
        region
        key
      }
      summary
      pitch {
        bucket
        region
        key
      }
      lookingForFunding
      stage
      capitalDemand
      teamID
      createdAt
      updatedAt
      members {
        items {
          id
          role
          user {
            firstname
            lastname
            id
            bio
          }
          createdAt
        }
      }
      industries {
        items {
          industry {
            id
            name
          }
        }
      }
    }
  }
`
