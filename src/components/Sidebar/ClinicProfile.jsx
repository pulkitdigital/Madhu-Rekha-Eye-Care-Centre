// Frontend/src/components/ClinicProfile.jsx
import { useState, useEffect } from 'react';
import { Building2, Loader, AlertCircle } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function ClinicProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/clinic-profile`);
      if (response.data.success) {
        setProfile(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching clinic profile:', err);
      setError('Profile not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mb-8 flex items-center justify-center py-8">
        <Loader className="w-6 h-6 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 mx-auto">
          <AlertCircle className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500 text-center">No clinic profile</p>
        <p className="text-xs text-gray-400 text-center mt-1">Please setup clinic profile in Settings</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
        <Building2 className="w-8 h-8 text-blue-600" />
      </div>
      
      <h2 className="text-xl font-bold text-gray-800 text-center">{profile.clinicName}</h2>
      <p className="text-sm text-gray-600 text-center mt-1 px-2">{profile.address}</p>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        {profile.doctor1Name && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-700">{profile.doctor1Name}</p>
            {profile.doctor1Qualification && (
              <p className="text-xs text-gray-500">{profile.doctor1Qualification}</p>
            )}
            {profile.doctor1Phone && (
              <p className="text-xs text-gray-500">📞 {profile.doctor1Phone}</p>
            )}
          </div>
        )}
        
        {profile.doctor2Name && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-700">{profile.doctor2Name}</p>
            {profile.doctor2Qualification && (
              <p className="text-xs text-gray-500">{profile.doctor2Qualification}</p>
            )}
            {profile.doctor2Phone && (
              <p className="text-xs text-gray-500">📞 {profile.doctor2Phone}</p>
            )}
          </div>
        )}
        
        {profile.phone && (
          <p className="text-xs text-gray-500 mt-2">📞 {profile.phone}</p>
        )}
        {profile.email && (
          <p className="text-xs text-gray-500">📧 {profile.email}</p>
        )}
        {profile.website && (
          <p className="text-xs text-gray-500">🌐 {profile.website}</p>
        )}
      </div>
    </div>
  );
}

export default ClinicProfile;