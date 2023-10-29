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
    Header: 'Assigned To',
    accessor: 'assigned_to_id'
  },
  {
    Header: ' ',
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
    Header:'On Call',
    accessor:'oncall',
  },
]