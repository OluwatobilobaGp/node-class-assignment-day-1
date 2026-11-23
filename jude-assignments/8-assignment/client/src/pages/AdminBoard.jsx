import { useMemo, useState } from "react";

const SAMPLE_USERS = [
  {
    id: 1,
    firstName: "Jude",
    lastName: "Uloko",
    email: "jude.uloko@example.com",
    role: "Admin",
    phone: "+234 801 234 5678",
    address: "14 Allen Avenue, Ikeja, Lagos",
    gender: "Male",
    bio: "Full-stack web developer and system architect.",
    accountStatus: "Active",
    dateRegistered: "2026-10-12",
  },
  {
    id: 2,
    firstName: "Chioma",
    lastName: "Osei",
    email: "chioma.osei@example.com",
    role: "Moderator",
    phone: "+234 802 345 6789",
    address: "22 Admiralty Way, Lekki, Lagos",
    gender: "Female",
    bio: "Backend mentor and community lead.",
    accountStatus: "Active",
    dateRegistered: "2026-10-19",
  },
  {
    id: 3,
    firstName: "David",
    lastName: "Eze",
    email: "david.eze@example.com",
    role: "User",
    phone: "+234 803 456 7890",
    address: "8 Herbert Macaulay Way, Yaba, Lagos",
    gender: "Male",
    bio: "Frontend engineer focused on React and UI systems.",
    accountStatus: "Active",
    dateRegistered: "2026-11-02",
  },
  {
    id: 4,
    firstName: "Amaka",
    lastName: "Nwosu",
    email: "amaka.nwosu@example.com",
    role: "User",
    phone: "+234 805 567 8901",
    address: "5 Bode Thomas Street, Surulere, Lagos",
    gender: "Female",
    bio: "Product designer exploring responsive web apps.",
    accountStatus: "Pending",
    dateRegistered: "2026-11-15",
  },
  {
    id: 5,
    firstName: "Tunde",
    lastName: "Adeyemi",
    email: "tunde.adeyemi@example.com",
    role: "User",
    phone: "+234 809 678 9012",
    address: "19 Oba Akran Avenue, Ikeja, Lagos",
    gender: "Male",
    bio: "Freelance photographer and content creator.",
    accountStatus: "Suspended",
    dateRegistered: "2026-11-20",
  },
];

export default function AdminDashboard({ users = SAMPLE_USERS }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const stats = useMemo(() => {
    return {
      total: users.length,
      active: users.filter((u) => u.accountStatus === "Active").length,
      pending: users.filter((u) => u.accountStatus === "Pending").length,
      suspended: users.filter((u) => u.accountStatus === "Suspended").length,
    };
  }, [users]);

  const filteredUsers = useMemo(() => {
    const query = search.toLowerCase().trim();
    return users.filter((user) => {
      const matchesStatus =
        statusFilter === "all" || user.accountStatus === statusFilter;
      const matchesQuery =
        !query ||
        [
          user.firstName,
          user.lastName,
          user.email,
          user.role,
          user.phone,
          user.address,
          user.gender,
          user.bio,
          user.accountStatus,
          user.dateRegistered,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesStatus && matchesQuery;
    });
  }, [users, search, statusFilter]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-success-subtle text-success-emphasis";
      case "Pending":
        return "bg-warning-subtle text-warning-emphasis";
      case "Suspended":
        return "bg-danger-subtle text-danger-emphasis";
      default:
        return "bg-secondary-subtle text-secondary-emphasis";
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100">
      <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
        <div className="container-fluid px-3 px-lg-4">
          <a className="navbar-brand fw-bold text-primary" href="#overview">
            AdminPanel
          </a>
          <div className="ms-auto">
            <span className="badge bg-primary-subtle text-primary-emphasis px-3 py-2 rounded-pill">
              Admin
            </span>
          </div>
        </div>
      </nav>

      <main className="container-fluid px-3 px-lg-4 py-4">
        {/* Overview */}
        <section id="overview" className="mb-4">
          <div className="mb-3">
            <h1 className="h4 fw-bold mb-1">Overview</h1>
            <p className="text-secondary small mb-0">
              Summary of platform accounts and user registrations
            </p>
          </div>

          <div className="row g-3">
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-4">
                  <p className="text-secondary small fw-semibold text-uppercase mb-1">
                    Total Registered Users
                  </p>
                  <h2 className="display-6 fw-bold mb-1">{stats.total}</h2>
                  <span className="badge bg-success-subtle text-success-emphasis">
                    All recorded accounts
                  </span>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-4">
                  <p className="text-secondary small fw-semibold text-uppercase mb-1">
                    Active Accounts
                  </p>
                  <h2 className="display-6 fw-bold mb-1 text-success">
                    {stats.active}
                  </h2>
                  <span className="text-secondary small">Verified &amp; active</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-4">
                  <p className="text-secondary small fw-semibold text-uppercase mb-1">
                    Pending Verification
                  </p>
                  <h2 className="display-6 fw-bold mb-1 text-warning">
                    {stats.pending}
                  </h2>
                  <span className="text-secondary small">Awaiting approval</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-4">
                  <p className="text-secondary small fw-semibold text-uppercase mb-1">
                    Suspended Accounts
                  </p>
                  <h2 className="display-6 fw-bold mb-1 text-danger">
                    {stats.suspended}
                  </h2>
                  <span className="text-secondary small">Restricted access</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Registered Users Table */}
        <section id="users-section">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-header bg-white border-bottom py-3 px-4">
              <div className="row g-2 align-items-center justify-content-between">
                <div className="col-12 col-md-auto">
                  <h2 className="h5 fw-bold mb-0">Registered Users</h2>
                </div>
                <div className="col-12 col-md-auto d-flex flex-column flex-sm-row gap-2">
                  <input
                    type="search"
                    className="form-control form-control-sm"
                    placeholder="Search name, email, role..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <select
                    className="form-select form-select-sm"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light small text-uppercase">
                    <tr>
                      <th className="ps-4 text-nowrap">SN</th>
                      <th className="text-nowrap">First Name</th>
                      <th className="text-nowrap">Last Name</th>
                      <th className="text-nowrap">Email</th>
                      <th className="text-nowrap">Role</th>
                      <th className="text-nowrap">Phone</th>
                      <th className="text-nowrap">Address</th>
                      <th className="text-nowrap">Gender</th>
                      <th className="text-nowrap">Bio</th>
                      <th className="text-nowrap">Account Status</th>
                      <th className="pe-4 text-nowrap">Date Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user, index) => (
                        <tr key={user.id ?? index}>
                          <td className="ps-4 fw-semibold">{index + 1}</td>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className="badge bg-secondary-subtle text-secondary-emphasis">
                              {user.role}
                            </span>
                          </td>
                          <td className="text-nowrap">{user.phone}</td>
                          <td style={{ minWidth: "170px" }}>{user.address}</td>
                          <td>{user.gender}</td>
                          <td
                            className="text-truncate"
                            style={{ maxWidth: "220px" }}
                            title={user.bio}
                          >
                            {user.bio}
                          </td>
                          <td>
                            <span className={`badge ${getStatusBadge(user.accountStatus)}`}>
                              {user.accountStatus}
                            </span>
                          </td>
                          <td className="pe-4 text-nowrap">{user.dateRegistered}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={11} className="text-center text-secondary py-4">
                          No matching users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card-footer bg-white border-top py-3 px-4">
              <span className="text-secondary small">
                Showing {filteredUsers.length} of {users.length} registered users
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
