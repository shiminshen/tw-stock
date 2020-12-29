import React from 'react'
import withApollo from '../../src/lib/withApollo'

import Stock from '../../src/components/stock'

// Intialize before import react-dates
import 'react-dates/initialize'

const StockPage = ({ query }) => {
  return <Stock query={query} />
}

StockPage.getInitialProps = ({ query }) => ({ query })

export default withApollo(StockPage)
