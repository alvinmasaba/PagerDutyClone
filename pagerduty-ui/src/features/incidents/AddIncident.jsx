import React, { useRef, useState } from 'react';
import IncidentModal from './IncidentModal';
import Switch from '@mui/material/Switch';
import { FormControlLabel, FormGroup } from '@mui/material';
import { useTeamMembers } from '../../lib/hooks/useTeamMembers';
import toast from 'react-hot-toast';
import { Rings } from 'react-loader-spinner';

export default function AddIncident({ isOpen, onClose }) {
  const [urgency, setUrgency] = useState('LOW');
  const [triggered, setTriggered] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [description, setDescription] = useState("");
  const [assigned_to_id, setAssignedToId] = useState("");
  const { teamMembers } = useTeamMembers();
  const ringsRef = useRef(null);

  const incidentData = { urgency, triggered, acknowledged, resolved, description, assigned_to_id }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show the spinner
    if (ringsRef.current) {
      ringsRef.current.wrapperStyle.display = 'block';
    }

    const response = await fetch(`${import.meta.env.VITE_REACT_APP_PAGERDUTY_API_URL}/incidents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({incident: incidentData}),
    });

    if (response.ok) {
      const { id } = await response.json();
      toast.success("Incident successfully created!");
      onClose();
    } else {
      toast.error("The incident could not be created!");
    }
  };

  return (
    isOpen && (
      <IncidentModal open={isOpen} onClose={onClose}>
        <p className='mb-2 pl-4 text-3xl font-medium self-start'>Add Incident</p>
        <form
          className='flex flex-col gap-8 pt-8 border-t border-gray-200 mb-4'
          onSubmit={handleSubmit}
        >
          <div className='flex justify-between'>
            <label htmlFor='urgency'>Urgency:</label>
            <select
              id='urgency' 
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              defaultValue={"LOW"}
              required
              className='border border-gray-200 w-[70%]'
            >
              <option value="" disabled>Select an urgency</option>
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          </div>
          <FormGroup className='flex !flex-row'>
            <FormControlLabel
              id='triggered' 
              control={
                <Switch 
                  checked={triggered}
                  onChange={() => setTriggered(prev => !prev)}
                />
              } 
              label="Triggered" 
            />
            <FormControlLabel 
              id='acknowledged'
              control={
                <Switch 
                  checked={acknowledged}
                  onChange={() => setAcknowledged(prev => !prev)}
                />
              }  
              label="Acknowledged" 
            />
            <FormControlLabel 
              id='resolved'
              control={
                <Switch 
                  checked={resolved}
                  onChange={() => setResolved(prev => !prev)}
                />
              }
              label="Resolved" 
            />
          </FormGroup>
          <div className='flex justify-between'>
            <label htmlFor="description">Description:</label>
            <input
              className='border border-gray-200 w-[70%] pl-2 focus:border-gray-400' 
              id='description'
              type="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Enter a description'
              required
            />
          </div>
          <div className='flex justify-between'>
            <label htmlFor='assigned_to_id'>Assigned To:</label>
            <select
                className='border border-gray-200 w-[70%]'
                id='assigned_to_id' 
                value={assigned_to_id}
                onChange={(e) => setAssignedToId(e.target.value)}
                required
            >
                <option value="" disabled selected>Assign to a team member</option>
                {teamMembers.map(member => (
                    <option key={member.id} value={member.id}>
                        {member.first_name} {member.last_name}
                    </option>
                ))}
            </select>
          </div>
          <div>
          <button
            className='bg-logoGreen 
            text-white font-medium 
            py-2 rounded w-full flex
            justify-center relative'
            type='submit'
          >
            Submit
            <Rings
              ref={ringsRef}
              height="25"
              width="25"
              color="white"
              radius="6"
              wrapperStyle={{display: 'none'}}
              wrapperClass="absolute right-[37.5%] self-center active:scale-105 disabled:scale-100
              disabled:bg-opacity-65"
              ariaLabel="rings-loading"
            />
          </button>
          </div>
        </form>
      </IncidentModal>
  ));
};

