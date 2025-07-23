import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ReportPage() {
  const { register, handleSubmit, reset } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = (data) => {
    console.log("Mock Report Submitted:", data);
    setMessage(" Incident reported successfully!");
    reset();
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>Ajali</h2>
        <span style={styles.userTag}>Orrein</span>
      </header>

      <h3 style={styles.title}>Report an Incident</h3>

      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          style={styles.input}
          required
        />

        <textarea
          placeholder="Description"
          {...register("description")}
          style={styles.textarea}
          required
        />

        <input
          type="text"
          placeholder="Reported by (User)"
          {...register("user")}
          style={styles.input}
          required
        />

        <input
          type="text"
          placeholder="Latitude"
          {...register("latitude")}
          style={styles.input}
          required
        />

        <input
          type="text"
          placeholder="Longitude"
          {...register("longitude")}
          style={styles.input}
          required
        />

        <div style={styles.uploadSection}>
          <label style={styles.label}>📷 Image Upload</label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            style={styles.fileInput}
          />
        </div>

        <div style={styles.uploadSection}>
          <label style={styles.label}>🎥 Video Upload</label>
          <input
            type="file"
            accept="video/*"
            {...register("video")}
            style={styles.fileInput}
          />
        </div>

        <button type="submit" style={styles.button}>Submit</button>
        {message && <p style={styles.success}>{message}</p>}
      </form>

      <Link to="/dashboard" style={styles.backLink}>⬅ Back to Dashboard</Link>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
    borderBottom: "1px solid #ccc",
    paddingBottom: "0.5rem",
  },
  userTag: {
    backgroundColor: "red",
    padding: "0.25rem 0.75rem",
    borderRadius: "999px",
    fontWeight: "bold",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    
  },
  input: {
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    
  },
  textarea: {
    padding: "0.75rem",
    height: "100px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  uploadSection: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "0.25rem",
    fontWeight: "bold",
  },
  fileInput: {
    border: "none",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "reed",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  success: {
    color: "green",
    marginTop: "1rem",
    fontWeight: "bold",
  },
  backLink: {
    display: "inline-block",
    marginTop: "1rem",
    color: "black",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
