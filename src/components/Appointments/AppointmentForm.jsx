import React, { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext";

export default function AppointmentForm() {
  const { user, loading } = useAuth(); // added loading
  const [form, setForm] = useState({ clinic: "", specialty: "", date: "", time: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  if (loading) return <div>Loading...</div>; // safe fallback
  if (!user) return <div>Please log in to schedule appointments.</div>;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.clinic || !form.date || !form.time) {
      setError("Please complete required fields");
      return;
    }

    try {
      const appointmentRef = ref(db, "appointments");
      await push(appointmentRef, {
        ...form,
        status: "Scheduled",
        userId: user.uid,
      });
      setSuccess("Appointment scheduled successfully!");
      setForm({ clinic: "", specialty: "", date: "", time: "" });
      setError(null);
    } catch (err) {
      setError("Failed to save appointment. Try again.");
      console.error(err);
    }
  }

  return (
    <div className="card">
      <h3>Schedule Appointment</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Clinic</label>
          <input name="clinic" value={form.clinic} onChange={handleChange} required />
        </div>
        <div>
          <label>Specialty</label>
          <input name="specialty" value={form.specialty} onChange={handleChange} />
        </div>
        <div className="form-row">
          <div style={{ flex: 1 }}>
            <label>Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} required />
          </div>
          <div style={{ width: 140 }}>
            <label>Time</label>
            <input type="time" name="time" value={form.time} onChange={handleChange} required />
          </div>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {success && <div style={{ color: "green" }}>{success}</div>}
        <div style={{ marginTop: 12 }}>
          <button type="submit">Schedule Appointment</button>
        </div>
      </form>
    </div>
  );
}
