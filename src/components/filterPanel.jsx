// src/components/FilterPanel.jsx
import React from 'react';

const FilterPanel = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value || undefined,
    }));
  };

  const resetFilters = () => {
    setFilters({});
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4 text-center"> Global Filters </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <input
          type="text"
          name="end_year"
          placeholder="End Year"
          value={filters.end_year || ''}
          onChange={handleChange}
          className="border rounded-md px-4 py-2"
        />

        <input
          type="text"
          name="topic"
          placeholder="Topic"
          value={filters.topic || ''}
          onChange={handleChange}
          className="border rounded-md px-4 py-2"
        />

        <input
          type="text"
          name="sector"
          placeholder="Sector"
          value={filters.sector || ''}
          onChange={handleChange}
          className="border rounded-md px-4 py-2"
        />

        <input
          type="text"
          name="region"
          placeholder="Region"
          value={filters.region || ''}
          onChange={handleChange}
          className="border rounded-md px-4 py-2"
        />

        <input
          type="text"
          name="pestle"
          placeholder="PESTLE"
          value={filters.pestle || ''}
          onChange={handleChange}
          className="border rounded-md px-4 py-2"
        />

        <input
          type="text"
          name="source"
          placeholder="Source"
          value={filters.source || ''}
          onChange={handleChange}
          className="border rounded-md px-4 py-2"
        />

        <input
          type="text"
          name="swot"
          placeholder="SWOT"
          value={filters.swot || ''}
          onChange={handleChange}
          className="border rounded-md px-4 py-2"
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={filters.country || ''}
          onChange={handleChange}
          className="border rounded-md px-4 py-2"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={filters.city || ''}
          onChange={handleChange}
          className="border rounded-md px-4 py-2"
        />
      </div>

      <div className="text-center mt-4">
        <button
          onClick={resetFilters}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
