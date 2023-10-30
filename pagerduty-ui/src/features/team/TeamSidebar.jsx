import React, { useState } from 'react';
import AddTeamMember from './AddTeamMember';

function TeamSidebar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div 
      className='flex flex-col 
      items-center gap-2'
    >
      <button
        className='bg-logoGreen 
        text-white font-medium 
        py-4 rounded w-full'
        onClick={() => setShowModal(true)}
      >
        Add Team Member
      </button>
      <AddTeamMember isOpen={showModal} onClose={() => setShowModal(false)} />
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
          <div className='flex flex-col gap-2 px-6'>
            <p className='bg-yellow-200 rounded-full w-fit p-1'>DevOps Escalation</p>
            <p className='bg-pink-200 rounded-full w-fit p-1'>Security Ops Escalation</p>
          </div>
        </div>
      </div>
      <div
        className='flex flex-col 
        bg-white w-full py-4
        rounded border border-gray-200'
      >
        <p className='mb-2 font-medium text-logoGreen px-6'>ON CALL NOW</p>
        <p className='mb-2 text-lg font-medium px-6'>
          DevOps Escalation, Security Ops Escalation
        </p>
        <p className='px-6 mb-2 text-sm'>Your Shift:</p>
        <p className='px-6 mb-2 text-sm'>From: 2023-10-11</p>
        <p className='px-6 mb-2 text-sm'>To: 2023-10-18</p>
        <p className='px-6 mb-2 text-sm'>
          Contact <span className="text-blue-500 underline">adminstrator@admin.com</span> to
          make any changes to your shift.
        </p>
      </div>
    </div>
  );
}

export default TeamSidebar;