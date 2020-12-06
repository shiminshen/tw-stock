import { gql } from 'apollo-server-micro'

export default gql`
  type StockDaily {
    name: String
    date: String
    buy: Int
    sell: Int
    volume: Int
    avgBuyPrice: Int
    avgSellPrice: Int
    price: Int
    profitRate: Int
  }

  extend type Query {
    stockDaily(stockId: String): [StockDaily!]
  }
`
