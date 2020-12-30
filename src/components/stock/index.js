import React from 'react'
import moment from 'moment'

import StockForm from './StockForm'

import 'react-dates/lib/css/_datepicker.css'

const Stock = ({ query }) => {
  const initialDate = moment().format('YYYYMMDD')

  const initialFormData = {
    stockId: query.stockId || '',
    startDate: query.startDate || initialDate,
    endDate: query.endDate || initialDate
  }

  return (
    <div>
      <h1>Stock Analysis</h1>
      <StockForm initialFormData={initialFormData} />
    </div>
  )
}

export default Stock
