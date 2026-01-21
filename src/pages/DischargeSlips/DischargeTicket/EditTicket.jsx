// import { X } from 'lucide-react';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// function EditTicket({ 
//   editFormData, 
//   onClose, 
//   onSuccess, 
//   updateLoading,
//   onEditChange 
// }) {
//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       console.log('💾 Updating ticket:', editFormData.ticketId);
      
//       const response = await axios.put(
//         `${API_URL}/discharge-slips/discharge-ticket/${editFormData.ticketId}`,
//         editFormData
//       );

//       if (response.data.success) {
//         alert('Ticket updated successfully! ✅');
//         onSuccess();
//       }
//     } catch (err) {
//       console.error('❌ Error updating ticket:', err);
//       alert('Failed to update ticket: ' + (err.response?.data?.message || err.message));
//     }
//   };

//   const handleEditChange = (e) => {
//     onEditChange(e);
//   };

//   if (!editFormData || !editFormData.ticketId) {
//     return null;
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
//           <h3 className="text-xl font-bold text-gray-800">Edit Ticket - {editFormData.ticketId}</h3>
//           <button 
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
        
//         <form onSubmit={handleEditSubmit} className="p-6">
//           <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
//             <label className="block text-lg font-bold text-gray-800 mb-3">
//               🔄 Update Status <span className="text-red-500">*</span>
//             </label>
//             <select
//               name="status"
//               value={editFormData.status || 'Pending'}
//               onChange={handleEditChange}
//               className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="Pending">🟠 Pending (Patient not yet discharged)</option>
//               <option value="Completed">🟢 Completed (Patient discharged)</option>
//             </select>
//             <p className="text-sm text-gray-600 mt-2">
//               💡 Select "Completed" when patient has been discharged
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Patient Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="patientName"
//                 value={editFormData.patientName || ''}
//                 onChange={handleEditChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
//               <input
//                 type="number"
//                 name="age"
//                 value={editFormData.age || ''}
//                 onChange={handleEditChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Sex</label>
//               <select
//                 name="sex"
//                 value={editFormData.sex || 'M'}
//                 onChange={handleEditChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="M">Male</option>
//                 <option value="F">Female</option>
//                 <option value="O">Other</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis (RE)</label>
//               <input
//                 type="text"
//                 name="diagnosisRE"
//                 value={editFormData.diagnosisRE || ''}
//                 onChange={handleEditChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis (LE)</label>
//               <input
//                 type="text"
//                 name="diagnosisLE"
//                 value={editFormData.diagnosisLE || ''}
//                 onChange={handleEditChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Admission Date</label>
//               <input
//                 type="date"
//                 name="admissionDate"
//                 value={editFormData.admissionDate || ''}
//                 onChange={handleEditChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Admission Time</label>
//               <input
//                 type="time"
//                 name="admissionTime"
//                 value={editFormData.admissionTime || ''}
//                 onChange={handleEditChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Discharge Date</label>
//               <input
//                 type="date"
//                 name="dischargeDate"
//                 value={editFormData.dischargeDate || ''}
//                 onChange={handleEditChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Discharge Time</label>
//               <input
//                 type="time"
//                 name="dischargeTime"
//                 value={editFormData.dischargeTime || ''}
//                 onChange={handleEditChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Procedure Done</label>
//               <input
//                 type="text"
//                 name="procedureDone"
//                 value={editFormData.procedureDone || ''}
//                 onChange={handleEditChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Surgery Date</label>
//               <input
//                 type="date"
//                 name="surgeryDate"
//                 value={editFormData.surgeryDate || ''}
//                 onChange={handleEditChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">O.T. Note</label>
//               <textarea
//                 name="otNote"
//                 value={editFormData.otNote || ''}
//                 onChange={handleEditChange}
//                 rows="3"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               ></textarea>
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Conditions at Discharge</label>
//               <textarea
//                 name="conditionsAtDischarge"
//                 value={editFormData.conditionsAtDischarge || ''}
//                 onChange={handleEditChange}
//                 rows="3"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               ></textarea>
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Post OP Advice</label>
//               <textarea
//                 name="postOpAdvice"
//                 value={editFormData.postOpAdvice || ''}
//                 onChange={handleEditChange}
//                 rows="4"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               ></textarea>
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end space-x-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
//               disabled={updateLoading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
//               disabled={updateLoading}
//             >
//               {updateLoading ? 'Saving...' : '💾 Save Changes'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EditTicket;









































import { X } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function EditTicket({ 
  editFormData, 
  onClose, 
  onSuccess, 
  updateLoading,
  onEditChange 
}) {
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log('💾 Updating ticket:', editFormData.ticketId);
      
      const response = await axios.put(
        `${API_URL}/discharge-slips/discharge-ticket/${encodeURIComponent(editFormData.ticketId)}`,
        editFormData
      );

      if (response.data.success) {
        alert('Ticket updated successfully! ✅');
        onSuccess();
      }
    } catch (err) {
      console.error('❌ Error updating ticket:', err);
      alert('Failed to update ticket: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEditChange = (e) => {
    onEditChange(e);
  };

  if (!editFormData || !editFormData.ticketId) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">Edit Ticket - {editFormData.ticketId}</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleEditSubmit} className="p-6">
          <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
            <label className="block text-lg font-bold text-gray-800 mb-3">
              🔄 Update Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={editFormData.status || 'Pending'}
              onChange={handleEditChange}
              className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Pending">🟠 Pending (Patient not yet discharged)</option>
              <option value="Completed">🟢 Completed (Patient discharged)</option>
            </select>
            <p className="text-sm text-gray-600 mt-2">
              💡 Select "Completed" when patient has been discharged
            </p>
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
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                name="age"
                value={editFormData.age || ''}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sex</label>
              <select
                name="sex"
                value={editFormData.sex || 'M'}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis (RE)</label>
              <input
                type="text"
                name="diagnosisRE"
                value={editFormData.diagnosisRE || ''}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis (LE)</label>
              <input
                type="text"
                name="diagnosisLE"
                value={editFormData.diagnosisLE || ''}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Admission Date</label>
              <input
                type="date"
                name="admissionDate"
                value={editFormData.admissionDate || ''}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Admission Time</label>
              <input
                type="time"
                name="admissionTime"
                value={editFormData.admissionTime || ''}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Discharge Date</label>
              <input
                type="date"
                name="dischargeDate"
                value={editFormData.dischargeDate || ''}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Discharge Time</label>
              <input
                type="time"
                name="dischargeTime"
                value={editFormData.dischargeTime || ''}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Procedure Done</label>
              <input
                type="text"
                name="procedureDone"
                value={editFormData.procedureDone || ''}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Surgery Date</label>
              <input
                type="date"
                name="surgeryDate"
                value={editFormData.surgeryDate || ''}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">O.T. Note</label>
              <textarea
                name="otNote"
                value={editFormData.otNote || ''}
                onChange={handleEditChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Conditions at Discharge</label>
              <textarea
                name="conditionsAtDischarge"
                value={editFormData.conditionsAtDischarge || ''}
                onChange={handleEditChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Post OP Advice</label>
              <textarea
                name="postOpAdvice"
                value={editFormData.postOpAdvice || ''}
                onChange={handleEditChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              ></textarea>
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

export default EditTicket;