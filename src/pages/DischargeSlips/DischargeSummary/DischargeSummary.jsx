import { useState } from 'react';
import SummaryDashboard from './SummaryDashboard';
import CreateSummary from './CreateSummary';
import AllSummaries from './AllSummaries';

function DischargeSummary() {
  const [activeSubTab, setActiveSubTab] = useState('dashboard');

  return (
    <div>
      <div className="mb-6">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveSubTab('dashboard')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSubTab === 'dashboard'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveSubTab('create')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSubTab === 'create'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Create Summary
          </button>
          <button
            onClick={() => setActiveSubTab('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSubTab === 'all'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Summaries
          </button>
        </nav>
      </div>

      {activeSubTab === 'dashboard' && <SummaryDashboard />}
      {activeSubTab === 'create' && <CreateSummary />}
      {activeSubTab === 'all' && <AllSummaries />}
    </div>
  );
}

export default DischargeSummary;