import React, { useEffect, useState } from 'react'
import IncidentModal from './IncidentModal'
import { API_URL } from '../../constants';
import { useNavigate } from 'react-router';
import Switch from '@mui/material/Switch';
import { FormControlLabel, FormGroup } from '@mui/material';

export default function AddIncident({ isOpen, onClose }) {
  const [urgency, setUrgency] = useState('LOW');
  const [triggered, setTriggered] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [description, setDescription] = useState("");
  const [assigned_to_id, setAssignedToId] = useState("");
  const navigate = useNavigate();

  const incidentData = { urgency, triggered, acknowledged, resolved, description, assigned_to_id }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ incidentData }),
    });

    if (response.ok) {
      const { id } = await response.json();
      navigate(`/incidents/${id}`);
    } else {
      console.log("An error occurred.")
    }
  };

  return (
    isOpen && (
      <IncidentModal open={isOpen} onClose={() => setIsOpen(false)}>
        <p className='mb-4 text-3xl font-medium'>Add Incident</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='urgency'>Urgency:</label>
            <select
              id='urgency' 
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              required
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          </div>
          <FormGroup className='flex !flex-row'>

            <FormControlLabel control={<Switch defaultChecked />} label="Triggered" />
            <FormControlLabel control={<Switch />} label="Acknowledged" />
            <FormControlLabel control={<Switch />} label="Resolved" />
          </FormGroup>
          <div>
            <label htmlFor="description">Description:</label>
            <input 
              id='description'
              type="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Enter a description'
              required
            />
          </div>
          <div>
            <label htmlFor='urgency'>Assigned To:</label>
            <select
              id='assigned_to_id' 
              value={assigned_to_id}
              onChange={(e) => setAssignedToId(e.target.value)}
            >
              <option value="LOW">Team Member 1 id</option>
              <option value="MEDIUM">Team Member 2 id</option>
              <option value="HIGH">Team Member 3 id</option>
            </select>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </IncidentModal>
  ));
};

