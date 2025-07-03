import React from 'react';
import Plot from 'react-plotly.js';

const InsightsChart = ({ title, xLabels, yValues }) => {
    console.log('xLabels:', xLabels);
    console.log('yValues:', yValues);
    console.log("HHIIII");
  return (
    <div className="w-full h-full p-4 bg-white rounded-xl shadow mt-6">
      <h3 className="text-xl font-semibold text-center mb-4">{title}</h3>
      <Plot
        data={[
          {
            x: xLabels,
            y: yValues,
            type: 'bar',
            marker: { color: 'rgba(54, 162, 235, 0.7)' },
          },
        ]}
        layout={{
          autosize: true,
          margin: { t: 40, r: 30, b: 60, l: 50 },
          xaxis: { title: 'Categories' },
          yaxis: { title: 'Values' },
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
        }}
        style={{ width: '100%', height: '100%' }}
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
      />
    </div>
  );
};

export default InsightsChart;
