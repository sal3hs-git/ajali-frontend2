
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ReportPage() {
  const { register, handleSubmit, reset } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    // Convert latitude and longitude to numbers
    const payload = {
      title: data.title,
      description: data.description,
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
      status: data.status,
    };

console.log("📤 Submitting Incident:", payload);

try {
  const response = await fetch("http://localhost:5000/incidents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",  
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  console.log("✅ Server response:", result);

  if (!response.ok) {
    throw new Error(result.error || "Failed to submit incident");
  }

  setMessage("Incident reported successfully!");
  reset();
  setTimeout(() => setMessage(""), 3000);
} catch (error) {
  console.error("❌ Error submitting incident:", error.message);
  setMessage("Failed to report incident.");
  setTimeout(() => setMessage(""), 3000);
}
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

    <select {...register("status")} style={styles.input} required>
      <option value="">Select status</option>
      <option value="open">Open</option>
      <option value="closed">Closed</option>
    </select>

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
  button: {
    padding: "0.75rem",
    backgroundColor: "red",
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