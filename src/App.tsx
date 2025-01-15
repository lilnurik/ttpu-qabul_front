import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdmissionForm } from "@/components/AdmissionForm";
import { AdminDashboard } from "@/pages/admin/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdmissionForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;