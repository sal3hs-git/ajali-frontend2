import { useEffect, useState } from 'react';

import { API_BASE_URL } from "../../config"

function IncidentList() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // if you're using JWT auth

    fetch(`${API_BASE_URL}/incidents`, {
      method: "GET",
      credentials: "include", // important if cookies are used
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Request failed: ${res.status} ${errorText}`);
        }
        return res.json();
      })
      .then((data) => setIncidents(data))
      .catch((err) => {
        console.error("❌ Fetch error:", err.message);
      });
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
