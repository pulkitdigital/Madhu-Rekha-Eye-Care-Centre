import { useState, useEffect } from "react";
import {
  Search,
  Eye,
  Download,
  Edit,
  Trash2,
  RefreshCw,
  X,
} from "lucide-react";
import axios from "axios";
import EditSummary from "./EditSummary";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AllSummaries() {
  const [summaries, setSummaries] = useState([]);
  const [filteredSummaries, setFilteredSummaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSummary, setSelectedSummary] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [filterStatus, setFilterStatus] = useState("all");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [downloadingPDF, setDownloadingPDF] = useState(null);

  useEffect(() => {
    fetchAllSummaries();
  }, []);

  useEffect(() => {
    let filtered = summaries;

    if (filterStatus !== "all") {
      filtered = filtered.filter((summary) => summary.status === filterStatus);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (summary) =>
          summary.patientName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          summary.summaryId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (summary.diagnosis &&
            summary.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())),
      );
    }

    setFilteredSummaries(filtered);
  }, [searchTerm, summaries, filterStatus]);

  const fetchAllSummaries = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log(
        "🔍 Fetching summaries from:",
        `${API_URL}/api/discharge-slips/discharge-summary`,
      );

      const response = await axios.get(
        `${API_URL}/api/discharge-slips/discharge-summary`,
      );

      console.log("📦 API Response:", response.data);

      if (response.data.success) {
        let summariesData = [];

        if (Array.isArray(response.data.data)) {
          summariesData = response.data.data;
        } else if (
          response.data.data &&
          Array.isArray(response.data.data.summaries)
        ) {
          summariesData = response.data.data.summaries;
        } else if (
          response.data.data &&
          typeof response.data.data === "object"
        ) {
          summariesData = Object.values(response.data.data);
        }

        console.log("✅ Summaries loaded:", summariesData.length);

        setSummaries(summariesData);
        setFilteredSummaries(summariesData);
      } else {
        throw new Error(response.data.message || "Failed to fetch summaries");
      }
    } catch (err) {
      console.error("❌ Error fetching summaries:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch discharge summaries",
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Added URL encoding
  const handleView = async (summaryId) => {
    try {
      console.log("👁️ Viewing summary:", summaryId);

      // ✅ FIX: Encode the ID to handle forward slashes
      const encodedId = encodeURIComponent(summaryId);
      console.log("🔐 Encoded ID:", encodedId);

      const response = await axios.get(
        `${API_URL}/api/discharge-slips/discharge-summary/${encodedId}`,
      );

      if (response.data.success) {
        setSelectedSummary(response.data.data);
        setShowViewModal(true);
      }
    } catch (err) {
      console.error("❌ Error fetching summary:", err);
      alert(
        "Failed to fetch summary details: " +
          (err.response?.data?.message || err.message),
      );
    }
  };

  // ✅ FIXED: Added URL encoding
  const handleEdit = async (summaryId) => {
    try {
      console.log("✏️ Editing summary:", summaryId);

      // ✅ FIX: Encode the ID to handle forward slashes
      const encodedId = encodeURIComponent(summaryId);
      console.log("🔐 Encoded ID:", encodedId);

      const response = await axios.get(
        `${API_URL}/api/discharge-slips/discharge-summary/${encodedId}`,
      );

      if (response.data.success) {
        setEditFormData(response.data.data);
        setShowEditModal(true);
      }
    } catch (err) {
      console.error("❌ Error fetching summary for edit:", err);
      alert(
        "Failed to fetch summary details for editing: " +
          (err.response?.data?.message || err.message),
      );
    }
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    setEditFormData({});
    fetchAllSummaries();
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ FIXED: Added URL encoding
  const handleDelete = async (summary) => {
    const summaryId = summary.summaryId;

    if (
      !window.confirm(
        `Are you sure you want to delete this summary?\n\nSummary ID: ${summaryId}\nPatient: ${summary.patientName}\n\n⚠️ This action cannot be undone!`,
      )
    ) {
      return;
    }

    setDeleteLoading(true);

    try {
      console.log("🗑️ Deleting summary:", summaryId);

      // ✅ FIX: Encode the ID to handle forward slashes
      const encodedId = encodeURIComponent(summaryId);
      console.log("🔐 Encoded ID:", encodedId);

      const response = await axios.delete(
        `${API_URL}/api/discharge-slips/discharge-summary/${encodedId}`,
      );

      if (response.data.success) {
        alert("Summary deleted successfully! ✅");
        fetchAllSummaries();
      }
    } catch (err) {
      console.error("❌ Error deleting summary:", err);
      alert(
        "Failed to delete summary: " +
          (err.response?.data?.message || err.message),
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDownloadPDF = async (summary) => {
    try {
      console.log("🖨️ Printing summary:", summary.summaryId);

      const encodedId = encodeURIComponent(summary.summaryId);
      const response = await axios.get(
        `${API_URL}/api/discharge-slips/discharge-summary/${encodedId}/pdf`,
        {
          responseType: "blob",
          timeout: 30000,
        },
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Open in new window for printing
      const printWindow = window.open(url);
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print();
        };
      }

      // Clean up after a delay
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);
    } catch (err) {
      console.error("❌ Error printing:", err);
      alert("Failed to print PDF");
    }
  };

  const totalSummaries = summaries.length;
  const pendingCount = summaries.filter((s) => s.status === "Pending").length;
  const completedCount = summaries.filter(
    (s) => s.status === "Completed",
  ).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h3 className="text-xl font-bold text-gray-800">
            All Discharge Summaries
          </h3>
          <button
            onClick={fetchAllSummaries}
            disabled={loading}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <div className="flex items-center space-x-2 text-sm">
            <span className="px-2 py-1 bg-gray-100 rounded">
              Total: {totalSummaries}
            </span>
            <span className="px-2 py-1 bg-orange-100 rounded">
              Pending: {pendingCount}
            </span>
            <span className="px-2 py-1 bg-green-100 rounded">
              Completed: {completedCount}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4 ml-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status ({totalSummaries})</option>
            <option value="Pending">Pending ({pendingCount})</option>
            <option value="Completed">Completed ({completedCount})</option>
          </select>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, ID or diagnosis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <div className="flex-1">
              <h4 className="text-red-800 font-semibold">
                Error Loading Summaries
              </h4>
              <p className="text-red-700 mt-1">{error}</p>
            </div>
            <button
              onClick={fetchAllSummaries}
              className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading summaries...</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Summary ID
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Patient Name
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Age/Sex
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Diagnosis
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Procedure Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSummaries.map((summary) => (
                    <tr
                      key={summary.summaryId}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">
                        {summary.summaryId}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {summary.patientName}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {summary.age}/{summary.sex}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {summary.diagnosis || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {summary.procedureDate || "N/A"}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            summary.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {summary.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleView(summary.summaryId)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            title="View"
                            disabled={loading}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDownloadPDF(summary)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded relative"
                            title="Download PDF"
                            disabled={downloadingPDF === summary.summaryId}
                          >
                            {downloadingPDF === summary.summaryId ? (
                              <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <Download className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleEdit(summary.summaryId)}
                            className="p-1 text-orange-600 hover:bg-orange-50 rounded"
                            title="Edit"
                            disabled={loading}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(summary)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Delete"
                            disabled={deleteLoading}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredSummaries.length === 0 && !loading && !error && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg font-semibold">No summaries found</p>
              <p className="text-sm mt-1">
                {filterStatus !== "all"
                  ? `No ${filterStatus} summaries. Try changing the filter.`
                  : "Try adjusting your search or filters."}
              </p>
            </div>
          )}
        </>
      )}

      {/* View Modal */}
      {showViewModal && selectedSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                Summary Details
              </h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Summary ID
                  </label>
                  <p className="text-gray-900">{selectedSummary.summaryId}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Status
                  </label>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      selectedSummary.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {selectedSummary.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Patient Name
                  </label>
                  <p className="text-gray-900">{selectedSummary.patientName}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Age
                  </label>
                  <p className="text-gray-900">{selectedSummary.age}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Sex
                  </label>
                  <p className="text-gray-900">{selectedSummary.sex}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Diagnosis
                  </label>
                  <p className="text-gray-900">
                    {selectedSummary.diagnosis || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Procedure Date
                  </label>
                  <p className="text-gray-900">
                    {selectedSummary.procedureDate || "N/A"}
                  </p>
                </div>
                {selectedSummary.eyeRE && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Right Eye (RE)
                    </label>
                    <p className="text-gray-900">{selectedSummary.eyeRE}</p>
                  </div>
                )}
                {selectedSummary.eyeLE && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Left Eye (LE)
                    </label>
                    <p className="text-gray-900">{selectedSummary.eyeLE}</p>
                  </div>
                )}
                {selectedSummary.procedure && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Procedure
                    </label>
                    <p className="text-gray-900">{selectedSummary.procedure}</p>
                  </div>
                )}
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Summary Notes
                  </label>
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {selectedSummary.summaryNotes || "N/A"}
                  </p>
                </div>
                {selectedSummary.followUpInstructions && (
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Follow-up Instructions
                    </label>
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {selectedSummary.followUpInstructions}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => handleDownloadPDF(selectedSummary)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                  disabled={downloadingPDF === selectedSummary.summaryId}
                >
                  {downloadingPDF === selectedSummary.summaryId ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <EditSummary
          editFormData={editFormData}
          onClose={() => {
            setShowEditModal(false);
            setEditFormData({});
          }}
          onSuccess={handleEditSuccess}
          updateLoading={updateLoading}
          onEditChange={handleEditChange}
        />
      )}
    </div>
  );
}

export default AllSummaries;
