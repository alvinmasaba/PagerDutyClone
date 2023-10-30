import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function EditIncident() {
  const [incident, setIncident] = useState(null);
  const { id } = useParams();
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
}

useEffect(() => {
  const fetchCurrentIncident = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_PAGERDUTY_API_URL}/incidents/${id}`);
      if (response.ok) {
        const json = await response.json();
        setIncident(json);
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
  fetchCurrentIncident();
}, [id]);

return { incident }
