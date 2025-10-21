import React, { useState } from "react";
import { login, register, setToken } from "../api";

export default function Login({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("");
    setLoading(true);
    try {
      if (mode === "login") {
        const res = await login(email, password);
        setToken(res.access_token);
        onLogin(res.access_token);
      } else {
        await register(email, password);
        setStatus("Registered! Please log in.");
        setMode("login");
      }
    } catch (err) {
      setStatus("Error: " + (err.response?.data?.detail || "Failed"));
    }
    setLoading(false);
  }

  return (
    <div className="login-box">
      <h2>{mode === "login" ? "Sign In" : "Create Account"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Please Wait…" : mode === "login" ? "Login" : "Register"}
        </button>
      </form>
      <div>
        {mode === "login" ? (
          <span>
            New user?{" "}
            <button type="button" onClick={() => setMode("register")}>
              Register
            </button>
          </span>
        ) : (
          <span>
            Already have an account?{" "}
            <button type="button" onClick={() => setMode("login")}>
              Login
            </button>
          </span>
        )}
      </div>
      {status && <div className="error">{status}</div>}
    </div>
  );
}
