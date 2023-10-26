import { useState, useEffect } from 'react';

export function useIncidents(currentPage) {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [acknowledgedIncidents, setAcknowledgedIncidents] = useState(0);
  const [triggeredIncidents, setTriggeredIncidents] = useState(0);
  const [resolvedIncidents, setResolvedIncidents] = useState(0);

  useEffect(() => {
    async function loadIncidents() {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_PAGERDUTY_API_URL}/incidents?page=${currentPage}`);
        if (response.ok) {
          const data = await response.json();
          setIncidents(data.incidents);
          setTotalIncidents(data.total_incidents);
          setAcknowledgedIncidents(data.acknowledged_incidents);
          setTriggeredIncidents(data.triggered_incidents);
          setResolvedIncidents(data.resolved_incidents);
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
  }, [currentPage]);

  return { incidents, loading, error, totalIncidents, acknowledgedIncidents, triggeredIncidents, resolvedIncidents };
}

