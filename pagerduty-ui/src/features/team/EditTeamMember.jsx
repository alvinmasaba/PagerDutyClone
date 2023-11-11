import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import TeamModal from './TeamModal';
import validator from "validator";
import useFetchTeamMember from '../../lib/hooks/useFetchTeamMember';

export default function EditTeamMember({ isOpen, onClose, id }) {
  const { teamMember } = useFetchTeamMember(id);
  const [message, setMessage] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setPhoneNumber] = useState("");
  const [avatar, setAvatar] = useState("");

  // Use useEffect to update the state when teamMember changes
  useEffect(() => {
      setFirstName(teamMember?.first_name || '');
      setLastName(teamMember?.last_name || '');
      setEmail(teamMember?.email || '');
      setPhoneNumber(teamMember?.number || '');
      setAvatar(teamMember?.avatar || '');
  }, [teamMember]);

  const updatedteamMember = { first_name, last_name, email, number, avatar }

  const validateEmail = (e) => {
    const email = e.target.value;

    if (validator.isEmail(email)) {
      setMessage("Thank you");
    } else {
      setMessage("Please, enter valid Email!");
    }react
  };

  function setFormValue(newTeamMemberVariable, teamMemberVariable, setState) {
     if (newTeamMemberVariable === null) {
       setState(teamMemberVariable);
       return teamMemberVariable
     } else {
       return newTeamMemberVariable
     };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_PAGERDUTY_API_URL}/team_members/${teamMember.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({team_member: updatedteamMember}),
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
        <p className='mb-2 pl-4 text-3xl font-medium self-start'>Edit Team Member</p>
        <form
          className='flex flex-col gap-8 pt-8 border-t border-gray-200 mb-4'
          onSubmit={handleSubmit}
        >
          <div className='flex justify-between'>
            <label htmlFor="first_name">First Name:</label>
            <input
              className='border border-gray-200 w-[70%] pl-2 focus:border-gray-400' 
              id='first_name'
              type="text"
              value={setFormValue(first_name, teamMember?.first_name, setFirstName)}
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
              type="text"
              value={setFormValue(last_name, teamMember?.last_name, setLastName)}
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
              value={setFormValue(email, teamMember?.email, setEmail)}
              onChange={(e) => validateEmail(setEmail(e.target.value))}
              placeholder='Email'
              required
            />
          </div>
          <div className='flex justify-between'>
            <label htmlFor="number">Phone Number:</label>
            <input
              className='border border-gray-200 w-[70%] pl-2 focus:border-gray-400' 
              id='number'
              type="tel"
              value={setFormValue(number, teamMember?.number, setPhoneNumber)}
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
              value={setFormValue(avatar, teamMember?.avatar, setAvatar)}
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
          </button>
          </div>
        </form>
      </TeamModal>
  ));
};

