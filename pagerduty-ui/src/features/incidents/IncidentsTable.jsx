import React from 'react';
import { useTable } from 'react-table';

export default function IncidentsTable({ data }) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'assigned_to_id',
      },
      {
        Header: 'Urgency',
        accessor: 'urgency',
      },
      {
        Header: 'Triggered',
        accessor: 'triggered',
      },
      {
        Header:'Acknowledged',
        accessor:'acknowledged',
      },
      {
        Header:'Resolved',
        accessor:'resolved',
      },
      {
        Header:'Created At',
        accessor:'created_at',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table
      className='border border-collapse
      text-center sm:min-w-full
      bg-white rounded-lg' 
      {...getTableProps()}
    >
      <thead
        className='text-gray-500'>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                className='font-normal p-2'
                {...column.getHeaderProps()}>{column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr
              className='border border-gray-200
              hover:bg-cyan-100 hover:cursor-pointer
              ' 
              {...row.getRowProps()}
            >
              {row.cells.map(cell => (
                <td
                  className='p-4'
                  {...cell.getCellProps()}>{cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}