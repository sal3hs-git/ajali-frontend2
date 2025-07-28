import { useState } from 'react';

function IncidentForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    reporterName: '',
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch('http://127.0.0.1:5000/incidents', {
      
    })
      .then(res => res.json())
      .then(data => {
        alert('Incident submitted successfully!');
        setFormData({ title: '', description: '', location: '', reporterName: '' });
      })
      .catch(err => console.error(err));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Report Incident</h2>
      <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
      <input name="reporterName" placeholder="Your Name" value={formData.reporterName} onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
}

export default IncidentForm;
