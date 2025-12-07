// src/components/Shared/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="nav">
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <strong>HealthLink</strong>
          <Link to="/dashboard" style={{ marginLeft: 12 }}>Dashboard</Link>
          <Link to="/clinics" style={{ marginLeft: 12 }}>Clinics</Link>
        </div>
        <div>
          {user ? (
            <>
              <span className="small" style={{ marginRight: 12 }}>
                Hello, {user.displayName || user.email}
              </span>
              <button className="secondary" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" style={{ marginLeft: 8 }}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
