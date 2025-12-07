import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext";
import ResultDetails from "./ResultDetails";

export default function ResultsList() {
  const { user, loading } = useAuth();
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!user) return;
    const resultsRef = ref(db, "results");
    const unsubscribe = onValue(resultsRef, (snapshot) => {
      const data = snapshot.val();
      const list = [];
      for (let id in data) {
        if (data[id].userId === user.uid) {
          list.push({ id, ...data[id] });
        }
      }
      setResults(list);
    });
    return () => unsubscribe();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in to see your results.</div>;
  if (results.length === 0) return <div className="card">No test results yet.</div>;

  return (
    <div className="card">
      <h3>Test Results</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Test</th>
            <th>Clinic</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {results.map((res) => (
            <tr key={res.id}>
              <td>{res.testName}</td>
              <td>{res.clinic}</td>
              <td>{res.date}</td>
              <td>
                <button className="secondary" onClick={() => setSelected(res)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && <ResultDetails result={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
