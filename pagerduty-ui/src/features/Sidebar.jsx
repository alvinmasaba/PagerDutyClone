import React from 'react';

function Sidebar() {
  return (
    <div 
      className='flex flex-col 
      items-center gap-2'
    >
      <button
        className='bg-logoGreen 
        text-white font-medium 
        py-4 rounded w-full'
      >
        Add Incident
      </button>
      <div 
        className='flex flex-col 
        bg-white w-full py-4
        rounded border border-gray-200'
      >
        <p className='mb-4 font-medium text-logoGreen px-6'>On Call Status</p>
        <p className='mb-4 text-3xl font-medium px-6'>Alvin Masaba</p>
        <div className='flex gap-2 mb-4 px-6'>
          <img 
            src="./profile-pic.png" 
            alt="Employee Avatar"
            className='h-12 w-12 rounded-full'
          />
          <div>
            <p className='font-medium'>
              Alvin Masaba
            </p>
            <p className='text-gray-500'>
              firstlast@gmail.com
            </p>
          </div>
        </div>
        <div 
          className='flex flex-col 
          border border-gray-200
          border-b-0 font-medium'
        >
          <p className='px-6 py-4'>You Are On Call For:</p>
          <div className='px-6'>
            <p className='bg-yellow-200 rounded-full w-fit p-1'>Dev Ops Escalation</p>
            <p className='bg-pink-200 rounded-full w-fit p-1'>Security Ops Escalation</p>
          </div>

        </div>
      </div>
      <div>

      </div>
    </div>
  );
}

export default Sidebar;