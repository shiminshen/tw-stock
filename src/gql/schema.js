import { gql } from 'apollo-server-micro'

export default gql`
  type Query {
    users: [User!]!
    test: String
  }
  type User {
    id: Int!
    firstName: String
  }
`
