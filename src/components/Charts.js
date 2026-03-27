import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer, BarChart, Bar,
  ScatterChart, Scatter
} from "recharts";

function Charts({ data }) {

  // 🔥 SAMPLE DATA (IMPORTANT for performance)
  const sample = data.slice(0, 5000);

  // =========================
  // 📈 1. SURGE vs HOUR
  // =========================
  const grouped = {};

  sample.forEach(d => {
    if (!grouped[d.hour]) grouped[d.hour] = [];
    grouped[d.hour].push(d.surge_multiplier);
  });

  const chartData = Object.keys(grouped).map(hour => ({
    hour,
    surge:
      grouped[hour].reduce((a, b) => a + b, 0) /
      grouped[hour].length
  }));

  // =========================
  // 📊 2. PEAK vs NON-PEAK
  // =========================
  const peakData = [
    {
      type: "Peak",
      value:
        sample.filter(d => d.is_peak)
          .reduce((a, b) => a + b.surge_multiplier, 0) /
        (sample.filter(d => d.is_peak).length || 1)
    },
    {
      type: "Non-Peak",
      value:
        sample.filter(d => !d.is_peak)
          .reduce((a, b) => a + b.surge_multiplier, 0) /
        (sample.filter(d => !d.is_peak).length || 1)
    }
  ];

  // =========================
  // 📅 3. WEEKDAY CHART
  // =========================
  const weekdayMap = {
    0: "Mon",
    1: "Tue",
    2: "Wed",
    3: "Thu",
    4: "Fri",
    5: "Sat",
    6: "Sun"
  };

  const weekdayData = {};

  sample.forEach(d => {
    if (!weekdayData[d.weekday]) weekdayData[d.weekday] = [];
    weekdayData[d.weekday].push(d.surge_multiplier);
  });

  const weekdayChart = Object.keys(weekdayData).map(day => ({
    day: weekdayMap[day],
    surge:
      weekdayData[day].reduce((a, b) => a + b, 0) /
      weekdayData[day].length
  }));

  // =========================
  // 📍 4. SCATTER PLOT
  // =========================
  const scatterData = sample.map(d => ({
    distance_km: d.distance_km,
    fare_amount: d.fare_amount,
    is_surge: d.is_surge
  }));

  // =========================
  // 🚀 RENDER
  // =========================
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>

      {/* 📈 Surge vs Hour */}
      <div>
        <h3>Surge vs Hour</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="surge" stroke="#22c55e" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 📊 Peak vs Non-Peak */}
      <div>
        <h3>Peak vs Non-Peak</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={peakData}>
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📅 Weekday Trend */}
      <div>
        <h3>Surge by Weekday</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weekdayChart}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="surge" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📍 Distance vs Fare */}
      <div>
        <h3>Distance vs Fare</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <XAxis dataKey="distance_km" name="Distance (km)" />
            <YAxis dataKey="fare_amount" name="Fare ($)" />
            <Tooltip />

            <Scatter
              data={scatterData}
              shape={(props) => {
                const { cx, cy, payload } = props;
                const color = payload.is_surge ? "red" : "blue";
                return <circle cx={cx} cy={cy} r={3} fill={color} />;
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Charts;