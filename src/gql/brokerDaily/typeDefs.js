import { gql } from 'apollo-server-micro'

export default gql`
  type BrokerDaily {
    name: String
    stockId: String
    buy: Int
    sell: Int
    volume: Int
    date: String
    avgBuyPrice: Float
    avgSellPrice: Float
    profitRate: Float
  }

  extend type Query {
    brokerDaily(name: String!, startDate: String, endDate: String): [StockDaily!]
    brokerStockDaily(
      stockId: String!
      name: String!
      startDate: String
      endDate: String
    ): [StockDaily!]
  }
`
