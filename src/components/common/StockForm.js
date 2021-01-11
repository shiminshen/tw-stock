import React from 'react'
import styled from 'styled-components'
import { Formik, Form } from 'formik'

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

const StockForm = ({
  searchInputName = 'stockId',
  initialFormData,
  queryAction,
  loading,
  queryData
}) => {
  const data = queryData

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
            <FormInput name={searchInputName} />
            <DatePicker />
            <Button type="submit">Search</Button>
          </StyledForm>
          <DataTable data={data} queryValues={values} loading={false} />
        </>
      )}
    </Formik>
  )
}

export default StockForm
