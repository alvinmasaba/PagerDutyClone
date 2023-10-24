import React from 'react'
import IncidentModal from './IncidentModal'

export default function ShowIncident({ isOpen, onClose, data }) {
  return (
    isOpen && (
      <IncidentModal open={isOpen} onClose={onClose}>
        <p className='mb-2 pl-4 text-3xl font-medium self-center'>Incident Details</p>
        <div
          className='flex flex-col gap-8 pt-8 border-t border-gray-200 mb-4'
        >
          <div className='flex'>
            <p className='font-medium w-[50%]'>Urgency:</p>
            <p>{data.urgency}</p>
          </div>
          <div className='flex'>
            <p className='font-medium w-[50%]'>Triggered:</p>
            <p>{data.triggered.toString()}</p>
          </div>
          <div className='flex'>
            <p className='font-medium w-[50%]'>Acknowledged:</p> 
            <p>{data.acknowledged.toString()}</p>
          </div>
          <div className='flex'>
            <p className='font-medium w-[50%]'>Resolved:</p>
            <p>{data.resolved.toString()}</p>
          </div>
          <div className='flex' >
            <p className='font-medium w-[50%]'>Description:</p>
            <p className='overflow-hidden'>{data.description}</p>
          </div>
          <div className='flex' >
            <p className='font-medium w-[50%]'>Assigned To:</p>
            <p>
              {data.assigned_to_id}
            </p>
          </div>
        </div>
      </IncidentModal>
  ));
};
