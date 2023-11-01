import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Rings } from 'react-loader-spinner';
import TeamModal from './TeamModal';

export default function EditIncident({ isOpen, onClose, teamMemberData }) {
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [number, setPhoneNumber] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const ringsRef = useRef(null);

  function setFormValue(newTeamMemberVariable, teamMemberVariable, setState) {
    if (newTeamMemberVariable === null) {
      setState(teamMemberVariable);
      return teamMemberVariable
    } else {
      return newTeamMemberVariable
    };
  }

  const updatedTeamMemberData = { first_name, last_name, email, number, avatar }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show the spinner
    if (ringsRef.current) {
      ringsRef.current.wrapperStyle.display = 'block';
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_PAGERDUTY_API_URL}/team_members/${teamMemberData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({team_member: updatedTeamMemberData}),
      });
  
      if (response.ok) {
        const { id } = await response.json();
        toast.success('Team Member successfully updated!');
        onClose();
      } else {
        toast.error('Team Member could not be updated!');
      }
    } catch(e) {
      console.log("An error occurred:", e)
    }
  };

  return (
    isOpen && (
      <TeamModal open={isOpen} onClose={onClose}>
        <p className='mb-2 pl-4 text-3xl font-medium self-start'>Edit Incident</p>
        <form
          className='flex flex-col gap-8 pt-8 border-t border-gray-200 mb-4'
          onSubmit={handleSubmit}
        >
          <div className='flex justify-between'>
            <label htmlFor="first_name">First Name:</label>
            <input
              className='border border-gray-200 w-[70%] pl-2 focus:border-gray-400' 
              id='first_name'
              type="first_name"
              value={setFormValue(first_name, teamMemberData?.first_name, setFirstName)}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder='First name'
              required
            />
          </div>
          <div className='flex justify-between'>
            <label htmlFor="last_name">Last Name:</label>
            <input
              className='border border-gray-200 w-[70%] pl-2 focus:border-gray-400' 
              id='last_name'
              type="last_name"
              value={setFormValue(last_name, teamMemberData?.last_name, setLastName)}
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
              value={setFormValue(email, teamMemberData?.email, setEmail)}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              required
            />
          </div>
          <div className='flex justify-between'>
            <label htmlFor="number">Phone Number:</label>
            <input
              className='border border-gray-200 w-[70%] pl-2 focus:border-gray-400' 
              id='number'
              type="number"
              value={setFormValue(number, teamMemberData?.number, setPhoneNumber)}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder='Phone Number'
              required
            />
          </div>
          <div className='flex justify-between'>
            <label htmlFor="avatar">Avatar:</label>
            <input
              className='border border-gray-200 w-[70%] pl-2 focus:border-gray-400' 
              id='avatar'
              type="avatar"
              value={setFormValue(avatar, teamMemberData?.avatar, setAvatar)}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder=''
            />
          </div>          
          <div>
          <button
            className='bg-logoGreen 
            text-white font-medium 
            py-2 rounded w-full flex
            justify-center relative'
            type='submit'
          >
            Save
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
      </TeamModal>
  ));
};

