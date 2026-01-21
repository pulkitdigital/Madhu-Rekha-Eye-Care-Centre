import { useState } from 'react';
import ClinicProfileSetup from './ClinicProfileSetup';

function SettingsPage() {
  const [activeTab, setActiveTab] = useState('clinic');

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Settings</h2>
      
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('clinic')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'clinic'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Clinic Profile
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab('general')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'general'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              General Settings
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'clinic' && <ClinicProfileSetup />}
          {activeTab === 'users' && <div className="text-gray-600">User management coming soon...</div>}
          {activeTab === 'general' && <div className="text-gray-600">General settings coming soon...</div>}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;