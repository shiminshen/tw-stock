import React from 'react'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/react-hooks'

import StockChart from './StockChart'

const GET_STOCK_DAILY = gql`
  query stockBrokerDaily(
    $stockId: String!
    $name: String!
    $startDate: String!
    $endDate: String!
  ) {
    stockBrokerDaily(stockId: $stockId, name: $name, startDate: $startDate, endDate: $endDate) {
      name
      buy
      sell
      volume
      avgBuyPrice
      avgSellPrice
      date
    }
  }
`

const Stock = ({ query }) => {
  const { stockId, brokerName: name, startDate, endDate } = query
  const { data } = useQuery(GET_STOCK_DAILY, {
    variables: {
      stockId,
      name,
      startDate,
      endDate
    }
  })

  const stockData = data?.stockBrokerDaily
  console.log(stockData)

  return (
    <div>
      <h1>Stock Broker Analysis</h1>
      <StockChart data={stockData} />
    </div>
  )
}

export default Stock
