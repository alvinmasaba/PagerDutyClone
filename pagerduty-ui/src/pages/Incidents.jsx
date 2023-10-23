import React from 'react';
import { useTable } from 'react-table';

function Incidents() {
  // Sample data for the table
  const data = React.useMemo(
    () => [
      {
        id: 1,
        description: 'Sample Incident',
        urgency: 'HIGH',
        // ... other columns
      },
      // ... more rows
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Urgency',
        accessor: 'urgency',
      },
      // ... other columns
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
    <div>
      <h1>Incidents on all teams</h1>
      {/* Add subheadings and stats here */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Incidents;
