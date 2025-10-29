// components/EarthquakeList.jsx
export default function EarthquakeList({ earthquakes }) {
  const sorted = [...earthquakes].sort((a, b) => b.properties.mag - a.properties.mag);

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mt-6 border border-gray-100">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        🌋 Recent Earthquakes
      </h2>

      <ul className="space-y-3 max-h-[400px] overflow-y-auto">
        {sorted.map((eq) => (
          <li
            key={eq.id}
            className="border-b border-gray-200 pb-2 hover:bg-gray-50 transition rounded-lg p-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800">
                {eq.properties.place}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-sm font-semibold ${
                  eq.properties.mag >= 6
                    ? "bg-red-100 text-red-700"
                    : eq.properties.mag >= 5
                    ? "bg-orange-100 text-orange-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {eq.properties.mag.toFixed(1)}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(eq.properties.time).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
