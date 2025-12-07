import React, { useEffect, useState } from "react";
import { ref, onValue, update } from "firebase/database";
import { db } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext";

export default function AppointmentList() {
  const { user, loading } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!user) return; // exit early if no user
    const appointmentsRef = ref(db, "appointments");
    const unsubscribe = onValue(appointmentsRef, (snapshot) => {
      const data = snapshot.val();
      const list = [];
      for (let id in data) {
        if (data[id].userId === user.uid) {
          list.push({ id, ...data[id] });
        }
      }
      setAppointments(list);
    });
    return () => unsubscribe();
  }, [user]);

  const handleCancel = async (id) => {
    try {
      const appointmentRef = ref(db, `appointments/${id}`);
      await update(appointmentRef, { status: "Cancelled" });
    } catch (err) {
      console.error("Failed to cancel appointment:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in to see your appointments.</div>;
  if (appointments.length === 0) return <div className="card">No appointments scheduled.</div>;

  return (
    <div className="card">
      <h3>Your Appointments</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Clinic</th>
            <th>Specialty</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt.id}>
              <td>{appt.clinic}</td>
              <td>{appt.specialty || "-"}</td>
              <td>{appt.date}</td>
              <td>{appt.time}</td>
              <td>{appt.status}</td>
              <td>
                {appt.status !== "Cancelled" && (
                  <button className="secondary" onClick={() => handleCancel(appt.id)}>
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}