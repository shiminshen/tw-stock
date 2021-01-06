import { gql } from 'apollo-server-micro'

export default gql`
  type StockDaily {
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
    stockDaily(stockId: String!, startDate: String, endDate: String): [StockDaily!]
    stockBrokerDaily(
      stockId: String!
      name: String!
      startDate: String
      endDate: String
    ): [StockDaily!]
  }
`
