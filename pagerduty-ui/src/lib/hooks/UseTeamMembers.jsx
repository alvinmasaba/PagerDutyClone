import { useState, useEffect } from 'react';

export function useTeamMembers() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [totalTeamMembers, setTotalTeamMembers] = useState(0);
  const [onCall, setOnCall] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTeamMembers() {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_PAGERDUTY_API_URL}/team_members`);
        if (response.ok) {
          const data = await response.json();
          setTeamMembers(data.team_members);
          setTotalTeamMembers(data.total_team_members);
          setOnCall(data.on_call);
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
    loadTeamMembers();
  }, []);

  return { teamMembers, totalTeamMembers, loading, error, onCall };
}