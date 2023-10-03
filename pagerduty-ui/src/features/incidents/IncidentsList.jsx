// API_URL comes from the .env.development file
import React, { useState, useEffect } from "react";
import  { API_URL } from "../../constants"

function IncidentsList() {
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

  return <div>
    {incidents.map((incident) => (
      <div key={incident.id} className="incident-container">
        <h2>{incident.id}</h2>
        <p>{incident.description}</p>
        <p>{incident.urgency}</p>
        <p>{incident.resolved}</p>
        <p>{incident.acknowledged}</p>
        <p>{incident.assigned_to_id}</p>
        <p>{incident.created_at}</p>
      </div>
    ))};
  </div>
}

export default IncidentsList;