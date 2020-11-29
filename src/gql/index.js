import { ApolloServer } from 'apollo-server-micro'

import { initMongo, getMongoInstance } from './database'
import { typeDefs as stockType, resolvers as stockResolvers } from './stockDaily'

const typeDefs = [stockType];
const resolvers = [stockResolvers];

initMongo()

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    mongoClient: getMongoInstance()
  }),
  tracing: true,
})

export default apolloServer
