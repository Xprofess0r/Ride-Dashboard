import React from "react";

function Filters({ selectedHour, setSelectedHour, showSurgeOnly, setShowSurgeOnly }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      
      <label>Filter by Hour: </label>
      <select
        value={selectedHour}
        onChange={(e) => setSelectedHour(e.target.value)}
      >
        <option value="all">All</option>
        {[...Array(24).keys()].map(h => (
          <option key={h} value={h}>{h}</option>
        ))}
      </select>

      <label style={{ marginLeft: "20px" }}>
        <input
          type="checkbox"
          checked={showSurgeOnly}
          onChange={() => setShowSurgeOnly(!showSurgeOnly)}
        />
        Show Surge Only
      </label>

    </div>
  );
}

export default Filters;