import { useForm } from "react-hook-form";
import { useState } from "react";

export default function IncidentForm() {
  const { register, handleSubmit, reset } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = (data) => {
    console.log("Mock Incident Submitted:", data);

// Show success message
setMessage(" Incident reported successfully!");

// Reset form
reset();

// Optionally clear message after 3 seconds
setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <input type="text" placeholder="Title" {...register("title")} required />
        <textarea placeholder="Description" {...register("description")} required />
        <input type="text" placeholder="Latitude" {...register("latitude")} required />
        <input type="text" placeholder="Longitude" {...register("longitude")} required />

    <label>Image Upload</label>
    <input type="file" accept="image/*" {...register("image")} />

    <label>Video Upload</label>
    <input type="file" accept="video/*" {...register("video")} />

    <button type="submit">Submit</button>
  </form>

  {message && <p style={{ color: "green", marginTop: "1rem" }}>{message}</p>}
</div>
  );
}