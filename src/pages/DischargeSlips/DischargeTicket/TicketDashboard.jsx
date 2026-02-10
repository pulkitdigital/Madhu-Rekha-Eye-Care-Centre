// Frontend/src/pages/DischargeSlips/DischargeTicket/TicketDashboard.jsx
import { useState, useEffect } from "react";
import {
  FileText,
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  Eye,
  Download,
  X,
} from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function TicketDashboard() {
  const [stats, setStats] = useState({
    totalTickets: 0,
    todayTickets: 0,
    completedTickets: 0,
    pendingTickets: 0,
  });
  const [recentTickets, setRecentTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadingPDF, setDownloadingPDF] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch dashboard statistics
      const statsResponse = await axios.get(
        `${API_URL}/api/discharge-slips/discharge-ticket/stats/dashboard`,
      );

      if (statsResponse.data.success) {
        setStats(statsResponse.data.data);
      }

      // Fetch recent tickets (limit to 5)
      const ticketsResponse = await axios.get(
        `${API_URL}/api/discharge-slips/discharge-ticket`,
        {
          params: { limit: 5, offset: 0 },
        },
      );

      if (ticketsResponse.data.success) {
        setRecentTickets(ticketsResponse.data.data);
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError(err.response?.data?.message || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  // const handleView = async (ticketId) => {
  //   try {
  //     const response = await axios.get(`${API_URL}/api/discharge-slips/discharge-ticket/${encodeURIComponent(ticketId)}`);
  //     if (response.data.success) {
  //       alert('View functionality - Ticket ID: ' + ticketId);
  //     }
  //   } catch (err) {
  //     console.error('Error fetching ticket:', err);
  //     alert('Failed to fetch ticket details');
  //   }
  // };

  const handleView = (ticketId) => {
    try {
      console.log("👁️ Viewing ticket:", ticketId);

      // Use ticket data from existing list instead of API call
      const ticket = recentTickets.find((t) => t.ticketId === ticketId);
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

  // Backend PDF Download
  const handleDownloadPDF = async (ticket) => {
    setDownloadingPDF(ticket.ticketId);

    try {
      console.log("📥 Fetching PDF for ticket:", ticket.ticketId);

      const response = await axios.get(
        `${API_URL}/api/discharge-slips/discharge-ticket/${encodeURIComponent(ticket.ticketId)}/pdf`,
        {
          responseType: "blob",
          timeout: 30000,
        },
      );

      console.log("✅ PDF received from backend");

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Open PDF in new tab for preview (instead of direct download)
      window.open(url, "_blank");

      console.log("✅ PDF opened in new tab");

      // Optional: Auto-cleanup after some time
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 60000); // Clean up after 1 minute
    } catch (err) {
      console.error("❌ Error loading PDF:", err);

      let errorMessage = "Failed to load PDF";

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

  const statsConfig = [
    {
      label: "Total Tickets",
      value: stats.totalTickets,
      icon: FileText,
      color: "blue",
      bgGradient: "from-blue-500 to-blue-600",
    },
    {
      label: "Today's Tickets",
      value: stats.todayTickets,
      icon: Calendar,
      color: "green",
      bgGradient: "from-green-500 to-green-600",
    },
    {
      label: "Completed",
      value: stats.completedTickets,
      icon: CheckCircle,
      color: "purple",
      bgGradient: "from-purple-500 to-purple-600",
    },
    {
      label: "Pending",
      value: stats.pendingTickets,
      icon: Clock,
      color: "orange",
      bgGradient: "from-orange-500 to-orange-600",
    },
  ];

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">
          Discharge Ticket Dashboard
        </h3>
        <button
          onClick={fetchDashboardData}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <TrendingUp className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsConfig.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className={`bg-gradient-to-r ${stat.bgGradient} p-4`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-white text-opacity-90 text-sm font-medium">
                    {stat.label}
                  </p>
                  <p className="text-white text-3xl font-bold mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="px-4 py-2 bg-gray-50">
              <div className="flex items-center text-xs text-gray-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>Updated just now</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800">
            Recent Discharge Tickets
          </h4>
          <p className="text-sm text-gray-600 mt-1">Last 5 discharge tickets</p>
        </div>

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
              {recentTickets.length > 0 ? (
                recentTickets.map((ticket) => (
                  <tr
                    key={ticket.ticketId}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm font-medium text-blue-600">
                      {ticket.ticketId}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                      {ticket.patientName}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {ticket.age}/{ticket.sex}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {ticket.diagnosisRE && `RE: ${ticket.diagnosisRE}`}
                      {ticket.diagnosisRE && ticket.diagnosisLE && ", "}
                      {ticket.diagnosisLE && `LE: ${ticket.diagnosisLE}`}
                      {!ticket.diagnosisRE && !ticket.diagnosisLE && "N/A"}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {ticket.dischargeDate || "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
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
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownloadPDF(ticket)}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors relative"
                          title="Download PDF"
                          disabled={downloadingPDF === ticket.ticketId}
                        >
                          {downloadingPDF === ticket.ticketId ? (
                            <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">
                    No recent tickets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
          <h5 className="text-sm font-semibold text-indigo-800 mb-2">
            Completion Rate
          </h5>
          <p className="text-2xl font-bold text-indigo-900">
            {stats.totalTickets > 0
              ? Math.round((stats.completedTickets / stats.totalTickets) * 100)
              : 0}
            %
          </p>
          <p className="text-xs text-indigo-600 mt-1">
            {stats.completedTickets} of {stats.totalTickets} tickets completed
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
          <h5 className="text-sm font-semibold text-amber-800 mb-2">
            Pending Rate
          </h5>
          <p className="text-2xl font-bold text-amber-900">
            {stats.totalTickets > 0
              ? Math.round((stats.pendingTickets / stats.totalTickets) * 100)
              : 0}
            %
          </p>
          <p className="text-xs text-amber-600 mt-1">
            {stats.pendingTickets} tickets awaiting completion
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 border border-emerald-200">
          <h5 className="text-sm font-semibold text-emerald-800 mb-2">
            Today's Activity
          </h5>
          <p className="text-2xl font-bold text-emerald-900">
            {stats.todayTickets}
          </p>
          <p className="text-xs text-emerald-600 mt-1">
            New tickets created today
          </p>
        </div>
      </div>

      {/* View Modal */}
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
                {/* Same content as AllTickets view modal */}
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
                {/* Add all other fields same as AllTickets */}
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
                v
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketDashboard;
