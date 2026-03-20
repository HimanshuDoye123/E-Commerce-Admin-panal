import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserManagement() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const limit = 10;

  const fetchUsers = async () => {
    let url = `https://dummyjson.com/users?limit=${limit}&skip=${page * limit}`;

    if (query) {
      url = `https://dummyjson.com/users/search?q=${query}`;
    } else if (filter) {
      url = `https://dummyjson.com/users/filter?key=hair.color&value=${filter}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setUsers(data.users || []);
    setTotal(data.total || 0);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, query, filter]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div style={{ padding: "20px" }}>
      
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "30px",
          display: "flex",
          gap: "10px",
        }}
      >
        <button onClick={goToDashboard}>Dashboard</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <h2>User Management</h2>

      {/*SEARCH and FILTER */}
      <div style={{ marginTop: "20px" }}>
        <input
          placeholder="Search user..."
          value={query}
          onChange={(e) => {
            setPage(0);
            setQuery(e.target.value);
          }}
          style={{ marginRight: "10px" }}
        />

        <select
          value={filter}
          onChange={(e) => {
            setPage(0);
            setFilter(e.target.value);
          }}
        >
          <option value="">All Hair Colors</option>
          <option value="Brown">Brown</option>
          <option value="Black">Black</option>
          <option value="Blonde">Blonde</option>
        </select>
      </div>

      {/* TABLE */}
      <div style={{ marginTop: "20px" }}>
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <table border="1" cellPadding="10" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Hair Color</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>
                    {u.firstName} {u.lastName}
                  </td>
                  <td>{u.email}</td>
                  <td>{u.hair?.color}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION */}
      <div style={{ marginTop: "20px" }}>
        <button
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page + 1} / {totalPages || 1}
        </span>

        <button
          disabled={page >= totalPages - 1}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
