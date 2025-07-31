import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import "./AdminPage.css";
import { API_BASE_URL } from "../../config"

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to view this page.");
      return;
    }


    fetch(`${API_BASE_URL}/admin/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            throw new Error("Unauthorized: Admin access required.");
          }
          throw new Error("Failed to fetch users.");
        }
        return res.json();
      })
      .then(setUsers)
      .catch((err) => {
        alert(err.message);
        console.error(err);
      });


    fetch(`${API_BASE_URL}/incidents`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch incidents.");
        }
        return res.json();
      })
      .then(setIncidents)
      .catch((err) => {
        alert(err.message);
        console.error(err);
      });
  }, []);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const defaultCenter = {
    lat: -1.2921,
    lng: 36.8219,
  };

  const handleUserChange = (id, field, value) => {
    const updated = users.map((user) =>
      user.id === id ? { ...user, [field]: value } : user
    );
    setUsers(updated);
  };

  const handleUserSave = (id) => {
    const token = localStorage.getItem("token");
    const user = users.find((u) => u.id === id);

    fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        role: user.role,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save user changes.");
        return res.json();
      })
      .then((updatedUser) => {
        setUsers(users.map((u) => (u.id === id ? updatedUser : u)));
      })
      .catch((err) => {
        alert(err.message);
        console.error(err);
      });
  };

  const handleClearIncidentStatus = (id) => {
    const token = localStorage.getItem("token");

    fetch(`${API_BASE_URL}/admin/incidents/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to clear incident status.");
        return res.json();
      })
      .then((updated) => {
        setIncidents(incidents.map((i) => (i.id === id ? updated : i)));
      })
      .catch((err) => {
        alert(err.message);
        console.error(err);
      });
  };

  const handleStatusChange = (id, status) => {
    const token = localStorage.getItem("token");

    fetch(`${API_BASE_URL}/admin/incidents/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update incident status.");
        return res.json();
      })
      .then((updated) => {
        setIncidents(incidents.map((i) => (i.id === id ? updated : i)));
      })
      .catch((err) => {
        alert(err.message);
        console.error(err);
      });
  };

  const handleDeleteIncident = (id) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Are you sure you want to permanently delete this incident?")) return;
    fetch(`${API_BASE_URL}/admin/incidents/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
       .then((res) => {
        if (!res.ok) throw new Error("Failed to delete incident.");
        return res.json();
      })
      .then(() => {
        setIncidents((prev) => prev.filter((i) => i.id !== id));
      })
      .catch((err) => {
        alert(err.message);
        console.error(err);
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
                <td>
                  <button onClick={() => handleDeleteIncident(i.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="admin-section">
  <h2>Map of Incidents</h2>
  {isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "400px" }}
      center={defaultCenter}
      zoom={7}
    >
      {incidents.map((incident) => (
        <Marker
          key={incident.id}
          position={{
            lat: parseFloat(incident.latitude),
            lng: parseFloat(incident.longitude),
          }}
          title={incident.description}
        />
      ))}
    </GoogleMap>
  ) : (
    <p>Loading map...</p>
  )}
</section>

    </div>
  );
}
