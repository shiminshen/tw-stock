import React from 'react'

const DataTable = ({ data, loading }) => {
  const brokerData = data?.stockDaily
  console.log(brokerData)
  return loading ? <div>loading</div> : <div>123</div>
}

export default DataTable
