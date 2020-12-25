import React, { useState } from 'react'
import styled from 'styled-components'
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
      buy
      sell
      avgBuyPrice
      avgSellPrice
    }
  }
`

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

const DataTable = ({ data, loading }) => {
  const brokerData = data?.stockDaily
  console.log(brokerData)
  return loading ? <div>loading</div> : <div>123</div>
}

const StockForm = ({ getStockDaily }) => {
  const initialDate = moment().format('YYYYMMDD')

  return (
    <Formik
      initialValues={{
        stockId: '',
        startDate: initialDate,
        endDate: initialDate,
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

const Stock = () => {
  const [getStockDaily, { loading, data }] = useLazyQuery(GET_STOCK_DAILY)

  return (
    <div>
      <h1>Stock Analysis</h1>
      <StockForm getStockDaily={getStockDaily} />
      <DataTable data={data} loading={loading} />
    </div>
  )
}

export default Stock
