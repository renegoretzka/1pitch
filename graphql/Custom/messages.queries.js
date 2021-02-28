export const getMessagesForChannel = /* GraphQL */ `
  query GetMessagesForChannel($id: ID!) {
    getChannel(id: $id) {
      id
      messages {
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
      }
    }
  }
`
