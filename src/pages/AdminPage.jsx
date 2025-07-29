import { useEffect, useState } from "react";
import "./AdminPage.css";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(setUsers);

    fetch("/incidents")

      .then(res => res.json())
      .then(setIncidents);
  }, []);

  const handleUserChange = (id, field, value) => {
    const updated = users.map(user =>
      user.id === id ? { ...user, [field]: value } : user
    );
    setUsers(updated);
  };

  const handleUserSave = (id) => {
    const user = users.find(u => u.id === id);
    fetch(`/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        role: user.role
      })
    });
  };

  const handleClearIncidentStatus = (id) => {
    fetch(`/incidents/${id}/clear_status`, {
      method: "PATCH",
    })
      .then(res => res.json())
      .then(updated => {
        setIncidents(incidents.map(i => i.id === id ? updated : i));
      });
  };

  const handleStatusChange = (id, status) => {
    fetch(`/incidents/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    })
      .then(res => res.json())
      .then(updated => {
        setIncidents(incidents.map(i => i.id === id ? updated : i));
      });
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Panel</h1>

      <section className="admin-section">
        <h2>Users</h2>
        <table className="incident-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Save</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>
                  <input
                    value={u.username}
                    onChange={(e) =>
                      handleUserChange(u.id, "username", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    value={u.email}
                    onChange={(e) =>
                      handleUserChange(u.id, "email", e.target.value)
                    }
                  />
                </td>
                <td>
                  <select
                    value={u.role}
                    onChange={(e) =>
                      handleUserChange(u.id, "role", e.target.value)
                    }
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleUserSave(u.id)}>Save</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="admin-section">
        <h2>Incidents</h2>
        <table className="incident-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Status</th>
              <th>Change Status</th>
              <th>Clear</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((i) => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.description}</td>
                <td>{i.status}</td>
                <td>
                  <select
                    value={i.status}
                    onChange={(e) => handleStatusChange(i.id, e.target.value)}
                  >
                    <option value="Reported">Reported</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleClearIncidentStatus(i.id)}>
                    Clear
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
