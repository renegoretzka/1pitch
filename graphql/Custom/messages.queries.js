export const getMessagesForChannel = /* GraphQL */ `
  query GetMessagesForChannel($id: ID!, $nextToken: String) {
    getChannel(id: $id) {
      id
      messages(limit: 10, nextToken: $nextToken, sortDirection: DESC) {
        items {
          content
          createdAt
          id
          sender {
            avatar {
              bucket
              key
              region
            }
            firstname
            lastname
            id
          }
          channel {
            investor {
              name
              members {
                items {
                  user {
                    id
                  }
                }
              }
            }
            startup {
              members {
                items {
                  user {
                    id
                  }
                }
              }
            }
          }
        }
        nextToken
      }
    }
  }
`
