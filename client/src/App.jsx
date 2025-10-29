import { useEffect, useState } from "react";
import MapView from "./components/MapView";
import EarthquakeList from "./components/EarthquakeList";
import InsightsPanel from "./components/InsightsPanel";

export default function App() {
  const [earthquakes, setEarthquakes] = useState([]);

  useEffect(() => {
    fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
      .then((res) => res.json())
      .then((data) => setEarthquakes(data.features))
      .catch((err) => console.error("Error fetching earthquake data:", err));
  }, []);

  return (
    <div className=" min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 font-inter overflow-hidden">
      {/* Header */}
      <header className="py-6 px-8 border-b border-indigo-100 bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 tracking-tight text-center">
          🌍 Global Earthquake Visualizer
        </h1>
        <p className="text-center text-gray-500 mt-2 text-sm md:text-base">
          Real-time seismic data powered by USGS + AI Insights
        </p>
      </header>

      {/* Main Layout */}
      <main className=" m-auto max-w-7xl flex flex-col gap-8 p-6">
        {/* Top Section — Map + Earthquake List */}
        <section className=" grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MapView earthquakes={earthquakes} />
          </div>
          <div>
            <EarthquakeList earthquakes={earthquakes} />
          </div>
        </section>

        {/* Bottom Section — AI Insights Full Width */}
        <section className="w-full">
          <InsightsPanel earthquakes={earthquakes} />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-gray-500">
        Data Source: USGS Earthquake API • Built with ❤️ by Juned
      </footer>
    </div>
  );
}
