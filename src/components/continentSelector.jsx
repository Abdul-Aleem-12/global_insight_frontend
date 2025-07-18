import React from 'react';

const continents = ['Asia', 'Europe', 'North America', 'South America', 'Africa', 'Oceania', 'Global'];

const ContinentSelector = ({ onSelect }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96 text-center shadow-xl">
        <h2 className="text-xl font-bold mb-4">Select a Continent</h2>
        <div className="grid grid-cols-2 gap-4">
          {continents.map((continent) => {
            const isGlobal = continent === 'Global';
            return (
              <button
                key={continent}
                onClick={() => onSelect(continent)}
                className={`
                    text-black font-semibold py-2 px-4 rounded transition
                  ${isGlobal ? 'col-span-2' : 'col-span-1'} }
                `}
              >
                {continent}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContinentSelector;
