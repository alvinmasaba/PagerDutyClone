import { AiOutlineEdit } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai'

export function showStatus(value) {
  if (value === true || value === 'true') {
    return <span className="h-[7px] w-[7px] rounded-[50%] inline-block bg-lime-500 shadow-activeGreen"></span>;
  } else {
    return <span className="h-[7px] w-[7px] rounded-[50%] inline-block bg-red-500 shadow-inactiveRed"></span>;
  }
};

export function checkStatus(cell, row, onButtonClick, deleteObject) {
  if (cell.column.Header === 'Triggered' || cell.column.Header === 'Acknowledged' || 
      cell.column.Header === 'Resolved' || cell.column.Header === 'On Call' ) {
    return showStatus(cell.value)
  } else if (cell.column.Header === 'Actions') {
    return (
      <div className='flex gap-3 items-center'>
        <button
          onClick={() => onButtonClick(row.original.id)}
        >
        <AiOutlineEdit
          className='hover:scale-110'
        />
      </button>
      <button
      onClick={() => deleteObject(row.original.id)}
      >
        <AiOutlineDelete 
          className='hover:scale-110'
        />
      </button>
      </div>
    )
  } else {
    return cell.render('Cell')
  }
};
