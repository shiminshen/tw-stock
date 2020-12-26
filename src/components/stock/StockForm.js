import React, { useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Formik, Form, useField } from 'formik'

import { DateRangePicker } from 'react-dates'

import 'react-dates/lib/css/_datepicker.css'

const Input = styled.input`
  padding: 11px 11px 9px;
  border-radius: 2px;
  border: 1px solid #dbdbdb;
  font-weight: 200;
  font-size: 19px;
  line-height: 24px;
`

const Button = styled.button`
  padding: 11px 11px 9px;
  border-radius: 2px;
  border: 1px solid #dbdbdb;
  font-weight: 200;
  font-size: 19px;
  line-height: 24px;
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
      <Input {...field} />
    </div>
  )
}

const StyledForm = styled(Form)`
  max-width: 768px;
  display: flex;
  justify-content: space-around;
`

const StockForm = ({ getStockDaily }) => {
  const initialDate = moment().format('YYYYMMDD')

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
        <StyledForm>
          <StockIdInput />
          <DatePicker />
          <Button type="submit">Search</Button>
        </StyledForm>
      )}
    </Formik>
  )
}

export default StockForm
