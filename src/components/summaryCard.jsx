// src/components/SummaryCard.jsx
import React from 'react';

const SummaryCard = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full h-full mt-6">
      <h2 className="text-2xl font-bold mb-4">{summary.continent} Summary</h2>
      
      <p><strong>Total Events:</strong> {summary.totalEvents}</p>
      <p><strong>Average Intensity:</strong> {summary.averageIntensity}</p>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Top Countries</h3>
        <div className="flex flex-wrap gap-2">
          {summary.topCountries.map((c, i) => (
            <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {c.country} ({c.count})
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Top Topics</h3>
        <div className="flex flex-wrap gap-2">
          {summary.topTopics?.map((t, i) => (
            <span key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {t.topic} ({t.count})
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Highest Risk Event</h3>
        <div className="bg-red-50 border-l-4 border-red-400 p-3 mt-1 rounded">
          <p><strong>Country:</strong> {summary.highestRiskEvent.country}</p>
          <p><strong>Intensity:</strong> {summary.highestRiskEvent.intensity}</p>
          <p><strong>Topic:</strong> {summary.highestRiskEvent.topic}</p>
          <p><strong>Insight:</strong> {summary.highestRiskEvent.insight}</p>
        </div>
      </div>

      <p className="mt-4"><strong>Most Common Source:</strong> {summary.mostCommonSource}</p>
    </div>
  );
};

export default SummaryCard;
