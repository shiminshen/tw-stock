import React, { useState } from 'react'
import moment from 'moment'

import { Formik, Form, useField } from 'formik'

import { DateRangePicker } from 'react-dates'

import 'react-dates/lib/css/_datepicker.css'

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
  return (
    <Formik
      initialValues={{
        stockId: '',
        startDate: initialDate,
        endDate: initialDate
      }}
      onSubmit={(values /* , actions */) => {
        console.log(JSON.stringify(values, null, 2))
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
