import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DischargeList from "./pages/discharge-slips";
import CreateDischarge from "./pages/discharge-slips/create";
// import SurgerySlips from "./pages/surgery-slips";
// import OTSlips from "./pages/ot-slips";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/discharge-slips" element={<DischargeList />} />
      <Route path="/discharge-slips/create" element={<CreateDischarge />} />
      {/* <Route path="/surgery-slips" element={<SurgerySlips />} />
      <Route path="/ot-slips" element={<OTSlips />} /> */}
    </Routes>
  );
}
