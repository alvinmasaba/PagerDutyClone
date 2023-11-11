import React from 'react';
import { useTable } from 'react-table';
import { checkStatus } from '../../lib/utils';
import { INCIDENTCOLUMNS } from '../../lib/data';

export default function IncidentsTable({ data, onButtonClick, deleteIncident }) {
  const columns = React.useMemo(() => INCIDENTCOLUMNS, []);

  const tableInstance = useTable({
    columns,
    data,
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

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
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              className="border border-gray-200 hover:bg-cyan-100 hover:cursor-pointer"
              {...row.getRowProps()}
              // onClick={() => onRowClick(row.original)}
            >
              {row.cells.map((cell) => (
                <td className="p-4" {...cell.getCellProps()}>
                  {checkStatus(cell, row, onButtonClick, deleteIncident)}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
