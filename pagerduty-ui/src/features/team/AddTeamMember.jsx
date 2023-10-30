import React, { useRef, useState } from 'react';
import Switch from '@mui/material/Switch';
import { FormControlLabel, FormGroup } from '@mui/material';
import toast from 'react-hot-toast';
import { Rings } from 'react-loader-spinner';
import IncidentModal from '../incidents/IncidentModal';

export default function AddTeamMember({ isOpen, onClose }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [onCall, setOnCall] = useState(false);
  const [shiftStart, setShiftStart] = useState('');
  const [shiftEnd, setShiftEnd] = useState('');
  const ringsRef = useRef(null);

  const teamMemberData = { firstName, lastName, email, phoneNumber, avatar, onCall, shiftStart, shiftEnd }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show the spinner
    if (ringsRef.current) {
      ringsRef.current.wrapperStyle.display = 'block';
    }

    const response = await fetch(`${import.meta.env.VITE_REACT_APP_PAGERDUTY_API_URL}/team-members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({team_member: teamMemberData}),
    });

    if (response.ok) {
      const { id } = await response.json();
      toast.success("Team Member successfully created!");
      onClose();
    } else {
      toast.error("Team Member could not be created!");
    }
  };

  return (
    isOpen && (
      <IncidentModal open={isOpen} onClose={onClose}>
        <p className='mb-2 pl-4 text-3xl font-medium self-start'>Add Team Member</p>
        <form
          className='flex flex-col gap-8 pt-8 border-t border-gray-200 mb-4'
          onSubmit={handleSubmit}
        >
          <div className='flex justify-between'>
            <label htmlFor="firstName">First Name:</label>
            <input
              className='border border-gray-200 w-[70%] pl-2 focus:border-gray-400' 
              id='firstName'
              type="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder='First name'
              required
            />
          </div>
          <div className='flex justify-between'>
            <label htmlFor="lastName">Last Name:</label>
            <input
              className='border border-gray-200 w-[70%] pl-2 focus:border-gray-400' 
              id='lastName'
              type="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder='Last name'
              required
            />
          </div>
          <div className='flex justify-between'>
            <label htmlFor="email">Email:</label>
            <input
              className='border border-gray-200 w-[70%] pl-2 focus:border-gray-400' 
              id='email'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              required
            />
          </div>
          <div className='flex justify-between'>
            <label htmlFor="phoneNumber">Phone:</label>
            <input
              className='border border-gray-200 w-[70%] pl-2 focus:border-gray-400' 
              id='phoneNumber'
              type="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder='Phone number'
              required
            />
          </div>
          <FormGroup className='flex !flex-row'>
            <FormControlLabel
              id='onCall' 
              control={
                <Switch 
                  checked={onCall}
                  onChange={() => setOnCall(prev => !prev)}
                />
              } 
              label="On Call" 
            />
          </FormGroup>
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

