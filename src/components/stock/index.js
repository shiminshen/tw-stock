import React from 'react'
import moment from 'moment'
import { gql } from '@apollo/client'
import { useLazyQuery } from '@apollo/react-hooks'

import StockForm from './StockForm'
import DataTable from './DataTable'

import 'react-dates/lib/css/_datepicker.css'

const GET_STOCK_DAILY = gql`
  query stockDaily($stockId: String!, $startDate: String!, $endDate: String!) {
    stockDaily(stockId: $stockId, startDate: $startDate, endDate: $endDate) {
      name
      buy
      sell
      volume
      avgBuyPrice
      avgSellPrice
      profitRate
    }
  }
`

const Stock = ({ query = {} }) => {
  const [getStockDaily, { loading, data }] = useLazyQuery(GET_STOCK_DAILY)
  const initialDate = moment().format('YYYYMMDD')

  const initialFormData = {
    stockId: query.stockId || '',
    startDate: query.startDate || initialDate,
    endDate: query.endDate || initialDate,
  }

  return (
    <div>
      <h1>Stock Analysis</h1>
      <StockForm initialFormData={initialFormData} getStockDaily={getStockDaily} />
      <DataTable data={data} loading={loading} />
    </div>
  )
}

export default Stock
