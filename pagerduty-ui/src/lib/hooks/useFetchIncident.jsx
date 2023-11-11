import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const useFetchIncident = (id) => {
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
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
  }}, [id]);

  return { incident, loading, error };
};

export default useFetchIncident;

