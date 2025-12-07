import { createContext, useContext, useState } from "react";

/*
  AppContext stores:
  - Appointments
  - Test results
  - Referral data (optional future feature)

  This simulates a small in-memory database.
*/

const AppContext = createContext();

export function AppProvider({ children }) {
  const [appointments, setAppointments] = useState([]);
  const [results, setResults] = useState([]);

  // Add a new appointment
  const addAppointment = (appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  // Add a new test result
  const addResult = (result) => {
    setResults((prev) => [...prev, result]);
  };

  return (
    <AppContext.Provider
      value={{
        appointments,
        addAppointment,
        results,
        addResult,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
