import { gql } from 'apollo-server-micro'

export default gql`
  type StockDaily {
    name: String
    buy: Int
    sell: Int
    volume: Int
    avgBuyPrice: Float
    avgSellPrice: Float
    profitRate: Float
  }

  extend type Query {
    stockDaily(stockId: String!, startDate: String, endDate: String): [StockDaily!]
  }
`
