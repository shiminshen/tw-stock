import React from 'react'
import withApollo from '../../src/lib/withApollo'

import Broker from '../../src/components/broker'

// Intialize before import react-dates
import 'react-dates/initialize'

const StockPage = ({ query = {} }) => {
  return <Broker query={query} />
}

StockPage.getInitialProps = ({ query }) => ({ query })

export default withApollo(StockPage)
