import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/DashboardPage";
import ClinicDirectory from "./pages/ClinicDirectory";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Shared/Navbar";
import { useAuth } from "./context/AuthContext";

// Protected Route wrapper
function RequireAuth({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // fallback UI while auth is being determined
  }

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="/clinics" element={<ClinicDirectory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
