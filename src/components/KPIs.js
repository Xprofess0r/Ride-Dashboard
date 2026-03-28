import React from "react";

function KPIs({ data }) {
    const avgFare = (
      data.reduce((sum, d) => sum + d.fare_amount, 0) / data.length
    ).toFixed(2);
  
    const surgePercent = (
      (data.filter(d => d.is_surge).length / data.length) * 100
    ).toFixed(1);

    const avgProb =
  data.reduce((sum, d) => sum + d.surge_prob, 0) / data.length;
  
    return (
        <div className="kpi-container">
        <div className="kpi-item">
          <h3>💰 Avg Fare</h3>
          <p>${avgFare}</p>
        </div>
      
        <div className="kpi-item">
          <h3>⚡ Surge %</h3>
          <p>{surgePercent}%</p>
        </div>
      
        <div className="kpi-item">
          <h3>🚗 Trips</h3>
          <p>{data.length}</p>
        </div>
        <div className="kpi-item">
        <h3>🤖 Surge Prob</h3>
        <p>{(avgProb * 100).toFixed(1)}%</p>
        </div>
      </div>
    );
  }

export default KPIs;