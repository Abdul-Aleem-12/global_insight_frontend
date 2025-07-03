import { useState, useEffect } from 'react';
import ContinentSelector from './components/continentSelector';
import SummaryCard from './components/summaryCard';
import axios from 'axios';
import InsightsChart from './components/insightsChart';
import Dashboard from './pages/Dashboard';

function App() {
  const [continent, setContinent] = useState(null);
  const [summary, setSummary] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (continent) {
      setSummary(null);
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/summary`, {
          params: { continent },
        })
        .then((res) => setSummary(res.data))
        .catch((err) => console.error('Failed to fetch summary:', err));
    }
  }, [continent]);

  const handleContinentChange = (item) => {
    setContinent(item);
    setSummary(null);
    setDropdownOpen(false);
  };

  return (
    <div className="min-h-screen w-full p-6 bg-gradient-to-br from-white to-blue-100 relative overflow-hidden">
      {/* Welcome message */}
      <div className="text-center max-w-3xl mx-auto mt-20">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Global Insights Dashboard 🌍
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover trends, stats, and more. - Assignment by Abdul Aleem A.
        </p>
      </div>

      {/* Dropdown for changing continent */}
      {summary && (
        <div className="flex justify-center mt-6 z-50 relative">
          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className={`inline-flex justify-center w-full rounded-md border shadow-sm px-4 py-2 text-sm font-medium transition
                ${dropdownOpen ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-blue-600 hover:bg-blue-700'} 
                text-black`}
            >
              🌍 {continent}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Dropdown options */}
            {dropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-52 rounded-md bg-white z-50 
                              border border-blue-300 shadow-md">
                <div className="py-1">
                  {['Asia', 'Europe', 'North America', 'South America', 'Africa', 'Oceania', 'Global'].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleContinentChange(item)}
                      className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-blue-100"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Loading state */}
      {continent && !summary && (
        <p className="text-center text-gray-500 mt-10">Loading summary...</p>
      )}

      {/* Main layout: Summary and Chart side-by-side */}
      {summary && (
        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch mt-10">
          <div className="md:w-1/2 w-full">
            <SummaryCard summary={summary} />
          </div>
          <div className="md:w-1/2 w-full">
            <InsightsChart
              title={`Insights for ${summary.continent}`}
              xLabels={['Total Events', 'Average Intensity']}
              yValues={[summary.totalEvents, parseFloat(summary.averageIntensity)]}
            />
          </div>
        </div>
      )}

      {/* Continent popup overlay (initial) */}
      {!continent && (
        <ContinentSelector onSelect={setContinent} />
      )}

      <Dashboard />
    </div>
  );
}

export default App;
