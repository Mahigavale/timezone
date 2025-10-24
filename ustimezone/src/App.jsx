import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [localTime, setLocalTime] = useState(new Date());
  const [nashuaTime, setNashuaTime] = useState(new Date());

  useEffect(() => {
    const updateTimes = () => {
      setLocalTime(new Date());

      // Convert to Nashua (Eastern Time)
      const nashua = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
      });
      setNashuaTime(new Date(nashua));
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  // Function to check if it’s night (past 6:30 PM)
  const isNight = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return hours > 18 || (hours === 18 && minutes >= 30);
  };
  const isNightUSA = () => {
  const now = new Date();

  // Get the hours and minutes in Eastern Time
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  });

  const parts = formatter.formatToParts(now);
  const hour = parseInt(parts.find(p => p.type === "hour").value, 10);
  const minute = parseInt(parts.find(p => p.type === "minute").value, 10);

  // Night is from 18:30 to 6:30
  if (hour > 18 || (hour === 18 && minute >= 30)) return true; // after 6:30 PM
  if (hour < 6 || (hour === 6 && minute < 30)) return true;     // before 6:30 AM

  return false; // Otherwise, it’s day
};




  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#e3f2ff",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "40px",
          border: "4px solidrgb(233, 200, 13)",
          borderRadius: "16px",
          backgroundColor: "#bbdefb",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* Local Time Card */}
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            textAlign: "center",
            width: "200px",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              fontSize: "1.8rem",
            }}
          >
            {isNight(localTime) ? "🌙" : "☀️"}
          </span>
          <h3 style={{ color: "#1565c0" }}>Your Local Time</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {localTime.toLocaleTimeString()}
          </p>
        </div>

        {/* Nashua Time Card */}
        <div
          style={{
            backgroundColor: "#e0f7fa",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            textAlign: "center",
            width: "200px",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              fontSize: "1.8rem",
            }}
          >
            {isNightUSA(nashuaTime) ? "🌙" : "☀️"}
          </span>
          <h3 style={{ color: "#004d40" }}>Nashua, USA</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {nashuaTime.toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
