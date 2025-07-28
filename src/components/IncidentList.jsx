import { useEffect, useState } from 'react';

function IncidentList() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/incidents') 
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
