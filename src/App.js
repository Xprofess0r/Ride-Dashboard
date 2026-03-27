import React, { useState, useMemo, useEffect } from "react";
import data from "./data/data.json";

import MapView from "./components/MapView";
import Charts from "./components/Charts";
import KPIs from "./components/KPIs";
import Filters from "./components/Filters";
import "./styles.css";

function App() {
  const [selectedHour, setSelectedHour] = useState("all");
  const [showSurgeOnly, setShowSurgeOnly] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [darkMode, setDarkMode] = useState(true);

  // Apply theme
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  // Filtering logic (optimized)
  const filteredData = useMemo(() => {
    let temp = data;

    if (selectedHour !== "all") {
      temp = temp.filter(d => d.hour === Number(selectedHour));
    }

    if (showSurgeOnly) {
      temp = temp.filter(d => d.is_surge);
    }

    return temp;
  }, [selectedHour, showSurgeOnly]);

  return (
    <div className="container">
      <h1>🚕 Ride Fare Surge Dashboard</h1>

      <p className="subtitle">
        Analyze ride demand, surge pricing patterns, and geographic hotspots using real-world ride data.
      </p>

      {/* Filters */}
      <div className="card">
        <Filters
          selectedHour={selectedHour}
          setSelectedHour={setSelectedHour}
          showSurgeOnly={showSurgeOnly}
          setShowSurgeOnly={setShowSurgeOnly}
        />
      </div>

      {/* Tabs + Theme */}
      <div className="tabs">
        <button onClick={() => setActiveTab("overview")}>Overview</button>
        <button onClick={() => setActiveTab("map")}>Map</button>
        <button onClick={() => setActiveTab("insights")}>Insights</button>

        <button onClick={() => setDarkMode(!darkMode)}>
  {darkMode ? "🌙 Dark" : "☀️ Light"}
</button>
      </div>

      {/* TAB CONTENT */}

      {activeTab === "overview" && (
        <>
          <div className="card">
            <KPIs data={filteredData} />
          </div>

          <div className="card">
            <Charts data={filteredData} />
          </div>
        </>
      )}

      {activeTab === "map" && (
        <div className="card">
          <MapView data={filteredData} />
        </div>
      )}

      {activeTab === "insights" && (
        <div className="card">
          <h3>📊 Key Insights</h3>
          <ul>
            <li>Surge peaks during morning & evening hours</li>
            <li>High-demand zones concentrated in central NYC</li>
            <li>Peak hours show significantly higher pricing</li>
            <li>Short-distance rides show higher fare variability</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;