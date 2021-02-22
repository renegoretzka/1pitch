/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const me = /* GraphQL */ `
  query Me {
    me {
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
export const getUserByEmail = /* GraphQL */ `
  query GetUserByEmail($email: AWSEmail!) {
    getUserByEmail(email: $email) {
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
export const getBookmark = /* GraphQL */ `
  query GetBookmark($id: ID!) {
    getBookmark(id: $id) {
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
export const listBookmarks = /* GraphQL */ `
  query ListBookmarks(
    $filter: ModelBookmarkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookmarks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        investorID
        startupID
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getTeamUserLink = /* GraphQL */ `
  query GetTeamUserLink($id: ID!) {
    getTeamUserLink(id: $id) {
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
export const listTeamUserLinks = /* GraphQL */ `
  query ListTeamUserLinks(
    $filter: ModelTeamUserLinkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeamUserLinks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        teamID
        role
        admin
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listTeams = /* GraphQL */ `
  query ListTeams(
    $filter: ModelTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        startupID
        investorID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTeam = /* GraphQL */ `
  query GetTeam($id: ID!) {
    getTeam(id: $id) {
      id
      startupID
      investorID
      createdAt
      updatedAt
      members {
        nextToken
      }
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
export const listStartups = /* GraphQL */ `
  query ListStartups(
    $filter: ModelStartupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStartups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getStartup = /* GraphQL */ `
  query GetStartup($id: ID!) {
    getStartup(id: $id) {
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
export const listInvestors = /* GraphQL */ `
  query ListInvestors(
    $filter: ModelInvestorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInvestors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getInvestor = /* GraphQL */ `
  query GetInvestor($id: ID!) {
    getInvestor(id: $id) {
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
export const listChannels = /* GraphQL */ `
  query ListChannels(
    $filter: ModelChannelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChannels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        users
        startupID
        investorID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChannel = /* GraphQL */ `
  query GetChannel($id: ID!) {
    getChannel(id: $id) {
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
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        senderID
        users
        channelID
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listIndustrys = /* GraphQL */ `
  query ListIndustrys(
    $filter: ModelIndustryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIndustrys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getIndustry = /* GraphQL */ `
  query GetIndustry($id: ID!) {
    getIndustry(id: $id) {
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
