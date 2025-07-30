import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const [mediaItems, setMediaItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/incidents")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch incidents");
        return res.json();
      })
      .then((data) => {
        // Flatten all media from all incidents and take only the first 30
        const allMedia = data
          .flatMap((incident) =>
            incident.media.map((m) => ({
              ...m,
              incidentTitle: incident.title,
              incidentId: incident.id,
            }))
          )
          .slice(0, 30);
        setMediaItems(allMedia);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2 style={styles.logo}>Ajali</h2>
        <nav>
          <Link to="/report">
            <button style={styles.button}>+ Report New Incident</button>
          </Link>
        </nav>
      </header>

  <h3 style={styles.title}>Media Dashboard</h3>

  {error && <p style={{ color: "red" }}>{error}</p>}

  <div style={styles.mediaGrid}>
    {mediaItems.map((item, index) => (
      <div key={index} style={styles.card}>
        {item.type === "image" ? (
          <img src={item.url} alt="Incident Media" style={styles.media} />
        ) : (
          <video controls style={styles.media}>
            <source src={item.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <div style={styles.caption}>
          <small>{item.incidentTitle}</small>
        </div>
      </div>
    ))}
  </div>
</div>
  );
}

const styles = {
  container: {
    padding: "1rem",
    fontFamily: "sans-serif",
    backgroundColor: "#121212",
    color: "#ffffff",
    minHeight: "100vh",
  },
  logo: {
    color: "#ffffff",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #333",
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
  mediaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "1rem",
  },
  card: {
    backgroundColor: "#1f1f1f",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  },
  media: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    backgroundColor: "#000",
  },
  caption: {
    padding: "0.5rem",
    fontSize: "0.9rem",
    color: "#aaa",
    textAlign: "center",
  },
};