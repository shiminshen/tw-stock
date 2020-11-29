import { ApolloServer, gql } from 'apollo-server-micro'
import typeDefs from 'gql/schema'

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
