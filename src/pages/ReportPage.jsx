import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config";

export default function ReportPage() {
  const { register, handleSubmit, reset } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("reporter_username", data.user);
      formData.append("latitude", data.latitude);
      formData.append("longitude", data.longitude);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      if (data.video && data.video[0]) {
        formData.append("video", data.video[0]);
      }

      const response = await fetch(`${API_BASE_URL}/incidents`, {
        method: "POST",
        credentials: "include", 
        body: formData,
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
      console.error("❌ Submission error:", error.message);
      setMessage("Error reporting incident");
      setTimeout(() => setMessage(""), 3000);
    }
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
          <label style={styles.label}>Video Upload</label>
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
