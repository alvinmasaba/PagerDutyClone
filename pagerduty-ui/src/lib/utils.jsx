export function incidentStatus(value) {
  if (value === true || value === 'true') {
    return <span className="h-[7px] w-[7px] rounded-[50%] inline-block bg-lime-500 shadow-activeGreen"></span>;
  } else {
    return <span className="h-[7px] w-[7px] rounded-[50%] inline-block bg-red-500 shadow-inactiveRed"></span>;
  }
};

export function checkStatus(cell) {
  if (cell.column.Header === 'Triggered' || cell.column.Header === 'Acknowledged' || 
      cell.column.Header === 'Resolved') {
    return incidentStatus(cell.value)
  } else {
    return cell.render('Cell')
  }
};