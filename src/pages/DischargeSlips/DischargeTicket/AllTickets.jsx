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
import EditTicket from "./EditTicket";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AllTickets() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [filterStatus, setFilterStatus] = useState("all");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [downloadingPDF, setDownloadingPDF] = useState(null);
  

  useEffect(() => {
    fetchAllTickets();
  }, []);

  useEffect(() => {
    let filtered = tickets;

    if (filterStatus !== "all") {
      filtered = filtered.filter((ticket) => ticket.status === filterStatus);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (ticket) =>
          ticket.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (ticket.diagnosisRE &&
            ticket.diagnosisRE
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (ticket.diagnosisLE &&
            ticket.diagnosisLE
              .toLowerCase()
              .includes(searchTerm.toLowerCase())),
      );
    }

    setFilteredTickets(filtered);
  }, [searchTerm, tickets, filterStatus]);

  const fetchAllTickets = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log(
        "🔍 Fetching tickets from:",
        `${API_URL}/api/discharge-slips/discharge-ticket`,
      );

      const response = await axios.get(
        `${API_URL}/api/discharge-slips/discharge-ticket`,
      );

      console.log("📦 API Response:", response.data);

      if (response.data.success) {
        let ticketsData = [];

        if (Array.isArray(response.data.data)) {
          ticketsData = response.data.data;
        } else if (
          response.data.data &&
          Array.isArray(response.data.data.tickets)
        ) {
          ticketsData = response.data.data.tickets;
        } else if (
          response.data.data &&
          typeof response.data.data === "object"
        ) {
          ticketsData = Object.values(response.data.data);
        }

        console.log("✅ Tickets loaded:", ticketsData.length);

        setTickets(ticketsData);
        setFilteredTickets(ticketsData);
      } else {
        throw new Error(response.data.message || "Failed to fetch tickets");
      }
    } catch (err) {
      console.error("❌ Error fetching tickets:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch discharge tickets",
      );
    } finally {
      setLoading(false);
    }
  };

  // Replace handleView function (around line 800)
const handleView = async (ticketId) => {
  try {
    console.log("👁️ Viewing ticket:", ticketId);
    
    // Use ticket data from existing list instead of API call
    const ticket = tickets.find(t => t.ticketId === ticketId);
    if (ticket) {
      setSelectedTicket(ticket);
      setShowViewModal(true);
    } else {
      alert("Ticket not found in local data");
    }
  } catch (err) {
    console.error("❌ Error viewing ticket:", err);
    alert("Failed to load ticket details");
  }
};

// Replace handleEdit function (around line 830)
const handleEdit = async (ticketId) => {
  try {
    console.log("✏️ Editing ticket:", ticketId);
    
    // Use ticket data from existing list
    const ticket = tickets.find(t => t.ticketId === ticketId);
    if (ticket) {
      setEditFormData(ticket);
      setShowEditModal(true);
    } else {
      alert("Ticket not found for editing");
    }
  } catch (err) {
    console.error("❌ Error editing ticket:", err);
    alert("Failed to load ticket for editing");
  }
};

  
  
  const handleEditSuccess = () => {
    setShowEditModal(false);
    setEditFormData({});
    fetchAllTickets();
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async (ticket) => {
    const ticketId = ticket.ticketId;

    if (
      !window.confirm(
        `Are you sure you want to delete this ticket?\n\nTicket ID: ${ticketId}\nPatient: ${ticket.patientName}\n\n⚠️ This action cannot be undone!`,
      )
    ) {
      return;
    }

    setDeleteLoading(true);

    try {
      console.log("🗑️ Deleting ticket:", ticketId);
      const response = await axios.delete(
        `${API_URL}/api/discharge-slips/discharge-ticket/${encodeURIComponent(ticketId)}`,
      );

      if (response.data.success) {
        alert("Ticket deleted successfully! ✅");
        fetchAllTickets();
      }
    } catch (err) {
      console.error("❌ Error deleting ticket:", err);
      alert(
        "Failed to delete ticket: " +
          (err.response?.data?.message || err.message),
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDownloadPDF = async (ticket) => {
    setDownloadingPDF(ticket.ticketId);

    try {
      console.log("📥 Downloading PDF for ticket:", ticket.ticketId);

      const response = await axios.get(
        `${API_URL}/api/discharge-slips/discharge-ticket/${encodeURIComponent(ticket.ticketId)}/pdf`,
        {
          responseType: "blob",
          timeout: 30000,
        },
      );

      console.log("✅ PDF received from backend");
      console.log("📦 Response type:", response.headers["content-type"]);
      console.log("📦 Response size:", response.data.size, "bytes");

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `DischargeTicket-${ticket.ticketId.replace(/\//g, "-")}-${ticket.patientName.replace(/\s+/g, "_")}.pdf`;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log("✅ PDF downloaded successfully");
    } catch (err) {
      console.error("❌ Error downloading PDF:", err);

      let errorMessage = "Failed to download PDF";

      if (err.response) {
        if (err.response.data instanceof Blob) {
          const text = await err.response.data.text();
          try {
            const errorData = JSON.parse(text);
            errorMessage = errorData.message || errorMessage;
          } catch {
            errorMessage = text || errorMessage;
          }
        } else {
          errorMessage = err.response.data?.message || errorMessage;
        }
      } else if (err.code === "ECONNABORTED") {
        errorMessage = "PDF generation timeout. Please try again.";
      } else {
        errorMessage = err.message || errorMessage;
      }

      alert(errorMessage);
    } finally {
      setDownloadingPDF(null);
    }
  };

  const totalTickets = tickets.length;
  const pendingCount = tickets.filter((t) => t.status === "Pending").length;
  const completedCount = tickets.filter((t) => t.status === "Completed").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h3 className="text-xl font-bold text-gray-800">
            All Discharge Tickets
          </h3>
          <button
            onClick={fetchAllTickets}
            disabled={loading}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <div className="flex items-center space-x-2 text-sm">
            <span className="px-2 py-1 bg-gray-100 rounded">
              Total: {totalTickets}
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
            <option value="all">All Status ({totalTickets})</option>
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
                Error Loading Tickets
              </h4>
              <p className="text-red-700 mt-1">{error}</p>
            </div>
            <button
              onClick={fetchAllTickets}
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
          <p className="mt-2 text-gray-600">Loading tickets...</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Ticket ID
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
                      Discharge Date
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
                  {filteredTickets.map((ticket) => (
                    <tr
                      key={ticket.ticketId}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 text-sm font-medium text-blue-600">
                        {ticket.ticketId}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {ticket.patientName}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {ticket.age}/{ticket.sex}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {ticket.diagnosisRE && `RE: ${ticket.diagnosisRE}`}
                        {ticket.diagnosisRE && ticket.diagnosisLE && ", "}
                        {ticket.diagnosisLE && `LE: ${ticket.diagnosisLE}`}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {ticket.dischargeDate || "N/A"}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            ticket.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleView(ticket.ticketId)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            title="View"
                            disabled={loading}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDownloadPDF(ticket)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded relative"
                            title="Download PDF"
                            disabled={downloadingPDF === ticket.ticketId}
                          >
                            {downloadingPDF === ticket.ticketId ? (
                              <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <Download className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleEdit(ticket.ticketId)}
                            className="p-1 text-orange-600 hover:bg-orange-50 rounded"
                            title="Edit"
                            disabled={loading}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(ticket)}
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

          {filteredTickets.length === 0 && !loading && !error && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg font-semibold">No tickets found</p>
              <p className="text-sm mt-1">
                {filterStatus !== "all"
                  ? `No ${filterStatus} tickets. Try changing the filter.`
                  : "Try adjusting your search or filters."}
              </p>
            </div>
          )}
        </>
      )}

      {/* View Modal */}
      {showViewModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                Ticket Details
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
                    Ticket ID
                  </label>
                  <p className="text-gray-900">{selectedTicket.ticketId}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Status
                  </label>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      selectedTicket.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {selectedTicket.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Patient Name
                  </label>
                  <p className="text-gray-900">{selectedTicket.patientName}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Age
                  </label>
                  <p className="text-gray-900">{selectedTicket.age}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Sex
                  </label>
                  <p className="text-gray-900">{selectedTicket.sex}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Diagnosis (RE)
                  </label>
                  <p className="text-gray-900">
                    {selectedTicket.diagnosisRE || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Diagnosis (LE)
                  </label>
                  <p className="text-gray-900">
                    {selectedTicket.diagnosisLE || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Admission Date
                  </label>
                  <p className="text-gray-900">
                    {selectedTicket.admissionDate || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Admission Time
                  </label>
                  <p className="text-gray-900">
                    {selectedTicket.admissionTime || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Discharge Date
                  </label>
                  <p className="text-gray-900">
                    {selectedTicket.dischargeDate || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Discharge Time
                  </label>
                  <p className="text-gray-900">
                    {selectedTicket.dischargeTime || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Procedure Done
                  </label>
                  <p className="text-gray-900">
                    {selectedTicket.procedureDone || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Surgery Date
                  </label>
                  <p className="text-gray-900">
                    {selectedTicket.surgeryDate || "N/A"}
                  </p>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    O.T. Note
                  </label>
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {selectedTicket.otNote || "N/A"}
                  </p>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Conditions at Discharge
                  </label>
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {selectedTicket.conditionsAtDischarge || "N/A"}
                  </p>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Post OP Advice
                  </label>
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {selectedTicket.postOpAdvice || "N/A"}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => handleDownloadPDF(selectedTicket)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                  disabled={downloadingPDF === selectedTicket.ticketId}
                >
                  {downloadingPDF === selectedTicket.ticketId ? (
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
        <EditTicket
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

export default AllTickets;