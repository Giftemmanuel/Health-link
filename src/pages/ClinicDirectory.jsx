// src/pages/ClinicDirectory.jsx
import React from "react";

const clinics = [
  { id: 1, name: "St. Mary Clinic", specialties: ["General", "Pediatrics", "Lab"] },
  { id: 2, name: "Greenfield Diagnostics", specialties: ["Lab", "Radiology"] },
  { id: 3, name: "Sunrise Hospital", specialties: ["Surgery", "Orthopedics", "Cardiology"] },
];

export default function ClinicDirectory() {
  return (
    <div className="container">
      <div className="card">
        <h2>Clinic Directory</h2>
        <ul>
          {clinics.map((c) => (
            <li key={c.id} style={{ marginBottom: 8 }}>
              <strong>{c.name}</strong>
              <div className="small">Specialties: {c.specialties.join(", ")}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
