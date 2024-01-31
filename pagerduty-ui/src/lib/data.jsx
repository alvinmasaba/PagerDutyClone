export const INCIDENTCOLUMNS = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Urgency',
    accessor: 'urgency',
  },
  {
    Header: 'Triggered',
    accessor: 'triggered',
    sortType: (rowA, rowB, columnId) => {
      const a = rowA.values[columnId]; 
      const b = rowB.values[columnId];

      // Treat boolean values as 1 (true) or 0 (false) for comparison
      return a ? 1 : 0 - (b ? 1 : 0); 
    }
  },
  {
    Header:'Acknowledged',
    accessor:'acknowledged',
    sortType: (rowA, rowB, columnId) => {
      const a = rowA.values[columnId]; 
      const b = rowB.values[columnId];

      // Treat boolean values as 1 (true) or 0 (false) for comparison
      return a ? 1 : 0 - (b ? 1 : 0); 
    }
  },
  {
    Header:'Resolved',
    accessor:'resolved',
    sortType: (rowA, rowB, columnId) => {
      const a = rowA.values[columnId]; 
      const b = rowB.values[columnId];

      // Treat boolean values as 1 (true) or 0 (false) for comparison
      return a ? 1 : 0 - (b ? 1 : 0); 
    }
  },
  {
    Header: 'Assigned',
    accessor: 'assigned_to_id'
  },
  {
    Header: 'Actions',
  },
  {
    Header:'Created At',
    accessor:'created_at',
  },
];

export const TEAMCOLUMNS = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'First Name',
    accessor: 'first_name',
  },
  {
    Header: 'Last Name',
    accessor: 'last_name',
  },
  {
    Header:'Email',
    accessor:'email',
  },
  {
    Header: 'On Call',
    accessor: 'on_call',
  },
  {
    Header: 'Actions',
  }
]