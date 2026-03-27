import React from "react";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapView({ data }) {
  const sample = data.slice(0, 2000); // performance

  return (
    <MapContainer 
      center={[40.75, -73.97]}
      zoom={12}
      style={{ height: "300px", width: "100%", borderRadius: "12px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {sample.map((d, i) => (
        <CircleMarker
        key={i}
        center={[d.pickup_latitude, d.pickup_longitude]}
        radius={d.is_surge ? 6 : 2}
        color={d.is_surge ? "red" : "blue"}
        fillOpacity={0.6}
      />
      ))}
    </MapContainer>
  );
}

export default MapView;