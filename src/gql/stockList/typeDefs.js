import { gql } from 'apollo-server-micro'

export default gql`
  extend type Query {
    stockList: [String]
  }
`
