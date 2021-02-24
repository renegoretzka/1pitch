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
        location
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
export const updatedUser = /* GraphQL */ `
  subscription UpdatedUser($id: ID!) {
    updatedUser(id: $id) {
      id
      email
      firstname
      lastname
      location
      avatar {
        bucket
        region
        key
      }
      bio
      linkedIn
      createdAt
      updatedAt
      phone
      teams {
        nextToken
      }
    }
  }
`;
