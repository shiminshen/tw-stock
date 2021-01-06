import React from 'react'
import styled from 'styled-components'
import { useField } from 'formik'

const Input = styled.input`
  padding: 11px 11px 9px;
  border-radius: 2px;
  border: 1px solid #dbdbdb;
  font-weight: 200;
  font-size: 19px;
  line-height: 24px;
`

const FormInput = ({ name }) => {
  const [field] = useField(name)
  return (
    <div>
      {/* <label htmlFor="stockId">stockId</label> */}
      <Input {...field} />
    </div>
  )
}

export default FormInput
