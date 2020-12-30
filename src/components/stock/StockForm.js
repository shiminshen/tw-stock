import React, { useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Formik, Form, useField } from 'formik'
import { gql } from '@apollo/client'
import { useLazyQuery } from '@apollo/react-hooks'

import { DateRangePicker } from 'react-dates'
import DataTable from './DataTable'

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

const StockForm = ({ initialFormData }) => {
  const [getStockDaily, { loading, data }] = useLazyQuery(GET_STOCK_DAILY)

  return (
    <Formik
      initialValues={initialFormData}
      onSubmit={(values /* , actions */) => {
        getStockDaily({ variables: values })
      }}
    >
      {({ values }) => (
        <>
          <StyledForm>
            <StockIdInput />
            <DatePicker />
            <Button type="submit">Search</Button>
          </StyledForm>
          <DataTable data={data} queryValues={values} loading={loading} />
        </>
      )}
    </Formik>
  )
}

export default StockForm
