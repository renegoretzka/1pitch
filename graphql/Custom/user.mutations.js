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
        location
        bio
        linkedIn
        createdAt
        updatedAt
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
`
