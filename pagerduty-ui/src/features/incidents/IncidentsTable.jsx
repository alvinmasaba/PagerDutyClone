import React from 'react';
import { useTable, usePagination } from 'react-table';
import { SimplePagination } from '../TablePagination';
import { checkStatus } from '../../lib/utils';
import { COLUMNS } from '../../lib/data';

export default function IncidentsTable({ data, totalPages, onRowClick }) {
  const columns = React.useMemo(() => COLUMNS, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // Pagination properties and methods
    page,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
      manualPagination: true,
    },
    usePagination
  );

  return (
    <table
      className="border border-collapse text-center sm:min-w-full bg-white rounded-lg"
      {...getTableProps()}
    >
      <thead className="text-gray-500">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th className="font-normal p-2" {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row);
          return (
            <tr
              className="border border-gray-200 hover:bg-cyan-100 hover:cursor-pointer"
              {...row.getRowProps()}
              onClick={() => onRowClick(row.original)}
            >
              {row.cells.map((cell) => (
                <td className="p-4" {...cell.getCellProps()}>
                  {checkStatus(cell)}
                </td>
              ))}
            </tr>
          );
        })}
        <SimplePagination
          currentPage={pageIndex + 1} // react-table uses 0-based index, so add 1
          totalPages={totalPages}
          onPageChange={gotoPage}
        />
      </tbody>
    </table>
  );
}
