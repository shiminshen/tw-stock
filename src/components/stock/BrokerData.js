import React from 'react'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/react-hooks'

import 'react-dates/lib/css/_datepicker.css'

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
    }
  }
`

const Stock = ({ query }) => {
  const { stockId, brokerName: name, startDate, endDate } = query;
  const { loading, error, data } = useQuery(GET_STOCK_DAILY, {
    variables: {
      stockId,
      name,
      startDate,
      endDate
    }
  })

  return (
    <div>
      <h1>Stock Broker Analysis</h1>
      {JSON.stringify(data)}
    </div>
  )
}

export default Stock