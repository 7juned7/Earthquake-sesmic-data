import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchAIInsights } from "../utils/fetchAIInsights";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
export default function InsightsPanel({ earthquakes }) {
  const [insight, setInsight] = useState("Loading AI insights...");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!earthquakes.length) return;

    const generateAIInsight = async () => {
      setLoading(true);
      setError(null);

      const summary = earthquakes
        .slice(0, 15)
        .map((e) => `Magnitude ${e.properties.mag} near ${e.properties.place}`)
        .join("; ");

      try {
        const aiText = await fetchAIInsights(summary);
        setInsight(aiText || "⚠️ AI did not return any insight at the moment.");
      } catch (err) {
        console.error("AI fetch error:", err);
        setError("Unable to fetch AI insights right now.");
      } finally {
        setLoading(false);
      }
    };

    generateAIInsight();
  }, [earthquakes]);

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-indigo-100 mt-6 transition-all duration-300 hover:shadow-2xl hover:border-indigo-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
          🤖 AI Insights
        </h2>
        <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
          Smart Analysis
        </span>
      </div>

      {/* Loading / Error / Content */}
      {loading ? (
        <div className="flex items-center gap-3 text-gray-500 animate-pulse">
          <span className="w-5 h-5 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin"></span>
          <p>Analyzing latest earthquake data...</p>
        </div>
      ) : error ? (
        <p className="text-red-600 font-medium">{error}</p>
      ) : (
        <div className="prose prose-indigo font-inter max-w-none text-gray-800 leading-relaxed">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h3: ({ node, ...props }) => (
                <h3
                  className="text-xl font-semibold text-indigo-700 mt-6 border-l-4 border-indigo-200 pl-3"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc ml-6 space-y-1 marker:text-indigo-500" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="text-gray-700 leading-snug" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="text-gray-700 leading-relaxed" {...props} />
              ),
            }}
          >
            {insight}
          </ReactMarkdown>
<div className="mt-8 space-y-8">
  {/* 1️⃣ Magnitude Distribution */}
  <div>
    <h3 className="text-lg font-semibold text-indigo-700 mb-2">📊 Magnitude Distribution</h3>
    <div className="h-64 bg-white/70 rounded-xl shadow-inner border border-indigo-100 p-3">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={[
            { range: "0–1", count: earthquakes.filter(e => e.properties.mag < 1).length },
            { range: "1–2", count: earthquakes.filter(e => e.properties.mag >= 1 && e.properties.mag < 2).length },
            { range: "2–3", count: earthquakes.filter(e => e.properties.mag >= 2 && e.properties.mag < 3).length },
            { range: "3–4", count: earthquakes.filter(e => e.properties.mag >= 3 && e.properties.mag < 4).length },
            { range: "4+", count: earthquakes.filter(e => e.properties.mag >= 4).length },
          ]}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* 2️⃣ Top 5 Active Regions */}
  <div>
    <h3 className="text-lg font-semibold text-indigo-700 mb-2">📍 Top Active Regions</h3>
    <ul className="bg-white/70 rounded-xl shadow-inner border border-indigo-100 divide-y divide-indigo-100">
      {[...new Set(
        earthquakes.map(e => e.properties.place.split(",").pop()?.trim())
      )]
        .slice(0, 5)
        .map((region, i) => (
          <li key={i} className="flex justify-between p-3 text-sm">
            <span>{region || "Unknown"}</span>
            <span className="text-indigo-600 font-semibold">
              {earthquakes.filter(e => e.properties.place.includes(region)).length}
            </span>
          </li>
        ))}
    </ul>
  </div>
</div>

          {/* Tip Section */}
          <div className="mt-6 p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-xl text-sm text-indigo-800 shadow-inner">
            💡 <span className="font-semibold">AI Tip:</span> Geothermal regions like The Geysers and
            Mammoth often experience frequent micro-swarms — a sign of local crustal adjustment, not
            necessarily danger.
          </div>
        </div>
        
      )}
    </div>
  );
}
