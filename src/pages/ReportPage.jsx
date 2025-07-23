import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ReportPage() {
  const { register, handleSubmit, reset } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = (data) => {
    console.log("Mock Report Submitted:", data);
    setMessage("Incident reported successfully!");
    reset();
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2 style={styles.logo}>Ajali</h2>
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
          <label style={styles.label}>Image Upload</label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            style={styles.fileInput}
          />
        </div>

        <div style={styles.uploadSection}>
          <label style={styles.label}> Video Upload</label>
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
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    border: "2px solid #d32f2f",
    boxShadow: "0 0 10px rgba(211, 47, 47, 0.3)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
    paddingBottom: "0.5rem",
    borderBottom: "2px solid #d32f2f",
  },
  logo: {
    color: "#d32f2f",
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  userTag: {
    backgroundColor: "#f8d7da",
    color: "#d32f2f",
    padding: "0.4rem 0.8rem",
    borderRadius: "999px",
    fontWeight: "bold",
  },
  title: {
    fontSize: "1.5rem",
    color: "#d32f2f",
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
    fontSize: "1rem",
  },
  textarea: {
    padding: "0.75rem",
    height: "100px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "1rem",
  },
  uploadSection: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
    color: "#d32f2f",
    marginBottom: "0.3rem",
  },
  fileInput: {
    border: "none",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#d32f2f",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  success: {
    color: "green",
    fontWeight: "bold",
    marginTop: "1rem",
  },
  backLink: {
    display: "inline-block",
    marginTop: "1.5rem",
    color: "#d32f2f",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
