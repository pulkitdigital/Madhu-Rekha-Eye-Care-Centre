// Frontend/src/components/Header.jsx
import { useState, useEffect } from 'react';
import { Menu, X, Building2 } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Header({ sidebarOpen, setSidebarOpen }) {
  const [clinicName, setClinicName] = useState('Hospital Management System');
  const [clinicSubtitle, setClinicSubtitle] = useState('Manage your hospital operations efficiently');

  useEffect(() => {
    fetchClinicProfile();
  }, []);

  const fetchClinicProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/clinic-profile`);
      if (response.data.success) {
        const profile = response.data.data;
        setClinicName(profile.clinicName || 'Hospital Management System');
        setClinicSubtitle(profile.address || 'Manage your hospital operations efficiently');
      }
    } catch (err) {
      console.error('Error fetching clinic profile for header:', err);
      // Keep default values
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{clinicName}</h1>
              <p className="text-sm text-gray-600">{clinicSubtitle}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            A
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;