import React, { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loggedIn, setLoggedIn] = useState(!!token);

  function handleLogin(newToken) {
    setToken(newToken);
    setLoggedIn(true);
    localStorage.setItem("token", newToken);
  }

  function handleLogout() {
    setToken("");
    setLoggedIn(false);
    localStorage.removeItem("token");
  }

  return (
    <div>
      {!loggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard token={token} onLogout={handleLogout} />
      )}
    </div>
  );
}
