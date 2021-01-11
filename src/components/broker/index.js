import React from 'react'
import moment from 'moment'
import { gql } from '@apollo/client'
import { useLazyQuery } from '@apollo/react-hooks'

import StockForm from 'components/common/StockForm'

import 'react-dates/lib/css/_datepicker.css'

const GET_BROKER_DAILY = gql`
  query brokerDaily($name: String!, $startDate: String!, $endDate: String!) {
    brokerDaily(name: $name, startDate: $startDate, endDate: $endDate) {
      name
      stockId
      buy
      sell
      volume
      avgBuyPrice
      avgSellPrice
      profitRate
    }
  }
`

const Stock = ({ query }) => {
  const [getStockDaily, { loading, data }] = useLazyQuery(GET_BROKER_DAILY)
  const initialDate = moment().format('YYYYMMDD')
  const queryData = data?.brokerDaily || []

  const initialFormData = {
    stockId: query.stockId || '',
    name: query.name || '',
    startDate: query.startDate || initialDate,
    endDate: query.endDate || initialDate
  }

  return (
    <div>
      <h1>Stock Analysis</h1>
      <StockForm
        searchInputName="name"
        initialFormData={initialFormData}
        queryAction={getStockDaily}
        loading={loading}
        queryData={queryData}
      />
    </div>
  )
}

export default Stock
