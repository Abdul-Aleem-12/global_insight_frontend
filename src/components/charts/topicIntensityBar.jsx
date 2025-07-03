// src/components/charts/TopicIntensityBar.jsx
import React from 'react';
import Plot from 'react-plotly.js';

const TopicIntensityBar = ({ data }) => {
  if (!data || data.length === 0) return <p className="text-center text-gray-500">No data available</p>;

  // Group by topic and calculate average intensity
  const topicMap = new Map();

  data.forEach((item) => {
    if (!item.topic || item.intensity === "") return;
    const intensity = Number(item.intensity);
    if (!topicMap.has(item.topic)) {
      topicMap.set(item.topic, { sum: intensity, count: 1 });
    } else {
      const existing = topicMap.get(item.topic);
      topicMap.set(item.topic, {
        sum: existing.sum + intensity,
        count: existing.count + 1,
      });
    }
  });

  const topics = [];
  const avgIntensities = [];

  topicMap.forEach((value, key) => {
    topics.push(key);
    avgIntensities.push((value.sum / value.count).toFixed(2));
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full h-full">
      <h3 className="text-xl font-semibold text-center mb-4">📊 Topics vs Average Intensity</h3>
      <Plot
        data={[
          {
            x: topics,
            y: avgIntensities,
            type: 'bar',
            marker: {
              color: 'rgba(255, 159, 64, 0.7)', // pastel orange
              line: { width: 1.5, color: 'rgba(255, 159, 64, 1)' }
            },
            hoverinfo: 'x+y',
          },
        ]}
        layout={{
          autosize: true,
          margin: { t: 30, r: 20, b: 100, l: 50 },
          xaxis: {
            title: 'Topics',
            tickangle: -45,
            tickfont: { size: 10 },
          },
          yaxis: {
            title: 'Average Intensity',
          },
          plot_bgcolor: 'transparent',
          paper_bgcolor: 'transparent',
        }}
        config={{
          responsive: true,
          displaylogo: false,
          modeBarButtonsToRemove: [
            'zoom2d',
            'pan2d',
            'select2d',
            'lasso2d',
            'zoomIn2d',
            'zoomOut2d',
            'autoScale2d',
            'resetScale2d',
            'hoverClosestCartesian',
            'hoverCompareCartesian',
            'toggleSpikelines',
          ],
        }}
        style={{ width: '100%', height: '400px' }}
      />
    </div>
  );
};

export default TopicIntensityBar;
