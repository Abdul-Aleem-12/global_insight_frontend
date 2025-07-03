import React from 'react';
import Plot from 'react-plotly.js';

const SectorDonutChart = ({ data }) => {
  if (!data || data.length === 0)
    return <p className="text-center text-gray-500">No data available</p>;

  const sectorMap = new Map();
  data.forEach(item => {
    if (!item.sector) return;
    sectorMap.set(item.sector, (sectorMap.get(item.sector) || 0) + 1);
  });

  const total = Array.from(sectorMap.values()).reduce((a, b) => a + b, 0);
  const filteredSectors = [];
  const filteredCounts = [];
  let othersCount = 0;

  sectorMap.forEach((count, sector) => {
    const percent = (count / total) * 100;
    if (percent >= 1.8) {
      filteredSectors.push(sector);
      filteredCounts.push(count);
    } else {
      othersCount += count;
    }
  });

  if (othersCount > 0) {
    filteredSectors.push('Others');
    filteredCounts.push(othersCount);
  }

  const pastelColors = [
    '#A5D8FF', '#B2F2BB', '#FFD6A5', '#FFADAD', '#E0BBE4',
    '#B5EAD7', '#D0F4DE', '#FDCB82', '#C3CDE6', '#B2EBF2',
    '#FFECB3', '#F8B195', '#D8E2DC', '#CDB4DB', '#FFE5B4',
    '#F6DFEB', '#C2F784', '#FFFACD', '#FFDFD3', '#BFD8B8',
    '#AEC6CF', '#E6E6FA', '#FBC4AB', '#D0E6A5', '#F5C7B8',
  ];
  

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full h-full mt-6 md:mt-0">
      <h3 className="text-xl font-semibold text-center mb-4">🍩 Sector Distribution</h3>
      <Plot
        data={[
          {
            type: 'pie',
            hole: 0.5,
            labels: filteredSectors,
            values: filteredCounts,
            textinfo: 'label+percent',
            hoverinfo: 'label+value',
            marker: { colors: pastelColors.slice(0, filteredSectors.length) },
          },
        ]}
        layout={{
          autosize: true,
          margin: { t: 40, r: 40, b: 100, l: 40 },
          showlegend: true,
          legend: {
            orientation: 'h',
            y: -0.2,
            xanchor: 'center',
            x: 0.5,
          },
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
        }}
        config={{ responsive: true }}
        style={{ width: '100%', height: '400px' }}
      />
    </div>
  );
};

export default SectorDonutChart;
