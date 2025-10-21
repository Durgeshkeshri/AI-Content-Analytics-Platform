import React, { useState } from "react";
import { getGeminiInsights } from "../api";

export default function GeminiInsights({ contentId }) {
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(false);

  async function runGemini() {
    setLoading(true);
    setInsight(null);
    try {
      const res = await getGeminiInsights(contentId);
      setInsight(res);
    } catch {
      setInsight({ error: "Failed to fetch insights" });
    }
    setLoading(false);
  }

  return (
    <div className="ai-insights">
      <h4>Gemini AI Insights</h4>
      <button onClick={runGemini} disabled={loading}>{loading ? "Analyzing…" : "Get Insights"}</button>
      {insight && (
        <div className="insight-box">
          {insight.error ? (
            <span style={{color:"red"}}>{insight.error}</span>
          ) : (
            <pre style={{whiteSpace:"pre-wrap",background:"#fafaf7",padding:"8px"}}>{JSON.stringify(insight, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
}
