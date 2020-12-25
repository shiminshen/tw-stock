import React, { useState } from 'react'
import { gql } from '@apollo/client'
import { useLazyQuery } from '@apollo/react-hooks'
import moment from 'moment'
import { Formik, Form, useField } from 'formik'

import { DateRangePicker } from 'react-dates'

import 'react-dates/lib/css/_datepicker.css'

const GET_STOCK_DAILY = gql`
  query stockDaily($stockId: String!, $startDate: String!, $endDate: String!) {
    stockDaily(stockId: $stockId, startDate: $startDate, endDate: $endDate) {
      name
      date
      buy
      sell
      volume
    }
  }
`

const DatePicker = () => {
  const [{ value: startDate }, , { setValue: setStartDate }] = useField('startDate')
  const [{ value: endDate }, , { setValue: setEndDate }] = useField('endDate')
  const [focusedInput, setFocusedInput] = useState()

  return (
    <DateRangePicker
      isOutsideRange={() => false}
      startDateId="startDate"
      startDate={moment(startDate)}
      endDateId="endDate"
      endDate={moment(endDate)}
      focusedInput={focusedInput}
      onDatesChange={({ startDate, endDate }) => {
        setStartDate(startDate?.format('YYYYMMDD'))
        setEndDate(endDate?.format('YYYYMMDD'))
      }}
      onFocusChange={setFocusedInput}
    />
  )
}

const StockIdInput = () => {
  const [field] = useField('stockId')
  return (
    <div>
      {/* <label htmlFor="stockId">stockId</label> */}
      <input {...field} />
    </div>
  )
}

const StockForm = () => {
  const initialDate = moment().format('YYYYMMDD')
  const [getStockDaily, { loading, data }] = useLazyQuery(GET_STOCK_DAILY)
  // TODO remove useless console
  console.log(loading)
  console.log(data)

  return (
    <Formik
      initialValues={{
        stockId: '',
        startDate: initialDate,
        endDate: initialDate
      }}
      onSubmit={(values /* , actions */) => {
        getStockDaily({ variables: values })
      }}
    >
      {() => (
        <Form>
          <StockIdInput />
          <DatePicker />
          <button type="submit">Search</button>
        </Form>
      )}
    </Formik>
  )
}

const Stock = () => {
  return (
    <div>
      <h1>Stock Analysis</h1>
      <StockForm />
    </div>
  )
}

export default Stock
