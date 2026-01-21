// // Frontend/src/pages/DischargeSlips/DischargeTicket/CreateTicket.jsx
// import { useState } from 'react';
// import { Save, Printer } from 'lucide-react';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// function CreateTicket() {
//   const [formData, setFormData] = useState({
//     patientName: '',
//     age: '',
//     sex: 'M',
//     diagnosisRE: '',
//     diagnosisLE: '',
//     admissionDate: '',
//     admissionTime: '',
//     dischargeDate: '',
//     dischargeTime: '',
//     procedureDone: '',
//     surgeryDate: '',
//     otNote: '',
//     conditionsAtDischarge: '',
//     postOpAdvice: '',
//     status: 'Pending'
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     setFormData(prev => {
//       const updated = { ...prev, [name]: value };
      
//       // Auto-update status to "Completed" when discharge date is filled
//       if (name === 'dischargeDate' && value && prev.status === 'Pending') {
//         updated.status = 'Completed';
//       }
      
//       return updated;
//     });
    
//     setError(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       const response = await axios.post(
//         `${API_URL}/discharge-slips/discharge-ticket`,
//         formData
//       );

//       if (response.data.success) {
//         setSuccess(true);
//         alert('Discharge Ticket Created Successfully! ✅\nTicket ID: ' + response.data.data.ticketId);
        
//         // Reset form
//         setFormData({
//           patientName: '',
//           age: '',
//           sex: 'M',
//           diagnosisRE: '',
//           diagnosisLE: '',
//           admissionDate: '',
//           admissionTime: '',
//           dischargeDate: '',
//           dischargeTime: '',
//           procedureDone: '',
//           surgeryDate: '',
//           otNote: '',
//           conditionsAtDischarge: '',
//           postOpAdvice: '',
//           status: 'Pending'
//         });
//       }
//     } catch (err) {
//       console.error('Error creating ticket:', err);
//       setError(err.response?.data?.message || 'Failed to create discharge ticket');
//       alert('Error: ' + (err.response?.data?.message || 'Failed to create discharge ticket'));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const handlePrint = () => {
//   //   window.print();
//   // };

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-xl font-bold text-gray-800">Create Discharge Ticket</h3>
//         <div className="flex space-x-3">
//           {/* <button 
//             onClick={handlePrint}
//             className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
//           >
//             <Printer className="w-4 h-4" />
//             <span>Print</span>
//           </button> */}
//           <button 
//             onClick={handleSubmit} 
//             disabled={loading}
//             className={`flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
//               loading ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//           >
//             <Save className="w-4 h-4" />
//             <span>{loading ? 'Saving...' : 'Save Ticket'}</span>
//           </button>
//         </div>
//       </div>

//       {error && (
//         <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
//           {error}
//         </div>
//       )}

//       {success && (
//         <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
//           Discharge ticket created successfully!
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
//         {/* <div className="text-center mb-6 pb-6 border-b-2 border-gray-300">
//           <h2 className="text-2xl font-bold text-gray-800">MADHUREKHA EYE CARE CENTRE</h2>
//           <p className="text-sm text-gray-600 mt-1">E-501, Sonari East (Beside Sabuj Sangha Kali Puja Maidan), Jamshedpur - 831011</p>
//           <div className="flex justify-between mt-3 text-xs text-gray-600">
//             <div>
//               <p className="font-semibold">DR. PRADIPTA KUNDU</p>
//               <p>MBBS (HONS.), MS, D.O., DNB, FICO (I)</p>
//               <p>MOB.: 9431346646</p>
//             </div>
//             <div>
//               <p className="font-semibold">Dr. (Mrs.) AMITA KUNDU</p>
//               <p>MBBS, MS, FCLI, FICO (I)</p>
//               <p>MOB.: 9835735324</p>
//             </div>
//           </div>
//           <div className="mt-4">
//             <span className="bg-gray-800 text-white px-6 py-2 rounded-full font-bold">DISCHARGE TICKET</span>
//           </div>
//         </div> */}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Patient Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="patientName"
//               value={formData.patientName}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Age <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="number"
//               name="age"
//               value={formData.age}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Sex</label>
//             <select
//               name="sex"
//               value={formData.sex}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="M">Male</option>
//               <option value="F">Female</option>
//               <option value="O">Other</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis (RE - Right Eye)</label>
//             <input
//               type="text"
//               name="diagnosisRE"
//               value={formData.diagnosisRE}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Right Eye"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis (LE - Left Eye)</label>
//             <input
//               type="text"
//               name="diagnosisLE"
//               value={formData.diagnosisLE}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Left Eye"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Date of Admission</label>
//             <input
//               type="date"
//               name="admissionDate"
//               value={formData.admissionDate}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Time of Admission</label>
//             <input
//               type="time"
//               name="admissionTime"
//               value={formData.admissionTime}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Date of Discharge</label>
//             <input
//               type="date"
//               name="dischargeDate"
//               value={formData.dischargeDate}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//             {formData.dischargeDate && formData.status === 'Completed' && (
//               <p className="text-xs text-green-600 mt-1">✅ Status auto-updated to "Completed"</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Time of Discharge</label>
//             <input
//               type="time"
//               name="dischargeTime"
//               value={formData.dischargeTime}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Procedure Done</label>
//             <input
//               type="text"
//               name="procedureDone"
//               value={formData.procedureDone}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Date of Surgery</label>
//             <input
//               type="date"
//               name="surgeryDate"
//               value={formData.surgeryDate}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-2">O.T. Note</label>
//             <textarea
//               name="otNote"
//               value={formData.otNote}
//               onChange={handleChange}
//               rows="3"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             ></textarea>
//           </div>

//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Conditions at Discharge</label>
//             <textarea
//               name="conditionsAtDischarge"
//               value={formData.conditionsAtDischarge}
//               onChange={handleChange}
//               rows="3"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             ></textarea>
//           </div>

//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Post OP Advice</label>
//             <textarea
//               name="postOpAdvice"
//               value={formData.postOpAdvice}
//               onChange={handleChange}
//               rows="4"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Tab. CIPROFLOXACIN, Tab. PARACETAMOL, etc."
//             ></textarea>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Status <span className="text-red-500">*</span>
//             </label>
//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="Pending">🟠 Pending (Patient not yet discharged)</option>
//               <option value="Completed">🟢 Completed (Patient discharged)</option>
//             </select>
//             <p className="text-xs text-gray-500 mt-1">
//               💡 Status auto-updates to "Completed" when discharge date is entered
//             </p>
//           </div>
//         </div>

//         <div className="mt-6 pt-6 border-t border-gray-200 text-right">
//           <p className="text-sm text-gray-600 italic">Signature of Doctor</p>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default CreateTicket;





























// Frontend/src/pages/DischargeSlips/DischargeTicket/CreateTicket.jsx
import { useState } from 'react';
import { Save, Printer } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function CreateTicket() {
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    sex: 'M',
    diagnosisRE: '',
    diagnosisLE: '',
    admissionDate: '',
    admissionTime: '',
    dischargeDate: '',
    dischargeTime: '',
    procedureDone: '',
    surgeryDate: '',
    otNote: '',
    conditionsAtDischarge: '',
    postOpAdvice: '',
    status: 'Pending'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Validation check
  const isFormValid = () => {
    return formData.patientName.trim() && formData.age && formData.age > 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Auto-update status to "Completed" when discharge date is filled
      if (name === 'dischargeDate' && value && prev.status === 'Pending') {
        updated.status = 'Completed';
      }
      
      return updated;
    });
    
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.patientName.trim()) {
      setError('Patient name is required');
      return;
    }
    if (!formData.age || formData.age <= 0) {
      setError('Valid age is required (must be greater than 0)');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        `${API_URL}/discharge-slips/discharge-ticket`,
        formData
      );

      if (response.data.success) {
        setSuccess(true);
        alert('Discharge Ticket Created Successfully! ✅\nTicket ID: ' + response.data.data.ticketId);
        
        // Reset form
        setFormData({
          patientName: '',
          age: '',
          sex: 'M',
          diagnosisRE: '',
          diagnosisLE: '',
          admissionDate: '',
          admissionTime: '',
          dischargeDate: '',
          dischargeTime: '',
          procedureDone: '',
          surgeryDate: '',
          otNote: '',
          conditionsAtDischarge: '',
          postOpAdvice: '',
          status: 'Pending'
        });
      }
    } catch (err) {
      console.error('Error creating ticket:', err);
      const errorMsg = err.response?.data?.message || 'Failed to create discharge ticket';
      setError(errorMsg);
      alert('Error: ' + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Create Discharge Ticket</h3>
        <div className="flex space-x-3">
          <button 
            type="submit" 
            form="ticketForm"
            disabled={loading || !isFormValid()}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              loading || !isFormValid() 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving...' : 'Save Ticket'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          Discharge ticket created successfully!
        </div>
      )}

      <form id="ticketForm" onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Patient Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                formData.patientName.trim() ? 'border-gray-300' : 'border-red-300'
              }`}
              placeholder="Enter patient name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="1"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                formData.age > 0 ? 'border-gray-300' : 'border-red-300'
              }`}
              placeholder="Enter age"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sex</label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis (RE - Right Eye)</label>
            <input
              type="text"
              name="diagnosisRE"
              value={formData.diagnosisRE}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Right Eye"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis (LE - Left Eye)</label>
            <input
              type="text"
              name="diagnosisLE"
              value={formData.diagnosisLE}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Left Eye"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Admission</label>
            <input
              type="date"
              name="admissionDate"
              value={formData.admissionDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time of Admission</label>
            <input
              type="time"
              name="admissionTime"
              value={formData.admissionTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Discharge</label>
            <input
              type="date"
              name="dischargeDate"
              value={formData.dischargeDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {formData.dischargeDate && formData.status === 'Completed' && (
              <p className="text-xs text-green-600 mt-1">✅ Status auto-updated to "Completed"</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time of Discharge</label>
            <input
              type="time"
              name="dischargeTime"
              value={formData.dischargeTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Procedure Done</label>
            <input
              type="text"
              name="procedureDone"
              value={formData.procedureDone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Surgery</label>
            <input
              type="date"
              name="surgeryDate"
              value={formData.surgeryDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">O.T. Note</label>
            <textarea
              name="otNote"
              value={formData.otNote}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Conditions at Discharge</label>
            <textarea
              name="conditionsAtDischarge"
              value={formData.conditionsAtDischarge}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Post OP Advice</label>
            <textarea
              name="postOpAdvice"
              value={formData.postOpAdvice}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tab. CIPROFLOXACIN, Tab. PARACETAMOL, etc."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Pending">🟠 Pending (Patient not yet discharged)</option>
              <option value="Completed">🟢 Completed (Patient discharged)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              💡 Status auto-updates to "Completed" when discharge date is entered
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 text-right">
          <p className="text-sm text-gray-600 italic">Signature of Doctor</p>
        </div>
      </form>
    </div>
  );
}

export default CreateTicket;
