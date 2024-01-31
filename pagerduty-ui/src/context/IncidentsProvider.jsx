import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const IncidentsContext = createContext();

export const useIncidentsContext = () => {
  return useContext(IncidentsContext);
};

export const IncidentsProvider = ({ children }) => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [acknowledgedIncidents, setAcknowledgedIncidents] = useState(0);
  const [triggeredIncidents, setTriggeredIncidents] = useState(0);
  const [resolvedIncidents, setResolvedIncidents] = useState(0);

  // Function to refresh the incidents data
  const refreshIncidents = useCallback(async () => {
    setLoading(true); // Indicate loading state started
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_PAGERDUTY_API_URL}/incidents`);
      if (response.ok) {
        const data = await response.json();
        setIncidents(data.incidents);
        setTotalIncidents(data.total_incidents);
        setAcknowledgedIncidents(data.acknowledged_incidents);
        setTriggeredIncidents(data.triggered_incidents);
        setResolvedIncidents(data.resolved_incidents);
        console.log("Fetched incidents")
      } else {
        throw response; 
      }
    } catch (e) {
      setError('An error occurred...');
      console.error('An error occurred;', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    async function loadIncidents() {
      console.log("Attempting to fetch incidents")
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_PAGERDUTY_API_URL}/incidents`);
        if (response.ok) {
          const data = await response.json();
          setIncidents(data.incidents);
          setTotalIncidents(data.total_incidents);
          setAcknowledgedIncidents(data.acknowledged_incidents);
          setTriggeredIncidents(data.triggered_incidents);
          setResolvedIncidents(data.resolved_incidents);
          console.log("Fetched incidents")
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
  }, []); // Since this is the initial load, you may not need a dependency array here.

  return (
    <IncidentsContext.Provider
      value={{
        incidents,
        loading,
        error,
        totalIncidents,
        acknowledgedIncidents,
        triggeredIncidents,
        resolvedIncidents,
        refreshIncidents,
      }}
    >
      {children}
    </IncidentsContext.Provider>
  );
};
