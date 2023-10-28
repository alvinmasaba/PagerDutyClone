import React from 'react';

export default function IncidentModal({ children, onClose }) {
  return (
    <div
      className='fixed top-0 left-0 
      h-[100vh] w-[100vw] bg-[rgba(128,128,128,0.5)] z-[1400]'
    >
      <div 
        className='flex flex-col gap-3 
        p-4 pb-8 rounded-md bg-white 
        sm:w-[500px] border border-gray-200 
        shadow-lg fixed top-[50%] left-[50%] items-center 
        justify-center mx-auto z-[1500]
        translate-x-[-50%] translate-y-[-50%]'
      >
        <button 
          type="button"
          onClick={() => {
            onClose();
          }}  
          className="bg-white rounded-md inline-flex
          items-center justify-center text-gray-400 
          hover:text-gray-500 hover:bg-gray-100 
          self-end"
        >
          <span className="sr-only">Close form</span>
          <svg 
            className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" 
            fill="none" viewBox="0 0 24 24" stroke="currentColor" 
            aria-hidden="true"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}