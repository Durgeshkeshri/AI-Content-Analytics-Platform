import React, { useEffect, useState } from "react";
import { getUsageTrend, getChart } from "../api";

export default function ChartSection({ contentId }) {
  const [trend, setTrend] = useState([]);
  const [chartImg, setChartImg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const trendRes = await getUsageTrend(contentId);
        setTrend(trendRes);
        const chartRes = await getChart(contentId);
        setChartImg(chartRes.chart);
      } catch {
        setTrend([]);
        setChartImg("");
      }
      setLoading(false);
    }
    if (contentId) fetchData();
  }, [contentId]);

  return (
    <div className="analytics-section">
      <h4>Access Trend</h4>
      {loading ? <div>Loading…</div> : (
        <>
          {chartImg && <img src={chartImg} alt="Access Trend Chart" style={{maxWidth: "450px"}} />}
          <div>
            {trend.length === 0 ? "No access logs yet." : (
              <ul>
                {trend.map(rec => (
                  <li key={rec.date}>
                    {rec.date}: <b>{rec.access_count}</b> access{rec.access_count !== 1 ? "es" : ""}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
