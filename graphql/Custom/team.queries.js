export const myTeams = /* GraphQL */ `
  query MyTeams {
    me {
      teams {
        items {
          team {
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