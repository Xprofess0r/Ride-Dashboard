import React from "react";

function Filters({
  selectedHour,
  setSelectedHour,
  showSurgeOnly,
  setShowSurgeOnly
}) {

  // ✅ fallback safety (in case props break)
  const safeHour = selectedHour ?? "all";
  const safeSurge = showSurgeOnly ?? false;

  // ✅ safe handler
  const handleHourChange = (e) => {
    const value = e.target.value;

    // allow only "all" or valid number
    if (value === "all" || (!isNaN(value) && value >= 0 && value <= 23)) {
      setSelectedHour(value);
    }
  };

  return (
    <div className="filters">

      {/* Hour Filter */}
      <div>
        <label htmlFor="hour-select">Filter by Hour: </label>
        <select
          id="hour-select"
          value={safeHour}
          onChange={handleHourChange}
        >
          <option value="all">All</option>
          {[...Array(24).keys()].map(h => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
      </div>

      {/* Surge Toggle */}
      <label>
        <input
          type="checkbox"
          checked={safeSurge}
          onChange={() => setShowSurgeOnly(prev => !prev)}
        />
        Show Surge Only
      </label>

    </div>
  );
}

export default Filters;