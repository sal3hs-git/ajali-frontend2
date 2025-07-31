import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config"

export default function DashboardPage() {
  const [mediaItems, setMediaItems] = useState([]);
  const [error, setError] = useState(null);



  useEffect(() => {
    fetch(`${API_BASE_URL}incidents`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch incidents");
        return res.json();
      })
      .then((data) => {
        const incidentsWithMedia = data.map((incident) => ({
          ...incident,
          media: incident.media.map((m) => ({
            ...m,
            url: m.url.startsWith("http") ? m.url : `${BASE_URL}/uploads/${m.url}`,
            incidentTitle: incident.title,
            incidentId: incident.id,
          })),
        }));
        setMediaItems(incidentsWithMedia);
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

      {mediaItems.length === 0 && !error && <p>No media to display yet.</p>}

      {mediaItems.map((incident, i) => (
        <div key={incident.id || i} style={{ marginBottom: "2rem" }}>
          <h4>{incident.title}</h4>
          <div style={styles.mediaGrid}>
            {incident.media.map((item, index) => {
              const mediaUrl = item.url;

              const isVideo =
                item.type === "video" ||
                mediaUrl.match(/\.(mp4|webm|ogg)$/i);

              return (
                <div key={index} style={styles.card}>
                  {isVideo ? (
                    <video controls style={styles.media}>
                      <source src={mediaUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img src={mediaUrl} alt="Incident Media" style={styles.media} />
                  )}
                  <div style={styles.caption}>
                    <small>{incident.title}</small>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
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
