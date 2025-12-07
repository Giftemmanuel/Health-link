// src/components/Results/ResultDetails.jsx
import React from "react";

export default function ResultDetails({ result, onClose }) {
  if (!result) return null;

  return (
    <div style={{ marginTop: 12 }} className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h4>{result.testName}</h4>
        <button className="secondary" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="small">Clinic: {result.clinic}</div>
      <div className="small">Date: {result.date}</div>
      <div style={{ marginTop: 8 }}>
        <strong>Summary</strong>
        <p>{result.summary || "No summary provided."}</p>
      </div>
      {result.file && (
        <div>
          <a className="link" href={result.file} target="_blank" rel="noreferrer">
            Download result
          </a>
        </div>
      )}
    </div>
  );
}
