import { ApolloServer, gql } from 'apollo-server-micro'

const typeDefs = gql`
  type Query {
    users: [User!]!
    test: String
  }
  type User {
    id: Int!
    firstName: String
  }
`

const resolvers = {
  Query: {
    test (parent, args, context) {
      return 'yoyoyo'
    },
    users (parent, args, context) {
      return [{ firstName: 'Nextjs' }]
    },
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
