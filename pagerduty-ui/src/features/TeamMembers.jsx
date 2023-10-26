import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useTeamMembers } from "../lib/hooks/useTeamMembers";
import TeamMembersTable from "./team/TeamMembersTable";

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
          <TeamMembersTable data={teamMembers} totalPages={totalPages} onRowClick={handleOpenModal}/>
          {/* <ShowTeamMember isOpen={isModalOpen} onClose={handleCloseModal} data={selectedTeamMember} /> */}
        </div>
      </section>
      <section className="p-6 min-w-[400px]">
        <Sidebar />
      </section>
    </div>
  );
}

export default TeamMembers;