import React from 'react'

import withApollo from 'lib/withApollo'

import BrokerData from 'components/stock/BrokerData'

// Intialize before import react-dates
import 'react-dates/initialize'

const StockWithStockIdPage = ({ query = {}}) => {
  return (
    <BrokerData query={query} />
  )
}

StockWithStockIdPage.getInitialProps = ({ query }) => ({ query })

export default withApollo(StockWithStockIdPage)
