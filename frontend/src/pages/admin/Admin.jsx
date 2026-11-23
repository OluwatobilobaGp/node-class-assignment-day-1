
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Admin.css";

function Admin() {
  const { user, accessToken, loading } = useAuth();

  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin" || !accessToken) return;

    const fetchUsers = async () => {
      try {
        setFetching(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/v1/admin/users",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json"
            },
            credentials: "include"
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Unable to fetch users");
        }

        setUsers(result.data.users || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };

    fetchUsers();
  }, [user, accessToken]);

  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>

        <nav>
          <a href="/admin" className="active">Dashboard</a>
          <a href="/profile">My Profile</a>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Dashboard</h1>
            <p>Manage registered users and their profiles.</p>
          </div>

          <span className="admin-role">Administrator</span>
        </header>

        <section className="admin-stats">
          <div className="admin-stat-card">
            <p>Total Users</p>
            <h2>{users.length}</h2>
          </div>

          <div className="admin-stat-card">
            <p>Administrators</p>
            <h2>
              {users.filter((item) => item.role === "admin").length}
            </h2>
          </div>

          <div className="admin-stat-card">
            <p>Regular Users</p>
            <h2>
              {users.filter((item) => item.role === "user").length}
            </h2>
          </div>
        </section>

        <section className="admin-users">
          <div className="admin-section-header">
            <h2>Registered Users</h2>
            <span>{users.length} users</span>
          </div>

          {fetching ? (
            <p className="admin-message">Loading users...</p>
          ) : error ? (
            <p className="admin-error">{error}</p>
          ) : users.length === 0 ? (
            <p className="admin-message">No users found.</p>
          ) : (
            <div className="admin-table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((item) => (
                    <tr key={item._id}>
                      <td>
                        {item.firstName} {item.lastName}
                      </td>
                      <td>{item.email}</td>
                      <td>
                        <span className={`role-badge ${item.role}`}>
                          {item.role}
                        </span>
                      </td>
                      <td>{item.profile?.phone || "—"}</td>
                      <td>{item.profile?.gender || "—"}</td>
                      <td>
                        {item.isActive ? "Active" : "Inactive"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Admin;
