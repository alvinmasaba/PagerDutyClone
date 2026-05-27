import { useState, useEffect } from 'react';
import { API_URL } from '../../constants';

export function useIncidents(currentPage) {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [acknowledgedIncidents, setAcknowledgedIncidents] = useState(0);
  const [triggeredIncidents, setTriggeredIncidents] = useState(0);
  const [resolvedIncidents, setResolvedIncidents] = useState(0);

  const fetchIncidents = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_PAGERDUTY_API_URL}/incidents?page=${page}`);
      if (response.ok) {
        const data = await response.json();
        setIncidents(data.incidents);
        setTotalIncidents(Number(data.total_incidents) || 0);
        setAcknowledgedIncidents(Number(data.acknowledged_incidents) || 0);
        setTriggeredIncidents(Number(data.triggered_incidents) || 0);
        setResolvedIncidents(Number(data.resolved_incidents) || 0);
        } else {
          throw new Error(`HTTP ${response.status}`);
      }
    } catch (e) {
      setError("An error occurred...");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchIncidents(currentPage);
  }, [currentPage]);
  
  const refresh = () => fetchIncidents(currentPage);

  return { incidents, loading, error, totalIncidents, acknowledgedIncidents, triggeredIncidents, resolvedIncidents, refresh };
}

