import React, { useState } from "react";
import { useTeamMembers } from "../lib/hooks/useTeamMembers";
import TeamMembersTable from "./team/TeamMembersTable";
import TeamSidebar from "./team/TeamSidebar";
import EditTeamMember from "./team/EditTeamMember";
import { toast } from "react-hot-toast";

function TeamMembers() {
  const { teamMembers, loading, error, totalTeamMembers } = useTeamMembers(1);
  const totalPages = Math.ceil(totalTeamMembers / 5);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);

  const handleOpenModal = (teamMemberData) => {
    setSelectedTeamMember(teamMemberData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTeamMember(null);
  };

  const deleteTeamMember = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this person?");

    if (confirmDelete) {
      try {
        // DELETE request to: localhost:3000/api/v1/incidents
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_PAGERDUTY_API_URL}/team_members/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          toast.success('Team member successfully deleted!');
        } else {
          toast.error('The team member could not be deleted');
          throw response;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  
  return (
    <div className="flex flex-row w-full">
      <section className="w-full pl-6">
        <h1 
          className="pr-6 py-4 text-3xl
          border-b-2 border-gray-300
          font-medium"
        >
          Team Members
        </h1>
        <div className="flex p-6 pl-0
          space-x-32 sm:space-x-48">
          <div className="flex flex-col gap-4 min-w-fit">
            <h3 className="font-semibold">Your Team</h3>
            <p className="text-lime-500">3 On Call</p>
            <p className="text-red-500">2 Off Duty</p>
          </div>
        </div>
        <div>
          <TeamMembersTable 
            data={teamMembers} 
            totalPages={totalPages} 
            onButtonClick={handleOpenModal} 
            deleteTeamMember={deleteTeamMember}
          />
          <EditTeamMember 
            isOpen={isModalOpen} 
            onClose={handleCloseModal}
            teamMemberData={selectedTeamMember}
          />
        </div>
      </section>
      <section className="p-6 min-w-[400px]">
        <TeamSidebar />
      </section>
    </div>
  );
}

export default TeamMembers;