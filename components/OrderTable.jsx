/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import data from './data.json'; // Assuming the JSON data is in the same directory

const OrderTable = () => {
  // Define table columns
  const columns = React.useMemo(
    () => [
      { Header: 'ORDER ID', accessor: 'Orderid' },
      { Header: 'TYPES', accessor: 'Type' },
      { Header: 'LISTING ID', accessor: 'ListingId' },
      { Header: 'TICKET ENTRIES', accessor: 'TicketEntries' },
      { Header: 'DATE', accessor: 'Date' },
      { Header: 'PAYMENT METHODS', accessor: 'PaymentMethods' },
      { Header: 'STATUS', accessor: 'Status' },
      { Header: 'PAYMENT AMOUNT', accessor: 'Payment amount' },
    ],
    []
  );

  // Create table instance and apply necessary hooks
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 25 }, // Initial pagination state
    },
    useSortBy,
    usePagination
  );

  // Render the table component
  return (
    <div className='relative overflow-hidden'>
      <img src='/assets//MainLogo.png' className='absolute top-28 right-[-750px]' alt='' />
      <img src='/assets/PURCHASEHISTORY.png' className='absolute top-[34rem] right-1' alt='' />
      <div className='ml-16'>
        <div className='text-golden uppercase text-[25px] mt-20'>purchase history</div>
        <div className='text-[18px] mt-4 mb-10'>In the purchase history section, you can review and manage all your Zimo orders. </div>
      </div>
      <div className='w-full flex flex-col items-center'>
        <table {...getTableProps()} className="table w-[90%]">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()} className=''>
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="border-b-2 border-silver text-golden pb-3"
                  >
                    {column.render('Header')}
                    <span className='text-black'>
                      {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      key={cell.id}
                      {...cell.getCellProps()}
                      className={`p-3 ${
                        ['TicketEntries', 'PaymentMethods', 'Payment amount'].includes(cell.column.id)
                          ? 'pl-10'
                          : ''
                      }`}
                    >
                      <div className="ml-2">{cell.render('Cell')}</div>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination mt-5">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className='m-3'>
            {'<<'}
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage} className='m-3'>
            {'<'}
          </button>
          {Array.from({ length: pageCount }, (_, index) => (
            <button key={index} onClick={() => gotoPage(index)} className={pageIndex === index ? 'active mx-1 text-golden' : 'mx-1'}>
              {index + 1}
            </button>
          ))}
          <button onClick={() => nextPage()} disabled={!canNextPage} className='m-3'>
            {'>'}
          </button>
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className='m-3'>
            {'>>'}
          </button>
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
