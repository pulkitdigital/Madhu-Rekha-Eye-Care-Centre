// // src/SurgerySlips.jsx
// import { Routes, Route, NavLink, useLocation } from "react-router-dom";
// import CreateBill from "./CreateBill.jsx";
// import BillsList from "./BillsList.jsx";
// import BillDetail from "./BillDetail.jsx";
// import Dashboard from "./Dashboard";
// import EditBill from "./EditBill.jsx";
// import EditPayment from "./EditPayment.jsx";
// import EditRefund from "./EditRefund.jsx";
// import Profile from "./Profile.jsx";
// import Payments from "./Payments.jsx"; // ✅ NEW

// export default function SurgerySlips() {
//   const location = useLocation();

//   const isPrintRoute = location.pathname.startsWith("/print/");

//   if (isPrintRoute) {
//     return (
//       <Routes>
//         <Route path="/print/invoice/:id" element={<InvoicePrintPage />} />
//         <Route path="/print/receipt/:paymentId" element={<ReceiptPrintPage />} />
//       </Routes>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 flex">
//       {/* Sidebar */}
//       <aside className="w-60 bg-white border-r border-slate-200 flex flex-col">
//         <div className="px-4 py-3 border-b border-slate-200">
//           <div className="text-sm font-semibold">Madhurekha Billing</div>
//           <div className="text-[11px] text-slate-500">Eye Care Centre</div>
//         </div>

//         <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
//           <NavLink
//             to="/dashboard"
//             className={({ isActive }) =>
//               `block px-3 py-2 rounded-md ${
//                 isActive
//                   ? "bg-slate-900 text-white"
//                   : "text-slate-700 hover:bg-slate-100"
//               }`
//             }
//           >
//             Dashboard
//           </NavLink>

//           <NavLink
//             to="/new-bill"
//             className={({ isActive }) =>
//               `block px-3 py-2 rounded-md ${
//                 isActive
//                   ? "bg-slate-900 text-white"
//                   : "text-slate-700 hover:bg-slate-100"
//               }`
//             }
//           >
//             + New Bill / Receipt
//           </NavLink>

//           <NavLink
//             to="/bills"
//             className={({ isActive }) =>
//               `block px-3 py-2 rounded-md ${
//                 isActive
//                   ? "bg-slate-900 text-white"
//                   : "text-slate-700 hover:bg-slate-100"
//               }`
//             }
//           >
//             All Bills
//           </NavLink>

//           {/* ✅ NEW: Payments & Refunds */}
//           <NavLink
//             to="/payments"
//             className={({ isActive }) =>
//               `block px-3 py-2 rounded-md ${
//                 isActive
//                   ? "bg-slate-900 text-white"
//                   : "text-slate-700 hover:bg-slate-100"
//               }`
//             }
//           >
//             Payments & Refunds
//           </NavLink>

//           <NavLink
//             to="/profile"
//             className={({ isActive }) =>
//               `block px-3 py-2 rounded-md ${
//                 isActive
//                   ? "bg-slate-900 text-white"
//                   : "text-slate-700 hover:bg-slate-100"
//               }`
//             }
//           >
//             Clinic Profile
//           </NavLink>
//         </nav>
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 p-6">
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/new-bill" element={<CreateBill />} />
//           <Route path="/bills" element={<BillsList />} />
//           <Route path="/bills/:id" element={<BillDetail />} />
//           <Route path="/bills/:id/edit" element={<EditBill />} />
//           <Route path="/payments/:id/edit" element={<EditPayment />} />
//           <Route path="/refunds/:id/edit" element={<EditRefund />} />
//           <Route path="/profile" element={<Profile />} />
          
//           {/* ✅ NEW: Payments & Refunds Page */}
//           <Route path="/payments" element={<Payments />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }


// src/SurgerySlips.jsx
import { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import CreateBill from "./CreateBill.jsx";
import BillsList from "./BillsList.jsx";
import BillDetail from "./BillDetail.jsx";
import EditBill from "./EditBill.jsx";
import EditPayment from "./EditPayment.jsx";
import EditRefund from "./EditRefund.jsx";
import Profile from "./Profile.jsx";
import Payments from "./Payments.jsx";

export default function SurgerySlips() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const location = useLocation();
  const navigate = useNavigate();

  const isPrintRoute = location.pathname.startsWith("/print/");
  if (isPrintRoute) {
    return (
      <Routes>
        <Route path="/print/invoice/:id" element={<div>Invoice Print</div>} />
        <Route path="/print/receipt/:paymentId" element={<div>Receipt Print</div>} />
      </Routes>
    );
  }

  const tabs = [
    { key: "dashboard", label: "Dashboard" },
    { key: "new-bill", label: "Create Bill" },
    { key: "bills", label: "All Bills" },
    { key: "payments", label: "Payments & Refunds" },
    { key: "profile", label: "Clinic Profile" },
  ];

  const handleTabClick = (key) => {
    setActiveTab(key);
    navigate(`/${key}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <Dashboard />;
      case "new-bill": return <CreateBill />;
      case "bills": return <BillsList />;
      case "payments": return <Payments />;
      case "profile": return <Profile />;
      default: return <Dashboard />;
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Surgery Slips</h2>

      <div className="bg-white rounded-lg shadow">
        {/* Top Tab Navigation - Discharge Slips jaisa */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabClick(tab.key)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}