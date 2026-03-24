import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./UserManagement.css";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const limit = 10;

  const fetchUsers = async () => {
    let url = `https://dummyjson.com/users?limit=${limit}&skip=${page * limit}`;

    if (query) url = `https://dummyjson.com/users/search?q=${query}`;
    else if (filter) url = `https://dummyjson.com/users/filter?key=hair.color&value=${filter}`;

    const res = await fetch(url);
    const data = await res.json();

    setUsers(data.users || []);
    setTotal(data.total || 0);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, query, filter]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="umPage">
      <Navbar />

      <div className="umHeader">
        <h2 className="umTitle">User Management</h2>

        <div className="umControls">
          <input
            className="umInput"
            placeholder="Search user..."
            value={query}
            onChange={(e) => {
              setPage(0);
              setQuery(e.target.value);
            }}
          />

          <select
            className="umSelect"
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
      </div>

      <div className="umCard">
        {users.length === 0 ? (
          <p className="umEmpty">No users found</p>
        ) : (
          <div className="umTableWrap">
            <table className="umTable">
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
          </div>
        )}

        <div className="pagination umPagination">
          <button
            className="umBtn"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          <span className="umPageText">
            Page {page + 1} / {totalPages || 1}
          </span>

          <button
            className="umBtn"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
