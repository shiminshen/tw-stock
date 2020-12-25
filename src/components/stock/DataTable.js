import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useTable, usePagination, useFilters } from 'react-table'

const Table = styled.table`
  text-align: right;
`

const Tr = styled.tr``

const Th = styled.th`
  padding: 12px;
`

const Td = styled.td`
  padding: 12px;
`

// Define a default UI for filtering
const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

const DataTable = ({ data, loading }) => {
  const brokerData = useMemo(() => data?.stockDaily || [], [data])
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        filter: 'fuzzyText',
      },
      {
        Header: 'Buy',
        accessor: 'buy'
      },
      {
        Header: 'Sell',
        accessor: 'sell'
      },
      {
        Header: 'Volume',
        accessor: 'volume'
      },
      {
        Header: 'Avg Buy Price',
        accessor: 'avgBuyPrice'
      },
      {
        Header: 'Avg Sell Price',
        accessor: 'avgSellPrice'
      }
    ],
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const tableInstance = useTable(
    {
      columns,
      data: brokerData,
      defaultColumn,
      initialState: { pageIndex: 0 }
    },
    useFilters,
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state: { pageIndex, pageSize },
    // pagination handling
    page,
    pageCount,
    canNextPage,
    canPreviousPage,
    gotoPage,
    nextPage,
    previousPage
  } = tableInstance

  return loading ? (
    <div>loading</div>
  ) : (
    // apply the table props
    <Table {...getTableProps()}>
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => console.log(column) || (
                  // Apply the header cell props
                  <Th {...column.getHeaderProps()}>
                    {
                      // Render the header
                      column.render('Header')
                    }
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                  </Th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          page.map((row) => {
            // Prepare the row for display
            prepareRow(row)
            return (
              // Apply the row props
              <Tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    const value = ['avgBuyPrice', 'avgSellPrice'].includes(cell.column.id)
                      ? cell.value.toFixed(2)
                      : cell.value
                    return <Td {...cell.getCellProps()}>{value}</Td>
                  })
                }
              </Tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}

export default DataTable
