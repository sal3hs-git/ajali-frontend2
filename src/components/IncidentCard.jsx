export default function IncidentCard({ incident }) {
    return (
      <div style={cardStyle}>
        <h4>{incident.title}</h4>
        <p><strong>Location:</strong> Lat {incident.latitude}, Long {incident.longitude}</p>
        <p><strong>Status:</strong> {incident.status}</p>
        <p><strong>Description:</strong> {incident.description}</p>
      </div>
    );
  }
  
  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "1rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };
  