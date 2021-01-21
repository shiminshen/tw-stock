import React from 'react'
import styled from 'styled-components'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/react-hooks'
import { ParentSize } from '@visx/responsive'

import StockChart from '../common/StockChart'

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

const ResponsiveContainer = styled.div`
  height: 100vh;
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

  return (
    <ResponsiveContainer>
      <ParentSize>
        {({ height, width }) => <StockChart height={height} width={width} data={stockData} />}
      </ParentSize>
    </ResponsiveContainer>
  )
}

export default Stock
