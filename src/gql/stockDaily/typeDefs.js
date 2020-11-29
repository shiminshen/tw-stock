import { gql } from 'apollo-server-micro'

export default gql`
  type StockDaily {
    name: String
    date: String
    buy: Int
    sell: Int
    amount: Int
    price: Int
  }

  type Query {
    stocks: [StockDaily!]
  }
`
