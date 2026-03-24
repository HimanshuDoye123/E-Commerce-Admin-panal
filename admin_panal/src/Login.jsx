import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("https://dummyjson.com/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, expiresInMins: 30 }),
    });

    const data = await res.json();

    if (data?.accessToken) {
      login(data);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="loginPage">
      <div className="loginCard">
        <h2 className="loginTitle">Welcome</h2>
        <p className="loginSubtitle">Sign in to continue</p>

        <form onSubmit={handleLogin} className="loginForm">
          <label className="loginLabel">
            Username
            <input
              className="loginInput"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </label>

          <label className="loginLabel">
            Password
            <input
              className="loginInput"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>

          <button className="loginButton" type="submit">
            Login
          </button>
        </form>

        <p className="loginHint">
          Try: <span className="loginHintStrong">oliviaw</span> /
          <span className="loginHintStrong">oliviawpass</span>
        </p>
      </div>
    </div>
  );
}
