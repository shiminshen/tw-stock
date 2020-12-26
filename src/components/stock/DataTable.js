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
const DefaultColumnFilter = ({ column: { filterValue, preFilteredRows, setFilter } }) => {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      placeholder={`Search ${count} records...`}
      onChange={(event) => {
        setFilter(event.target.value || undefined) // Set undefined to remove the filter entirely
      }}
    />
  )
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
const SliderColumnFilter = ({ column: { filterValue, setFilter, preFilteredRows, id } }) => {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={(event) => {
          setFilter(Number.parseInt(event.target.value, 10))
        }}
      />
      <button type="button" onClick={() => setFilter(undefined)}>
        Off
      </button>
    </>
  )
}

// Define a custom filter filter function!
const filterGreaterThan = (rows, id, filterValue) => {
  return rows.filter((row) => {
    const rowValue = row.values[id]
    return rowValue >= filterValue
  })
}

const DataTable = ({ data, loading }) => {
  const brokerData = useMemo(() => data?.stockDaily || [], [data])
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Buy',
        accessor: 'buy',
        filter: filterGreaterThan,
        Filter: SliderColumnFilter
      },
      {
        Header: 'Sell',
        accessor: 'sell',
        filter: filterGreaterThan,
        Filter: SliderColumnFilter
      },
      {
        Header: 'Volume',
        accessor: 'volume',
        filter: filterGreaterThan,
        Filter: SliderColumnFilter
      },
      {
        Header: 'Avg Buy Price',
        accessor: 'avgBuyPrice',
        // FIXME fix float in slider filter
        disableFilters: true,
        filter: filterGreaterThan,
        Filter: SliderColumnFilter
      },
      {
        Header: 'Avg Sell Price',
        accessor: 'avgSellPrice',
        disableFilters: true,
        // FIXME fix float in slider filter
        filter: filterGreaterThan,
        Filter: SliderColumnFilter
      }
    ],
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
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
    // VisibleColumns,
    // Pagination handling
    page
    // PageCount,
    // canNextPage,
    // canPreviousPage,
    // gotoPage,
    // nextPage,
    // previousPage
  } = tableInstance

  return loading ? (
    <div>loading</div>
  ) : (
    // Apply the table props
    <Table {...getTableProps()}>
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup, groupIndex) => (
            // Apply the header row props
            <tr key={groupIndex} {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column, columnIndex) => (
                  // Apply the header cell props
                  <Th key={columnIndex} {...column.getHeaderProps()}>
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
          page.map((row, rowIndex) => {
            // Prepare the row for display
            prepareRow(row)
            return (
              // Apply the row props
              <Tr key={rowIndex} {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell, cellIndex) => {
                    // Apply the cell props
                    const value = ['avgBuyPrice', 'avgSellPrice'].includes(cell.column.id)
                      ? cell.value.toFixed(2)
                      : cell.value
                    return (
                      <Td key={cellIndex} {...cell.getCellProps()}>
                        {value}
                      </Td>
                    )
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
