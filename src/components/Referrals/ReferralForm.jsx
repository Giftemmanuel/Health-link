import React, { useState } from "react";
import { db } from "../../services/firebase";
import { ref, push } from "firebase/database";
import { useAuth } from "../../context/AuthContext";

export default function ReferralForm() {
  const { user } = useAuth();
  const [form, setForm] = useState({ toClinic: "", specialty: "", notes: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!form.toClinic) {
      setMsg("Please select a clinic");
      return;
    }
    try {
      const refRef = ref(db, `referrals/${user.uid}`);
      await push(refRef, { ...form, status: "Pending", createdAt: Date.now() });
      setMsg("Referral submitted successfully!");
      setForm({ toClinic: "", specialty: "", notes: "" });
    } catch (err) {
      console.error(err);
      setMsg("Failed to submit referral.");
    }
  };

  return (
    <div className="card">
      <h3>Referral Request</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>To Clinic</label>
          <input name="toClinic" value={form.toClinic} onChange={handleChange} required />
        </div>
        <div>
          <label>Specialty</label>
          <input name="specialty" value={form.specialty} onChange={handleChange} />
        </div>
        <div>
          <label>Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange}></textarea>
        </div>
        {msg && <div className="small">{msg}</div>}
        <div style={{ marginTop: 12 }}>
          <button type="submit">Submit Referral</button>
        </div>
      </form>
    </div>
  );
}
