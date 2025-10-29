# 🌍 Earthquake Insights Dashboard

A modern **AI-powered earthquake monitoring and insight platform** built with **React, Vite, TailwindCSS**, and **OpenRouter AI**.  
It visualizes real-time seismic data, generates AI insights, and presents clean visual summaries — ideal for **students, researchers, or geography enthusiasts**.

---

## 🚀 Features

- 🌐 **Live Earthquake Feed** — fetched from the USGS Earthquake API.  
- 🧠 **AI Insight Generation** — summarized by OpenRouter (via `fetchAIInsights.js`) using natural language.  
- 📊 **Data Visualization** — interactive Recharts components for magnitude distribution and top regional hotspots.  
- 💬 **Markdown AI Output** — clear and readable AI summaries for human understanding.  
- 🎨 **Modern UI** — TailwindCSS-based responsive design with subtle glassmorphism and animations.

---

## 🧩 Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React + Vite |
| Styling | TailwindCSS (with Typography plugin) |
| Charts | Recharts |
| AI Integration | OpenRouter API (`minimax/minimax-m2:free` model) |
| Data Source | USGS Earthquake GeoJSON API |

---

## 🧠 LLM Interaction

**LLM Interaction: ChatGPT Conversation Link**  
— Used for brainstorming design ideas, refining logic, and debugging the AI integration and chart visualization.

💬 *Prompt Topics Covered:*
- Setting up `fetchAIInsights.js` to connect with OpenRouter  
- Handling environment variables (`import.meta.env.VITE_OPENAI_API_KEY`)  
- Improving layout and design of the insights panel  
- Choosing the right visualization type for data  
- Enhancing user experience through Tailwind UI design patterns  

📎 *ChatGPT Thread:*  
[ChatGPT Conversation – Earthquake AI Dashboard](https://chat.openai.com/share/your-link-here)

*(Replace the above link with your actual conversation share link)*

---

## 📂 Project Structure

```
src/
├── components/
│   ├── InsightsPanel.jsx
│   ├── EarthquakeList.jsx
│   ├── MapView.jsx
│   ├── Loader.jsx
│
├── utils/
│   ├── fetchAIInsights.js     # Handles AI API calls
│   ├── api.js                 # USGS earthquake fetch logic
│
├── App.jsx
├── main.jsx
├── index.css
```

---

## ⚙️ Setup & Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/earthquake-insights.git
   cd earthquake-insights
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   VITE_OPENAI_API_KEY=your_openrouter_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

---

## 📈 Example Visuals

- **AI Summary Panel** — auto-generated insights  
- **Bar Chart** — magnitude distribution (0–1, 1–2, 2–3, 3–4, 4+)  
- **Hotspot List** — top 5 regions with frequent activity  

---

## 🧾 License

This project is licensed under the **MIT License** — feel free to use and modify it for learning or development.
