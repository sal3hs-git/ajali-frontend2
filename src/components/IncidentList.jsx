import { useEffect, useState } from 'react';

import { API_BASE_URL } from "../../config"

function IncidentList() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/incidents`)
      .then(res => res.json())
      .then(data => setIncidents(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Reported Incidents</h2>
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>{incident.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default IncidentList;
