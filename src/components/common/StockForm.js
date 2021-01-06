import React from 'react'
import styled from 'styled-components'
import { Formik, Form, useField } from 'formik'
import { gql } from '@apollo/client'
import { useLazyQuery } from '@apollo/react-hooks'

import DataTable from './DataTable'
import DatePicker from 'components/common/DatePicker'
import FormInput from 'components/common/FormInput'

const Button = styled.button`
  padding: 11px 11px 9px;
  border-radius: 2px;
  border: 1px solid #dbdbdb;
  font-weight: 200;
  font-size: 19px;
  line-height: 24px;
`

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

const StockForm = ({ initialFormData, queryAction, queryData }) => {
  const { loading, data } = queryData

  return (
    <Formik
      initialValues={initialFormData}
      onSubmit={(values /* , actions */) => {
        queryAction({ variables: values })
      }}
    >
      {({ values }) => (
        <>
          <StyledForm>
            <FormInput name="stockId" />
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
