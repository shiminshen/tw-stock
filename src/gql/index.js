import { ApolloServer } from 'apollo-server-micro'
import { merge } from 'lodash'

import { initMongo, getMongoInstance } from './database'
import { typeDefs as StockList, resolvers as stockListResolvers } from './stockList'
import { typeDefs as StockDaily, resolvers as stockDailyResolvers } from './stockDaily'
import { typeDefs as BrokerList, resolvers as brokerListResolvers } from './brokerList'
import { typeDefs as BrokerDaily, resolvers as brokerStockResolvers } from './brokerDaily'

const Query = `
  type Query {
    _empty: String
  }
`

const typeDefs = [Query, StockDaily, StockList, BrokerList, BrokerDaily]
const resolvers = merge(
  stockDailyResolvers,
  stockListResolvers,
  brokerListResolvers,
  brokerStockResolvers
)

initMongo()

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    mongoClient: getMongoInstance(),
  }),
  tracing: true,
})

export default apolloServer
