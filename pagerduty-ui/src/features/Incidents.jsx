import React, { useState } from "react";
import IncidentsTable from "./incidents/IncidentsTable";
import Sidebar from "./Sidebar"
import { useIncidents } from "../lib/hooks/UseIncidents";
import ShowIncident from "./incidents/ShowIncident";

function Incidents() {
  const { incidents, loading, error, totalIncidents, 
          acknowledgedIncidents, triggeredIncidents, 
          resolvedIncidents, 
        } = useIncidents(1);
  
  const totalPages = Math.ceil(totalIncidents / 5);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);

  const handleOpenModal = (incidentData) => {
    setSelectedIncident(incidentData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIncident(null);
  };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;
  
  return (
    <div className="flex flex-row w-full">
      <section className="w-full pl-6">
        <h1 
          className="pr-6 py-4 text-3xl
          border-b-2 border-gray-300
          font-medium"
        >
          Incidents On All Teams
        </h1>
        <div className="flex p-6 pl-0
          space-x-32 sm:space-x-48">
          <div className="flex flex-col gap-4 min-w-fit">
            <h3 className="font-semibold">Your Open Incidents</h3>
            <p className="text-red-500">3 triggered</p>
            <p className="text-blue-500">2 acknowledged</p>
          </div>
          <div className="flex flex-col gap-4 min-w-fit">
            <h3 className="font-semibold">All Open Incidents</h3>
            <p className="text-red-500">{triggeredIncidents} triggered</p>
            <p className="text-blue-500">{acknowledgedIncidents} acknowledged</p>
          </div>
        </div>
        <div>
          <IncidentsTable data={incidents} totalPages={totalPages} onRowClick={handleOpenModal}/>
          <ShowIncident isOpen={isModalOpen} onClose={handleCloseModal} data={selectedIncident} />
        </div>
      </section>
      <section className="p-6 min-w-[400px]">
        <Sidebar />
      </section>
    </div>
  );
}

export default Incidents;