export default function IncidentForm() {
  return (
    <form>
      <input type="text" placeholder="Title" />
      <textarea placeholder="Description" />
      <input type="text" placeholder="Latitude" />
      <input type="text" placeholder="Longitude" />

      <div>
        <label>Image Upload:</label>
        <input type="file" />
      </div>

      <div>
        <label>Video Upload:</label>
        <input type="file" />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
