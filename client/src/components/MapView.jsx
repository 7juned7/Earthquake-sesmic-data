// components/MapView.jsx
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ earthquakes }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg mt-6 border border-gray-200">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "550px", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {earthquakes.map((eq) => {
          const mag = eq.properties.mag || 0;
          const color =
            mag >= 6 ? "#ef4444" : mag >= 5 ? "#f97316" : mag >= 4 ? "#eab308" : "#22c55e";
          const radius = Math.max(mag * 3, 4);

          return (
            <CircleMarker
              key={eq.id}
              center={[eq.geometry.coordinates[1], eq.geometry.coordinates[0]]}
              radius={radius}
              pathOptions={{ color, fillColor: color, fillOpacity: 0.7 }}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-bold text-gray-900">{eq.properties.place}</p>
                  <p>Magnitude: {mag}</p>
                  <p>Depth: {eq.geometry.coordinates[2]} km</p>
                  <p className="text-xs text-gray-500">
                    {new Date(eq.properties.time).toLocaleString()}
                  </p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
