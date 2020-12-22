import { ApolloServer } from 'apollo-server-micro'
import { merge } from 'lodash'

import { initMongo, getMongoInstance } from './database'
import { typeDefs as StockDaily, resolvers as stockDailyResolvers } from './stockDaily'
import { typeDefs as StockList, resolvers as stockListResolvers } from './stockList'

const Query = `
  type Query {
    _empty: String
  }
`

const typeDefs = [Query, StockDaily, StockList]
const resolvers = merge(stockDailyResolvers, stockListResolvers)

initMongo()

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    mongoClient: getMongoInstance()
  }),
  tracing: true
})

export default apolloServer
