import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const useFetchTeamMember = (id) => {
  const [teamMember, setTeamMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchCurrentTeamMember = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_REACT_APP_PAGERDUTY_API_URL}/team_members/${id}`);
          if (response.ok) {
            const json = await response.json();
            setTeamMember(json);
          } else {
            throw response;
          }
        } catch (e) {
          toast.error("An error occurred!");
          setError(e);
        } finally {
          setLoading(false);
        }
      };

      fetchCurrentTeamMember();
  }}, [id]);

  return { teamMember, loading, error };
};

export default useFetchTeamMember;

