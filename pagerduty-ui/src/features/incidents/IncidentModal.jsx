import React from 'react'

export default function IncidentModal({ children, onClose }) {
  return (
    <div 
      className='flex flex-col gap-4 
      p-4 rounded bg-white/80 w-[400px] 
      sm:w-[750px] border border-gray-200 
      shadow-sm'
    >
      <button onClick={onClose}>Close</button>
      {children}
    </div>
  );
}