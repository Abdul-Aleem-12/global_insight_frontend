// src/components/charts/YearCountryHeatmap.jsx
import React from 'react';
import Plot from 'react-plotly.js';

const YearCountryHeatmap = ({ data }) => {
  if (!data || data.length === 0) return <p className="text-center text-gray-500">No data available</p>;

  // Prepare a nested map: year → country → cumulative intensity
  const heatmapMap = new Map();

  data.forEach((item) => {
    const year = item.start_year || item.end_year;
    const country = item.country;
    const intensity = Number(item.intensity);

    if (!year || !country || isNaN(intensity)) return;

    if (!heatmapMap.has(year)) heatmapMap.set(year, new Map());

    const yearMap = heatmapMap.get(year);
    if (!yearMap.has(country)) yearMap.set(country, intensity);
    else yearMap.set(country, yearMap.get(country) + intensity);
  });

  // Convert map to matrix
  const allYears = Array.from(heatmapMap.keys()).sort();
  const allCountries = Array.from(
    new Set(data.map(d => d.country).filter(Boolean))
  ).sort();

  const z = allCountries.map(country =>
    allYears.map(year => {
      const yearMap = heatmapMap.get(year);
      return yearMap?.get(country) || 0;
    })
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full h-full mt-6 md:mt-0">
      <h3 className="text-xl font-semibold text-center mb-4">🗺️ Heatmap: Year vs Country (Intensity)</h3>
      <Plot
        data={[
          {
            z,
            x: allYears,
            y: allCountries,
            type: 'heatmap',
            colorscale: 'YlGnBu',
            hoverongaps: false,
            showscale: true,
          },
        ]}
        layout={{
          autosize: true,
          margin: { t: 40, r: 30, b: 60, l: 120 },
          xaxis: { title: 'Year' },
          yaxis: { title: 'Country' },
          plot_bgcolor: 'transparent',
          paper_bgcolor: 'transparent',
        }}
        config={{ responsive: true }}
        style={{ width: '100%', height: '500px' }}
      />
    </div>
  );
};

export default YearCountryHeatmap;
