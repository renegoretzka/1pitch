export const newMessage = /* GraphQL */ `
  subscription NewMessage {
    newMessage {
      id
      content
      createdAt
      sender {
        id
        firstname
        lastname
        avatar {
          bucket
          key
          region
        }
      }
      channel {
        id
        investor {
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
`
