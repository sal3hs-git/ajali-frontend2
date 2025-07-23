import { Link } from "react-router-dom";
import IncidentCard from "../components/IncidentCard";

export default function DashboardPage() {
  const mockIncidents = [
    {
      id: 1,
      title: "Fire at Gikomba",
      latitude: "-1.2921",
      longitude: "36.8219",
      status: "Rejected",
      description: "Thick smoke observed from Gikomba market. Emergency team dispatched.",
    },
    {
      id: 2,
      title: "Accident along Thika Road",
      latitude: "-1.2000",
      longitude: "36.9000",
      status: "Pending",
      description: "Multiple car pile-up near Roysambu area.",
    },
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>Ajali</h2>
        <nav>
          <Link to="/report">
            <button style={styles.button}>+ Report New Incident</button>
          </Link>
        </nav>
      </header>

      <h3 style={styles.title}>Dashboard</h3>

      <div style={styles.incidentList}>
        {mockIncidents.map((incident) => (
          <IncidentCard key={incident.id} incident={incident} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "1rem",
    fontFamily: "sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #ccc",
    paddingBottom: "0.5rem",
    marginBottom: "1rem",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  title: {
    marginBottom: "1rem",
  },
  incidentList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor:"white"
  },
};
