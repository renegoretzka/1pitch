/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBookmark = /* GraphQL */ `
  mutation CreateBookmark($input: CreateBookmarkInput!) {
    createBookmark(input: $input) {
      id
      investorID
      startupID
      type
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
    }
  }
`;
export const updateBookmark = /* GraphQL */ `
  mutation UpdateBookmark($input: UpdateBookmarkInput!) {
    updateBookmark(input: $input) {
      id
      investorID
      startupID
      type
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
    }
  }
`;
export const deleteBookmark = /* GraphQL */ `
  mutation DeleteBookmark($input: DeleteBookmarkInput!) {
    deleteBookmark(input: $input) {
      id
      investorID
      startupID
      type
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
    }
  }
`;
export const createStartup = /* GraphQL */ `
  mutation CreateStartup($input: CreateStartupInput!) {
    createStartup(input: $input) {
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
      industriesID
      stage
      capitalDemand
      teamID
      createdAt
      updatedAt
      members {
        nextToken
      }
      channels {
        nextToken
      }
      industries {
        nextToken
      }
    }
  }
`;
export const updateStartup = /* GraphQL */ `
  mutation UpdateStartup($input: UpdateStartupInput!) {
    updateStartup(input: $input) {
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
      industriesID
      stage
      capitalDemand
      teamID
      createdAt
      updatedAt
      members {
        nextToken
      }
      channels {
        nextToken
      }
      industries {
        nextToken
      }
    }
  }
`;
export const deleteStartup = /* GraphQL */ `
  mutation DeleteStartup($input: DeleteStartupInput!) {
    deleteStartup(input: $input) {
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
      industriesID
      stage
      capitalDemand
      teamID
      createdAt
      updatedAt
      members {
        nextToken
      }
      channels {
        nextToken
      }
      industries {
        nextToken
      }
    }
  }
`;
export const createIndustryStartupLink = /* GraphQL */ `
  mutation CreateIndustryStartupLink($input: CreateIndustryStartupLinkInput!) {
    createIndustryStartupLink(input: $input) {
      id
      industryID
      startupID
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
      industry {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteIndustryStartupLink = /* GraphQL */ `
  mutation DeleteIndustryStartupLink($input: DeleteIndustryStartupLinkInput!) {
    deleteIndustryStartupLink(input: $input) {
      id
      industryID
      startupID
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
      industry {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;
export const createInvestor = /* GraphQL */ `
  mutation CreateInvestor($input: CreateInvestorInput!) {
    createInvestor(input: $input) {
      id
      name
      logo {
        bucket
        region
        key
      }
      summary
      industriesID
      stages
      capitalInvestMin
      capitalInvestMax
      teamID
      bookmarks {
        nextToken
      }
      createdAt
      updatedAt
      members {
        nextToken
      }
      channels {
        nextToken
      }
      industries {
        nextToken
      }
    }
  }
`;
export const updateInvestor = /* GraphQL */ `
  mutation UpdateInvestor($input: UpdateInvestorInput!) {
    updateInvestor(input: $input) {
      id
      name
      logo {
        bucket
        region
        key
      }
      summary
      industriesID
      stages
      capitalInvestMin
      capitalInvestMax
      teamID
      bookmarks {
        nextToken
      }
      createdAt
      updatedAt
      members {
        nextToken
      }
      channels {
        nextToken
      }
      industries {
        nextToken
      }
    }
  }
`;
export const deleteInvestor = /* GraphQL */ `
  mutation DeleteInvestor($input: DeleteInvestorInput!) {
    deleteInvestor(input: $input) {
      id
      name
      logo {
        bucket
        region
        key
      }
      summary
      industriesID
      stages
      capitalInvestMin
      capitalInvestMax
      teamID
      bookmarks {
        nextToken
      }
      createdAt
      updatedAt
      members {
        nextToken
      }
      channels {
        nextToken
      }
      industries {
        nextToken
      }
    }
  }
`;
export const createIndustryInvestorLink = /* GraphQL */ `
  mutation CreateIndustryInvestorLink(
    $input: CreateIndustryInvestorLinkInput!
  ) {
    createIndustryInvestorLink(input: $input) {
      id
      industryID
      investorID
      createdAt
      updatedAt
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
      industry {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteIndustryInvestorLink = /* GraphQL */ `
  mutation DeleteIndustryInvestorLink(
    $input: DeleteIndustryInvestorLinkInput!
  ) {
    deleteIndustryInvestorLink(input: $input) {
      id
      industryID
      investorID
      createdAt
      updatedAt
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
      industry {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;
export const createTeamUserLink = /* GraphQL */ `
  mutation CreateTeamUserLink($input: CreateTeamUserLinkInput!) {
    createTeamUserLink(input: $input) {
      id
      userID
      teamID
      role
      admin
      createdAt
      updatedAt
      user {
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
      team {
        id
        startupID
        investorID
        createdAt
        updatedAt
      }
    }
  }
`;
export const updateTeamUserLink = /* GraphQL */ `
  mutation UpdateTeamUserLink($input: UpdateTeamUserLinkInput!) {
    updateTeamUserLink(input: $input) {
      id
      userID
      teamID
      role
      admin
      createdAt
      updatedAt
      user {
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
      team {
        id
        startupID
        investorID
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteTeamUserLink = /* GraphQL */ `
  mutation DeleteTeamUserLink($input: DeleteTeamUserLinkInput!) {
    deleteTeamUserLink(input: $input) {
      id
      userID
      teamID
      role
      admin
      createdAt
      updatedAt
      user {
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
      team {
        id
        startupID
        investorID
        createdAt
        updatedAt
      }
    }
  }
`;
export const createChannel = /* GraphQL */ `
  mutation CreateChannel($input: CreateChannelInput!) {
    createChannel(input: $input) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      email
      firstname
      lastname
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      email
      firstname
      lastname
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      email
      firstname
      lastname
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
export const createIndustry = /* GraphQL */ `
  mutation CreateIndustry(
    $input: CreateIndustryInput!
    $condition: ModelIndustryConditionInput
  ) {
    createIndustry(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      startups {
        nextToken
      }
      investors {
        nextToken
      }
    }
  }
`;
export const updateIndustry = /* GraphQL */ `
  mutation UpdateIndustry(
    $input: UpdateIndustryInput!
    $condition: ModelIndustryConditionInput
  ) {
    updateIndustry(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      startups {
        nextToken
      }
      investors {
        nextToken
      }
    }
  }
`;
export const deleteIndustry = /* GraphQL */ `
  mutation DeleteIndustry(
    $input: DeleteIndustryInput!
    $condition: ModelIndustryConditionInput
  ) {
    deleteIndustry(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      startups {
        nextToken
      }
      investors {
        nextToken
      }
    }
  }
`;
