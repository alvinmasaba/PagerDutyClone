import React from 'react';
import CloseButton from 'react-bootstrap/CloseButton';

export default function IncidentModal({ children, onClose }) {
  return (
    <div 
      className='flex flex-col gap-4 
      p-4 rounded-md bg-white 
      sm:w-[500px] border border-gray-200 
      shadow-md fixed top-[50%] left-[50%] items-center 
      justify-center z-50 mx-auto
      translate-x-[-50%] translate-y-[-50%]'
    >
      <CloseButton 
        className='' 
        onClick={onClose}
      />
      {children}
    </div>
  );
}