import React from "react";
import AppointmentForm from "../components/Appointments/AppointmentForm";
import AppointmentList from "../components/Appointments/AppointmentList";
import ReferralForm from "../components/Referrals/ReferralForm";
import ResultsList from "../components/Results/ResultsList";
import NotificationCenter from "../components/Shared/NotificationCenter";

export default function Dashboard() {
  return (
    <div className="container">
      <div className="header">
        <h1>Dashboard</h1>
        <div className="small">
          Manage appointments, referrals, and view test results
        </div>
      </div>

      <div className="grid" style={{ display: "flex", gap: 20 }}>
        {/* Left column */}
        <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: 16 }}>
          <AppointmentForm />
          <AppointmentList />
          <ReferralForm />
          <ResultsList />
        </div>

        {/* Right column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          <NotificationCenter />
          <div className="card">
            <h4>Quick tips</h4>
            <ul className="small">
              <li>Use the form to schedule appointments</li>
              <li>Referrals notify clinics automatically (mock)</li>
              <li>Results can be uploaded by admins (mock data)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
