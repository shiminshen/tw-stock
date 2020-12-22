import React from 'react'
import { parseISO, format } from 'date-fns'

const date = ({ dateString }) => {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}

export default date
