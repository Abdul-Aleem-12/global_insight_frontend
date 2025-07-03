import React from 'react';
import Plot from 'react-plotly.js';

const TopicPieChart = ({ data }) => {
  if (!data || data.length === 0)
    return <p className="text-center text-gray-500">No data available</p>;

  const topicMap = new Map();
  data.forEach(item => {
    if (!item.topic) return;
    topicMap.set(item.topic, (topicMap.get(item.topic) || 0) + 1);
  });

  const total = Array.from(topicMap.values()).reduce((a, b) => a + b, 0);
  const filteredTopics = [];
  const filteredCounts = [];
  let othersCount = 0;

  topicMap.forEach((count, topic) => {
    const percent = (count / total) * 100;
    if (percent >= 2) {
      filteredTopics.push(topic);
      filteredCounts.push(count);
    } else {
      othersCount += count;
    }
  });

  if (othersCount > 0) {
    filteredTopics.push('Others');
    filteredCounts.push(othersCount);
  }

  const pastelColors = [
    '#FFDDC1', '#FFABAB', '#FFC3A0', '#D5AAFF', '#B5EAD7',
    '#C7CEEA', '#FFDAC1', '#E2F0CB', '#C4FAF8', '#A0CED9',
    '#FFB7B2', '#F3FFE3', '#A3C4BC', '#B0A8B9', '#D9BF77',
    '#D3F8E2', '#F8B195', '#E6E6FA', '#C1FFD7', '#FFD3B6',
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full h-full mt-6 md:mt-0">
      <h3 className="text-xl font-semibold text-center mb-4">🥧 Topic Distribution</h3>
      <Plot
        data={[
          {
            type: 'pie',
            labels: filteredTopics,
            values: filteredCounts,
            textinfo: 'label+percent',
            hoverinfo: 'label+value',
            marker: { colors: pastelColors.slice(0, filteredTopics.length) },
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

export default TopicPieChart;
