import { useState } from 'react';
import { Save } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function CreateSummary() {
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    sex: 'M',
    diagnosis: '',
    eyeRE: '',
    eyeLE: '',
    procedure: '',
    procedureDate: '',
    status: 'Pending'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => {
      const updated = { ...prev, [name]: value };

      // Auto-set status only if still Pending
      if (name === 'procedureDate' && value && prev.status === 'Pending') {
        updated.status = 'Completed';
      }

      return updated;
    });

    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        `${API_URL}/discharge-slips/discharge-summary`,
        formData
      );

      if (response.data.success) {
        setSuccess(true);
        alert(
          'Discharge Summary Created Successfully! ✅\nSummary ID: ' +
          response.data.data.summaryId
        );

        setFormData({
          patientName: '',
          age: '',
          sex: 'M',
          diagnosis: '',
          eyeRE: '',
          eyeLE: '',
          procedure: '',
          procedureDate: '',
          status: 'Pending'
        });
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || 'Failed to create discharge summary';
      setError(msg);
      alert('Error: ' + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">
          Create Discharge Summary
        </h3>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <Save className="w-4 h-4" />
          <span>{loading ? 'Saving...' : 'Save Summary'}</span>
        </button>
      </div>

      {/* Errors */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          Discharge summary created successfully!
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Patient Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Patient Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Sex */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sex
            </label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>

          {/* Diagnosis */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diagnosis
            </label>
            <input
              type="text"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Eye RE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Eye (RE)
            </label>
            <input
              type="text"
              name="eyeRE"
              value={formData.eyeRE}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Eye LE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Eye (LE)
            </label>
            <input
              type="text"
              name="eyeLE"
              value={formData.eyeLE}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Procedure */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Procedure
            </label>
            <textarea
              name="procedure"
              value={formData.procedure}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          {/* Procedure Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Procedure / Surgery Date
            </label>
            <input
              type="date"
              name="procedureDate"
              value={formData.procedureDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>

            {formData.procedureDate && (
              <p className="text-xs text-blue-600 mt-1">
                ℹ️ Procedure date auto-sets status to Completed
              </p>
            )}
          </div>

        </div>

        {/* Signature */}
        <div className="mt-6 pt-6 border-t text-right">
          <p className="text-sm text-gray-600 italic">
            Signature of Doctor
          </p>
        </div>
      </form>
    </div>
  );
}

export default CreateSummary;
