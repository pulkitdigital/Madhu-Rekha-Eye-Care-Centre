import { X } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function EditSummary({
  editFormData,
  onClose,
  onSuccess,
  updateLoading,
  onEditChange
}) {
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('💾 Updating summary:', editFormData.summaryId);

      // ✅ FIX: Encode the ID to handle forward slashes
      const encodedId = encodeURIComponent(editFormData.summaryId);
      console.log('🔐 Encoded ID:', encodedId);

      const response = await axios.put(
        `${API_URL}/api/discharge-slips/discharge-summary/${encodedId}`,
        editFormData
      );

      if (response.data.success) {
        alert('Discharge summary updated successfully! ✅');
        onSuccess();
      }
    } catch (err) {
      console.error('❌ Error updating summary:', err);
      alert(
        'Failed to update summary: ' +
          (err.response?.data?.message || err.message)
      );
    }
  };

  if (!editFormData || !editFormData.summaryId) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">
            Edit Discharge Summary – {editFormData.summaryId}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleEditSubmit} className="p-6">
          {/* STATUS */}
          <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
            <label className="block text-lg font-bold text-gray-800 mb-3">
              🔄 Update Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={editFormData.status || 'Pending'}
              onChange={onEditChange}
              className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">🟠 Pending</option>
              <option value="Completed">🟢 Completed</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="patientName"
                value={editFormData.patientName || ''}
                onChange={onEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={editFormData.age || ''}
                onChange={onEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sex
              </label>
              <select
                name="sex"
                value={editFormData.sex || 'M'}
                onChange={onEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Diagnosis
              </label>
              <input
                type="text"
                name="diagnosis"
                value={editFormData.diagnosis || ''}
                onChange={onEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Eye (RE)
              </label>
              <input
                type="text"
                name="eyeRE"
                value={editFormData.eyeRE || ''}
                onChange={onEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Eye (LE)
              </label>
              <input
                type="text"
                name="eyeLE"
                value={editFormData.eyeLE || ''}
                onChange={onEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Procedure
              </label>
              <input
                type="text"
                name="procedure"
                value={editFormData.procedure || ''}
                onChange={onEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Procedure / Surgery Date
              </label>
              <input
                type="date"
                name="procedureDate"
                value={editFormData.procedureDate || ''}
                onChange={onEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              disabled={updateLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              disabled={updateLoading}
            >
              {updateLoading ? 'Saving...' : '💾 Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSummary;