import { useState } from 'react';
import DischargeTicket from './DischargeTicket/DischargeTicket';
import DischargeSummary from './DischargeSummary/DischargeSummary';

function DischargeSlips() {
  const [activeTab, setActiveTab] = useState('ticket');

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Discharge Slips</h2>
      
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('ticket')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'ticket'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Discharge Ticket
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'summary'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Discharge Summary
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'ticket' && <DischargeTicket />}
          {activeTab === 'summary' && <DischargeSummary />}
        </div>
      </div>
    </div>
  );
}

export default DischargeSlips;