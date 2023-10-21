// API_URL comes from the .env.development file
import React, { useState, useEffect } from "react";
import  { API_URL } from "../constants"
import IncidentsTable from "./incidents/IncidentsTable";
import Sidebar from "./sidebar"

function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  // Fetch incidents from the API
    useEffect(() => {
      async function loadIncidents() {
        try {
          const response = await fetch(`${API_URL}/incidents`);
          if (response.ok) {
            const json = await response.json();
            setIncidents(json);
          } else {
            throw response;
          }
        } catch (e) {
          setError("An error occurred...");
          console.log("An error occurred;", e);
        } finally {
          setLoading(false);
        }
      }
      loadIncidents();
    }, []);

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
            <p className="text-red-500">2 triggered</p>
            <p className="text-blue-500">1 acknowledged</p>
          </div>
        </div>
        <div>
          <IncidentsTable data={incidents} />
        </div>
      </section>
      <section className="p-6 min-w-[400px]">
        <Sidebar />
      </section>
    </div>
  );
}

export default Incidents;