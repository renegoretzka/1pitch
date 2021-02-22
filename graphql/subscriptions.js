/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addChannel = /* GraphQL */ `
  subscription AddChannel {
    addChannel {
      id
      users
      startupID
      investorID
      createdAt
      updatedAt
      startup {
        id
        name
        summary
        lookingForFunding
        industriesID
        stage
        capitalDemand
        teamID
        createdAt
        updatedAt
      }
      investor {
        id
        name
        summary
        industriesID
        stages
        capitalInvestMin
        capitalInvestMax
        teamID
        createdAt
        updatedAt
      }
      messages {
        nextToken
      }
    }
  }
`;
export const newMessage = /* GraphQL */ `
  subscription NewMessage {
    newMessage {
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
        bio
        linkedIn
        createdAt
        updatedAt
        phone
      }
      channel {
        id
        users
        startupID
        investorID
        createdAt
        updatedAt
      }
    }
  }
`;
