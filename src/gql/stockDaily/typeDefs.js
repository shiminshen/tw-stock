import { gql } from 'apollo-server-micro'

export default gql`
  type StockDaily {
    name: String
    buy: Int
    sell: Int
    avgBuyPrice: Int
    avgSellPrice: Int
  }

  extend type Query {
    stockDaily(stockId: String!, startDate: String, endDate: String): [StockDaily!]
  }
`
