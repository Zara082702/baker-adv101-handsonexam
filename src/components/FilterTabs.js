
import React from 'react';

const FilterTabs = ({ currentFilter, setFilter }) => {
  const tabs = [
    { label: 'All Tasks', value: 'all' },
    { label: 'To Do', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setFilter(tab.value)}
          style={{
            padding: '8px 15px',
            cursor: 'pointer',
            border: '1px solid #ccc',
            borderRadius: '20px',
            background: currentFilter === tab.value ? '#1a73e8' : 'white', /* Blue when active */
            color: currentFilter === tab.value ? 'white' : '#333',
            fontWeight: currentFilter === tab.value ? 'bold' : 'normal',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;