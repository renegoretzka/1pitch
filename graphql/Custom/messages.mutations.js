export const createMessage = /* GraphQL */ `
  mutation CreateMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
      id
      senderID
      users
      channelID
      content
      createdAt
      updatedAt
      sender {
        id
        email
        firstname
        lastname
        location
        bio
        avatar {
          bucket
          key
          region
        }
        linkedIn
        createdAt
        updatedAt
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
