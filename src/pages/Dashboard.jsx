// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TopicIntensityBar from '../components/charts/topicIntensityBar';
import YearCountryHeatmap from '../components/charts/yearCountryHeatmap';
import TopicPieChart from '../components/charts/topicPieChart';
import SectorDonutChart from '../components/charts/sectorDonutChart';
import SWOTRadarChart from '../components/charts/SWOTRadarChart';
import FilterPanel from '../components/filterPanel';

const Dashboard = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({}); // placeholder for filter state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFilteredData();
  }, [filters]);

  const fetchFilteredData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/filter`, {
        params: filters, // send filter params to backend
      });
      setFilteredData(res.data);
    } catch (err) {
      console.error('Failed to fetch filtered data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-white to-blue-100 mt-10">
      <FilterPanel filters={filters} setFilters={setFilters} />

      {loading ? (
        <p className="text-center text-gray-500">Loading charts...</p>
      ) : filteredData.length === 0 ? (
        <p className="text-center text-gray-500">No data available for selected filters.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TopicIntensityBar data={filteredData} />
          <YearCountryHeatmap data={filteredData} />
          <TopicPieChart data={filteredData} />
          <SectorDonutChart data={filteredData} />
          <SWOTRadarChart data={filteredData} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
