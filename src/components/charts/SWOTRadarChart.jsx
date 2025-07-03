// src/components/charts/SWOTRadarChart.jsx
import React from 'react';
import Plot from 'react-plotly.js';

const SWOTRadarChart = ({ data }) => {
  if (!data || data.length === 0) return <p className="text-center text-gray-500">No data available</p>;

  const swotTypes = ['Strength', 'Weakness', 'Opportunity', 'Threat'];
  const swotCounts = {
    Strength: 0,
    Weakness: 0,
    Opportunity: 0,
    Threat: 0,
  };

  data.forEach((item) => {
    const swot = item.swot?.toLowerCase();
    if (!swot) return;
    for (const type of swotTypes) {
      if (swot.includes(type.toLowerCase())) {
        swotCounts[type]++;
      }
    }
  });

  const values = swotTypes.map(type => swotCounts[type]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full h-full mt-6 md:mt-0">
      <h3 className="text-xl font-semibold text-center mb-4">🕸️ SWOT Analysis Radar Chart</h3>
      <Plot
        data={[
          {
            type: 'scatterpolar',
            r: values,
            theta: swotTypes,
            fill: 'toself',
            name: 'SWOT',
            marker: {
              color: 'rgba(179, 136, 255, 0.7)'
            },
            line: {
              color: 'rgba(103, 58, 183, 1)',
              width: 2
            }
          },
        ]}
        layout={{
          polar: {
            radialaxis: {
              visible: true,
              range: [0, Math.max(...values) + 2],
              tickfont: { size: 10 }
            }
          },
          margin: { t: 40, r: 30, b: 60, l: 30 },
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          showlegend: false,
        }}
        config={{ responsive: true }}
        style={{ width: '100%', height: '400px' }}
      />
    </div>
  );
};

export default SWOTRadarChart;
