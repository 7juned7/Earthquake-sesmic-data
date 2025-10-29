console.log("Environment Variable:", import.meta.env.VITE_OPENAI_API_KEY);

export async function fetchAIInsights(summaryText) {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "minimax/minimax-m2:free",
        messages: [
          {
            role: "system",
            content:
              "You are a seismology data analyst. Respond in visually structured markdown suitable for dashboards.",
          },
          {
            role: "user",
            content: `
Analyze the following earthquake dataset and create a concise, visually organized markdown report.

### Instructions:
1. Use clear headings and emoji icons for readability.
2. Include these sections:
   - 🌍 Overview — Short summary of total events, largest quake, and general pattern.
   - 📊 Key Stats — Bullet points with total events, magnitude range, largest event, and active region.
   - 🗺️ Regional Highlights — Bullet list summarizing key locations or clusters.
   - 📈 Observations & Patterns — Explain any notable swarms or anomalies.
   - 💡 AI Tip — End with a smart short educational note.

Keep tone factual, clean, and structured.
Do not list all 20 rows unless needed. 
Format like a professional dashboard summary.

Raw data:
${summaryText}
`,
          },
        ],
      }),
    });

    if (!res.ok) throw new Error(`OpenRouter error: ${res.status}`);

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "⚠️ No insights generated.";
  } catch (err) {
    console.error("AI fetch error:", err);
    return "⚠️ Error fetching AI insights. Please try again.";
  }
}
